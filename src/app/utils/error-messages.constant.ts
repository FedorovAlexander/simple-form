export const ERROR_MESSAGES: ValidationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minlength: 'Please enter at least 3 characters',
  maxlength: 'Please enter no more than 20 characters',
  invalidLogin: 'Login failed. Please check your credentials and try again',
};

interface ValidationMessages {
  [key: string]: string;
}
