import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Event, EventSchema } from "./schemas/event.schema";
import { EventTypeModule } from "../event_type/event_type.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
    EventTypeModule,
  ],

  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
