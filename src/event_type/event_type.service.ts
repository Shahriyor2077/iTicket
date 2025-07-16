import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event_type.dto';
import { UpdateEventTypeDto } from './dto/update-event_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from 'src/event/schemas/event.schema';
import { Model } from 'mongoose';
import { EventType } from './schemas/event_type.schema';

@Injectable()
export class EventTypeService {
  constructor(
    @InjectModel(EventType.name) private readonly eventTypeSchema: Model<EventType>
  ){}
  
  async create(createEventTypeDto: CreateEventTypeDto) {
    const exist=await this.eventTypeSchema.findOne({
      name: createEventTypeDto.name
    })
    if(exist){
      throw new ConflictException("Bunday EventType allaqachon mavjud")
    }
    return this.eventTypeSchema.create(createEventTypeDto)
  }

  findAll() {
    return this.eventTypeSchema.find().populate("event");
  }

  async findOne(id: number) {
    const eventType=await this.eventTypeSchema.findOne({_id: id});
    if(!eventType){
      throw new NotFoundException("Bunday id lik eventType mavjud emas")
    }
    return eventType
  }

  update(id: number, updateEventTypeDto: UpdateEventTypeDto) {
    return `This action updates a #${id} eventType`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventType`;
  }
}
