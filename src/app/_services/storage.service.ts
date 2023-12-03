import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    console.log('StorageService.clean(): ');
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    console.log('StorageService.isLoggedIn(): USER_KEY='+USER_KEY+' user='+user);
    if (user) {
      console.log('isLoggedIn():return true');
      return true;
    }

    return false;
  }
}
