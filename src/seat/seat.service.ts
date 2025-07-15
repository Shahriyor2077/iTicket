import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Seat } from './schemas/seat.schema';
import { SetType } from 'src/set_type/schema/set_type.schema';
import { Venue } from 'src/venue/schemas/venue.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class SeatService {
  constructor(
    @InjectModel(Seat.name) private seatSchema: Model<Seat>,
    @InjectModel(SetType.name) private setTypeSchema: Model<SetType>,
    @InjectModel(Venue.name) private venueSchema: Model<Venue>
  ) {}
  async create(createSeatDto: CreateSeatDto) {
    const { set_type_id, venue_id } = createSeatDto;

    if (!isValidObjectId(set_type_id)) {
      throw new BadRequestException("SeatType ID noto'g'ri");
    }
    const setType = await this.setTypeSchema.findById(set_type_id);
    if (!setType) {
      throw new BadRequestException("Bunday SeatType yo'q");
    }

    if (!isValidObjectId(venue_id)) {
      throw new BadRequestException("Venue ID noto'g'ri");
    }
    const venue = await this.venueSchema.findById(venue_id);
    if (venue) {
      throw new BadRequestException("Bunday Venue yo'q");
    }

    const seat = this.seatSchema.create(createSeatDto);
    return seat;
  }

  findAll() {
    return this.seatSchema.find();
  }

  findOne(id: string) {
    return this.seatSchema.findById(id);
  }

  update(id: string, updateSeatDto: UpdateSeatDto) {
    return this.seatSchema.findByIdAndUpdate(id, updateSeatDto, { new: true });
  }

  remove(id: string) {
    return this.seatSchema.findByIdAndDelete(id);
  }
}
