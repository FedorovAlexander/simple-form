export const ERROR_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minlength: 'Please enter at least 3 characters',
  maxlength: 'Please enter no more than 20 characters',
};

export type ErrorKeys = keyof typeof ERROR_MESSAGES;
