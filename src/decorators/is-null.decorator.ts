import { ValidationOptions, ValidateIf } from 'class-validator';

export function IsNull(validationOptions?: ValidationOptions) {
  return ValidateIf((_, value) => value !== null, validationOptions);
}
