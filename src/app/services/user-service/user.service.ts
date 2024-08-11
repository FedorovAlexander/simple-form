import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$ = new BehaviorSubject<User | null>(null);

  setUserToken(token: string): void {
    this.setTokenToLocalStorage(token);
  }

  setUser(user: User | null): void {
    this.user$.next(user);
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  setTokenToLocalStorage(token: string): void {
    localStorage.setItem('token', token);
  }

  getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('token');
  }
}
