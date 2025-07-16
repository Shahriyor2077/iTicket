import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schemas/event.schema';
import { isValidObjectId, Model } from 'mongoose';
import { EventType } from '../event_type/schemas/event_type.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventSchema: Model<Event>,
    @InjectModel(EventType.name) private readonly eventTypeSchema: Model<EventType>
  ){}

  async create(createEventDto: CreateEventDto) {
    const { parent_event_type_id } =createEventDto;
    if(!isValidObjectId){
      throw new BadRequestException("Event type id noto'g'ri")
    }
    const eventType = await this.eventTypeSchema.findById(parent_event_type_id);
    if(!eventType){
      throw new BadRequestException("Bunday event type yo'q")
    }
    const event=await this.eventSchema.create(createEventDto)
    eventType.events.push(event);
    await eventType.save();
    return event
  }

  findAll() {
    return this.eventSchema.find().populate("parent_event_type_id");
  }

  findOne(id: string) {
    return this.eventSchema.findById(id).populate("parent_event_type_id");
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: string) {
    return `This action removes a #${id} event`;
  }
}
