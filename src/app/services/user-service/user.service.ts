import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.interface';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$ = new BehaviorSubject<User | null>(null);

  setUser(user: User): void {
    this.user$.next(user);
    this.setTokenToLocalStorage(user.token);
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
