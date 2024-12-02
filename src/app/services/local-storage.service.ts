import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  getItem(key: string): any {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error('Error passing localStorage data:',error);
    }
  }

  setItem(key: string, data: string): string {
    localStorage.setItem(key, JSON.stringify(data));
    return data
  }

  removeItem(key: string): boolean {
    localStorage.removeItem(key);
    return true;
  }
}
