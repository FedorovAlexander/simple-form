import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { ERROR_MESSAGES } from '../../utils/error-messages.constant';
import { InputTypes } from './input-types.enum';

@Component({
  selector: 'app-input-field',
  standalone: true,
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements OnInit, ControlValueAccessor {
  @Input() label!: string;
  @Input() inputType: string = 'text';
  @Input() placeholder!: string;
  @Input() formControl!: FormControl;
  @Input() formControlName!: string;
  @Input() errors: ValidationErrors | null = null;
  @Input() isDisabled: boolean = false;
  @Input() inputId!: string;

  value: string = '';
  showPassword: boolean = true;

  errorMessages = ERROR_MESSAGES;
  inputTypes = InputTypes;

  ngOnInit(): void {
    this.showPassword =
      this.inputType === this.inputTypes.password
        ? this.showPassword === false
        : true;
  }

  onChange!: (value: string) => void;
  onTouched!: () => void;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleInputChange(): void {
    this.onChange(this.value);
  }

  togglePasswordVisibility($event: Event): void {
    $event.preventDefault();
    this.showPassword = !this.showPassword;
  }
}
