import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth-service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ERROR_MESSAGES } from '../../utils/error-messages.constant';

class MockAuthService {
  login(username: string, password: string) {
    return of({ id: 1, username });
  }
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: () => '1',
    },
  };
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let authService: AuthService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent],
      providers: [
        HttpClientModule,

        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method from AuthService if form is valid', () => {
    component.loginForm.setValue({ username: 'test', password: 'test' });
    spyOn(authService, 'login').and.callThrough();
    component.onSubmit();
    expect(authService.login).toHaveBeenCalled();
  });

  it('should not call login method from AuthService if form is invalid', () => {
    component.loginForm.setValue({ username: 'test', password: '' });
    spyOn(authService, 'login').and.callThrough();
    component.onSubmit();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should handle error if login throws an error', () => {
    const mockError = new HttpErrorResponse({ status: 500 });
    spyOn(authService, 'login').and.returnValue(throwError(mockError));

    component.loginForm.setValue({ username: 'test', password: 'test' });
    component.onSubmit();

    expect(component.loginFailed).toBeTrue();
    expect(component.errorMessage).toBe(ERROR_MESSAGES['default']);
  });
});
