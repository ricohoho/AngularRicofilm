import { Component, OnInit } from '@angular/core';
import { RequestfilmService } from "../requestfilm.service";
import { Irequest } from "../irequest";
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-filmrequestlist',
  templateUrl: './filmrequestlist.component.html',
  styleUrls: ['./filmrequestlist.component.css']
})
export class FilmrequestlistComponent implements OnInit {

  public requestList: Irequest[] = [];
  clonedRequest: { [s: string]: Irequest } = {};

  constructor(private dataService: RequestfilmService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.dataService.getRequestList().subscribe(data => {
      this.requestList = data; // L’objet est automatiquement typé
    });

    console.log("fin inti filmrequestlist.component");
  }

  onRowEditInit(request: Irequest) {
    this.clonedRequest[request.id] = { ...request };
  }

  onRowEditSave(request: Irequest) {
    if (request.id) {
      this.dataService.editRequest(request).subscribe(
        () => {
          delete this.clonedRequest[request.id];
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request updated' });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update failed' });
          // Revert changes on error
          this.onRowEditCancel(request, this.requestList.findIndex(r => r.id === request.id));
        }
      );
    }
  }

  onRowEditCancel(request: Irequest, index: number) {
    this.requestList[index] = this.clonedRequest[request.id];
    delete this.clonedRequest[request.id];
  }

  deleteRequest(request: Irequest) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this request?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (request.id) {
          this.dataService.deleteRequest(request.id).subscribe(
            () => {
              this.requestList = this.requestList.filter(val => val.id !== request.id);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Request Deleted', life: 3000 });
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete failed' });
            }
          );
        }
      }
    });
  }

}
