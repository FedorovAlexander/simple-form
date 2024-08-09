import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { ERROR_MESSAGES, ErrorKeys } from '../../utils/error-messages.constant';

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
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() placeholder!: string;
  @Input() formControl!: FormControl;
  @Input() formControlName!: string;
  @Input() errors: ValidationErrors | null = null;
  @Input() isDisabled: boolean = false;

  value: string = '';

  errorMessages = ERROR_MESSAGES;

  onChange!: (value: string) => void;
  onTouched!: () => void;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
    console.log(this.errors);
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

  getErrorMessage(errorName: string): string | null {
    if (this.errors) {
      if (this.errors[errorName]) {
        return this.errorMessages[errorName as ErrorKeys];
      }
    }
    return null;
  }
}
