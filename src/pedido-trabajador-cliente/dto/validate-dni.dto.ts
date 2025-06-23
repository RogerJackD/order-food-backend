import { IsString, Length, Matches } from "class-validator";

export class ValidateDniDto {

  @IsString()
  @Length(8, 8, { message: 'El DNI debe tener exactamente 8 caracteres' })
  @Matches(/^\d+$/, { message: 'El DNI debe contener solo números' })
  dni: string;
}