import { Injectable } from '@nestjs/common';
import { CreateVenueTypeDto } from './dto/create-venue_type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { VenueType } from './schemas/venue_type.schema';
import { Model } from 'mongoose';
import { Venue } from 'src/venue/schemas/venue.schema';
import { Type } from 'src/type/schemas/type.schema';

@Injectable()
export class VenueTypesService {
  constructor(
    @InjectModel(Venue.name) private venueSchema: Model<Venue>,
    @InjectModel(VenueType.name) private venueTypesSchema: Model<VenueType>,
    @InjectModel(Type.name) private typesSchema: Model<Type>
  ) {}
  create(createVenueTypeDto: CreateVenueTypeDto) {
    return this.venueTypesSchema.create(createVenueTypeDto);
  }

  findAll() {
    return this.venueTypesSchema
      .find()
      .populate({ path: "venue_id", select: "name" })
      .populate({ path: "type_id", select: "name" });
  }

  findOne(id: string) {
    return this.venueTypesSchema
      .findById(id)
      .populate({ path: "venue_id", select: "name" })
      .populate({ path: "type_id", select: "name" });
  }

  update(id: string, updateVenueTypeDto: UpdateVenueTypeDto) {
    return this.venueTypesSchema.findByIdAndUpdate(id, updateVenueTypeDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.venueTypesSchema.findByIdAndDelete(id);
  }
}
