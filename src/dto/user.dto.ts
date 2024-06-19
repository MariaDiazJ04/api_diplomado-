import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Gender } from "../enum/gender";

export class UserDto {
  @IsNotEmpty({ message: "El nombre no puede estar vacio" })
  @IsString({ message: "El nombre no es vaido" })
  names: string;

  @IsNotEmpty({ message: "El apellido no puede estar vacio" })
  @IsString({ message: "El apellido no es vaido" })
  lastnames: string;

  @IsNotEmpty({ message: "El genero no puede estar vacio" })
  @IsEnum(Gender, { message: "El genero debe ser Masculino o Femenino" })
  gender: string;

  @IsNotEmpty({ message: "El email no puede estar vacio" })
  @IsEmail()
  email: string;
}
