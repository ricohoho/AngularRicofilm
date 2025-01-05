import { enableProdMode } from '@angular/core';
//import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideHttpClient } from '@angular/common/http';



import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

/*
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()] // Ajoutez provideHttpClient ici
}).catch(err => console.error(err));
*/
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
