import { IsString, IsNumber } from "class-validator";

export class CreateEventDto {
  @IsString()
  name: string;
  @IsString()
  photo?: string;
  @IsString()
  start_date?: Date;
  @IsString()
  start_time?: Date;
  @IsString()
  finish_date?: Date;
  @IsString()
  finish_time?: Date;
  @IsString()
  info?: string;
  @IsNumber()
  event_type_id?: number;
  @IsNumber()
  human_category_id?: number;
  @IsString()
  parent_event_type_id?: string;
}
