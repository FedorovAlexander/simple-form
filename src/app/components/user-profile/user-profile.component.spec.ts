import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { UserService } from '../../services/user-service/user.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/user.interface';

class MockUserService {
  getUser() {
    return of({ id: 1, username: 'test' });
  }
}

class MockAuthService {
  getUser() {
    return of({ id: 1, username: 'test' });
  }
}

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent, HttpClientModule],
      providers: [
        {
          provide: UserService,
          useClass: MockUserService,
        },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUser method from UserService if user exist in user service', () => {
    spyOn(userService, 'getUser').and.callThrough();
    spyOn(authService, 'getUser').and.callThrough();

    component.ngOnInit();

    expect(userService.getUser).toHaveBeenCalled();
  });

  it('should handle case where userService returns no user and authService provides the user', () => {
    spyOn(userService, 'getUser').and.returnValue(of(null));
    spyOn(authService, 'getUser').and.returnValue(
      of({ id: 1, username: 'test' } as User)
    );

    component.ngOnInit();

    component.user$?.subscribe((user) => {
      expect(user).toEqual({ id: 1, username: 'test' } as User);
    });

    expect(userService.getUser).toHaveBeenCalled();
    expect(authService.getUser).toHaveBeenCalled();
  });
});
