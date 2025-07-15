import { Module } from "@nestjs/common";
import { SeatService } from "./seat.service";
import { SeatController } from "./seat.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Seat, SeatSchema } from "./schemas/seat.schema";
import { SetType, SetTypeSchema } from "../set_type/schema/set_type.schema";
import { Venue, VenueSchema } from "../venue/schemas/venue.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Seat.name,
        schema: SeatSchema,
      },
      {
        name: SetType.name,
        schema: SetTypeSchema,
      },
      {
        name: Venue.name,
        schema: VenueSchema,
      },
    ]),
  ],
  controllers: [SeatController],
  providers: [SeatService],
  exports: [SeatService],
})
export class SeatModule {}
