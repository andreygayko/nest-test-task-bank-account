import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function StringToNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'StringToNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          //@ts-ignore
          return (
            typeof value === 'string' &&
            !isNaN(+value) &&
            !isNaN(parseFloat(value))
          );
        },
      },
    });
  };
}
