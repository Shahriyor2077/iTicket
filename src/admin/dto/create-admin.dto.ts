import { IsString } from "class-validator";

export class CreateAdminDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirm_password: string;
}

