import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Composant NavBarService pour gerer le la mise a jour de la tool Bar
 * Le login.composant.ts au subtil : appel la mehode Refresh()
 * A l'init la navBAr est subscriber() au NavBarService, si le refreshSubject change => le comp navnar est avertie
 */
export class NavbarsService {
  isLoggedIn_NavBar = false;
  private refreshSubject = new Subject<void>();

  refreshComponent(isLoggedIn_NavBar : boolean) {
    this.isLoggedIn_NavBar = isLoggedIn_NavBar;
    this.refreshSubject.next();
  }

  getRefreshObservable() {
    return this.refreshSubject.asObservable();
  }
}
