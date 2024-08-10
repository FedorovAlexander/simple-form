import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { InputFieldComponent } from '../input-field/input-field.component';
import { LoaderComponent } from '../loader/loader.component';
import { AuthService } from '../../services/auth-service/auth.service';
import { LoaderService } from '../../services/loader-service/loader.service';
import { UserService } from '../../services/user-service/user.service';
import { ERROR_MESSAGES } from '../../utils/error-messages.constant';
import { LoaderSize } from '../loader/loader-size.enum';
import { ERROR_CODES } from '../../utils/error-codes.constant';
import { HttpErrorResponse } from '@angular/common/http';

interface LoginFormValue {
  username: string;
  password: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldComponent,
    LoaderComponent,
    RouterModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  loginForm!: FormGroup;
  loginFailed = false;
  errorMessage = '';

  readonly LoaderSize = LoaderSize;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loaderService: LoaderService,
    private userService: UserService,
    private router: Router
  ) {}

  get isLoaderActive(): boolean {
    return this.loaderService.isLoading.value;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authenticateUser(this.loginForm.value);
    }
  }

  private authenticateUser(formValue: LoginFormValue): void {
    this.loaderService.showLoader();
    this.errorMessage = '';

    const { username, password } = formValue;

    this.authService
      .login(username, password)
      .pipe(
        tap((response) => this.handleSuccess(response)),
        catchError((error) => this.handleError(error))
      )
      .subscribe();
  }

  private handleSuccess(response: any): void {
    this.loaderService.hideLoader();
    this.loginFailed = false;
    this.userService.setUser(response);
    this.router.navigate(['/user', response.id]);
  }

  private handleError(error: HttpErrorResponse): Observable<string> {
    this.errorMessage = this.getErrorMessage(error);
    this.loginFailed = true;
    this.loaderService.hideLoader();
    return of(this.errorMessage);
  }

  private getErrorMessage(error: any): string {
    const { status } = error;
    if (ERROR_CODES.includes(status)) {
      return ERROR_MESSAGES['invalidLogin'];
    }
    return ERROR_MESSAGES['default'];
  }
}
