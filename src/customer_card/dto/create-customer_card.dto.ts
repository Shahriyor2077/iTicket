import { IsString, IsNumber } from "class-validator";

export class CreateCustomerCardDto {
  @IsString()
  customer_id: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  number: string;

  @IsString()
  year: string;

  @IsString()
  month: string;

  @IsString()
  is_active: boolean;

  @IsString()
  is_main: boolean;
}
