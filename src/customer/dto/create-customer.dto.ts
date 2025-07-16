import { IsString, IsNumber } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone_number: string;

  @IsString()
  password: string;

  @IsString()
  confirm_password: string;

  @IsString()
  email: string;

  @IsString()
  birth_date: Date;

  @IsString()
  gender: string;

  @IsString()
  lang_id: string;
}
