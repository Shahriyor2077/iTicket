import { IsString, IsNumber } from "class-validator";

export class CreateSeatDto {
  @IsNumber()
  sector: number;

  @IsNumber()
  row_number: number;

  @IsNumber()
  number: number;

  @IsString()
  set_type_id: string;

  @IsString()
  venue_id: string;

  @IsString()
  location_type_schema: string;
}
