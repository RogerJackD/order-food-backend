import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsAfterOrYesterday(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAfterOrYesterday',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const inputDate = new Date(value);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          yesterday.setHours(0, 0, 0, 0); 

          return inputDate >= yesterday;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} debe ser desde ayer en adelante`;
        },
      },
    });
  };
}
