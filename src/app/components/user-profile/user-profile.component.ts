import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user-service/user.service';
import { Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  user$: Observable<User | null> | undefined;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.user$ = this.userService.getUser().pipe(
      switchMap((user) => {
        if (user) {
          return of(user);
        } else {
          return this.authService.getUser();
        }
      })
    );
  }
}
