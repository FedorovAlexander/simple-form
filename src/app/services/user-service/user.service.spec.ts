import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth-service/auth.service';
import { of } from 'rxjs';
import { UserLoginResponse } from '../../models/user.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserService', () => {
  let service: UserService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        UserService,
        {
          provide: AuthService,
          useValue: {
            getUser: jasmine
              .createSpy('getUser')
              .and.returnValue(of({} as UserLoginResponse)),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    service = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user and token correctly', () => {
    const user: UserLoginResponse = {
      token: 'test-token',
    } as UserLoginResponse;
    spyOn(localStorage, 'setItem');

    service.setUserToken(user.token);

    service.getUser().subscribe((user) => {
      expect(user).toEqual(user);
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
  });

  it('should get the current user', () => {
    const user: UserLoginResponse = {
      token: 'test-token',
    } as UserLoginResponse;
    service.setUserToken(user.token);

    service.getUser().subscribe((user) => {
      expect(user).toEqual(user);
    });
  });

  it('should set token to localStorage', () => {
    spyOn(localStorage, 'setItem');
    const token = 'test-token';

    service.setTokenToLocalStorage(token);

    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
  });

  it('should get token from localStorage', () => {
    const token = 'test-token';
    spyOn(localStorage, 'getItem').and.returnValue(token);

    const result = service.getTokenFromLocalStorage();

    expect(result).toBe(token);
  });
});
