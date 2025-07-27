import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setData(key: string, token: string): void {
    localStorage.setItem(key, token);
  }

  getToken(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeToken(key: string): void {
    localStorage.removeItem(key);
  }

  hasToken(key: string): boolean {
    return !!this.getToken(key);
  }
}
