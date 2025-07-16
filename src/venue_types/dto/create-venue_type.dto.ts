import { IsString, IsNumber } from "class-validator";

export class CreateVenueTypeDto {
  @IsString()
  name: string;
}
