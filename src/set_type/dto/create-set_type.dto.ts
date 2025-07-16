import { IsString, IsNumber } from "class-validator";

export class CreateSetTypeDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;
}
