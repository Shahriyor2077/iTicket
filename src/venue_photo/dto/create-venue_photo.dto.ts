import { IsString, IsNumber } from "class-validator";

export class CreateVenuePhotoDto {
  @IsString()
  url: string;

  @IsString()
  venue_id: string;
}
