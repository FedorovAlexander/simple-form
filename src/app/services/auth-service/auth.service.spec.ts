import { fakeAsync, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { UserLoginResponse } from '../../models/user.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if user is authenticated', (done) => {
    localStorage.setItem('token', 'test');
    service.isAuthenticated().subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBeTrue();
      done();
    });
  });

  it('should return false if user is not authenticated', (done) => {
    // Make sure no token is set in localStorage
    localStorage.removeItem('token');
    service.isAuthenticated().subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBeFalse();
      done();
    });
  });

  it('should login user', fakeAsync(() => {
    const user: UserLoginResponse = {
      id: 1,
      username: 'test',
    } as UserLoginResponse;
    const loginResponse = { id: 1, username: 'test' };

    service.login('test', 'test').subscribe((response) => {
      expect(response).toEqual(user);
    });

    const req = httpMock.expectOne('https://dummyjson.com/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);
  }));

  it('should return null if login fails', fakeAsync(() => {
    service.login('test', 'test').subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne('https://dummyjson.com/auth/login');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('error'));
  }));
});
