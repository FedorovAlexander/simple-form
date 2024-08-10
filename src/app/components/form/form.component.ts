import { Component, OnInit } from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service/auth.service';
import { catchError, of, tap } from 'rxjs';
import { ERROR_MESSAGES } from '../../utils/error-messages.constant';
import { LoaderService } from '../../services/loader-service/loader.service';
import { LoaderComponent } from '../loader/loader.component';
import { LoaderSize } from '../loader/loader-size.enum';
import { RouterModule } from '@angular/router';

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
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  loginForm!: FormGroup;
  submitError = false;
  errorMessage = '';

  readonly LoaderSize = LoaderSize;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  get isLoaderActive(): boolean {
    return this.loaderService.isLoading.value;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loaderService.showLoader();
      const { username, password } = this.loginForm.value;
      this.authService
        .login(username, password)
        .pipe(
          tap((response) => {
            console.log('Login successful:', response);
            this.loaderService.hideLoader();
            this.submitError = false;
          }),
          catchError((error) => {
            if (
              error.status === 401 ||
              error.status === 403 ||
              error.status === 400
            ) {
              this.errorMessage = ERROR_MESSAGES['invalidLogin'];
            }
            this.submitError = true;
            this.loaderService.hideLoader();
            return of(this.errorMessage);
          })
        )
        .subscribe();
    }
  }
}
