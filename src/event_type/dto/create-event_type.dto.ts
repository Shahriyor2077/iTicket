import { IsString, IsNumber } from "class-validator";

export class CreateEventTypeDto {
  @IsString()
  name: string;

  @IsNumber()
  parent_event_type_id: number;
}
