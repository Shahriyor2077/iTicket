import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVenuePhotoDto } from './dto/create-venue_photo.dto';
import { UpdateVenuePhotoDto } from './dto/update-venue_photo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { VenuePhoto } from './schemas/venue_photo.schema';
import { isValidObjectId, Model } from 'mongoose';
import { Venue } from 'src/venue/schemas/venue.schema';

@Injectable()
export class VenuePhotoService {
  constructor(
    @InjectModel(VenuePhoto.name)
    private readonly venuePhotoSchema: Model<VenuePhoto>,
    @InjectModel(Venue.name) private venueSchema: Model<Venue>
  ) {}
  async create(createVenuePhotoDto: CreateVenuePhotoDto) {
    const { venue_id } = createVenuePhotoDto;

    if (!isValidObjectId(venue_id)) {
      throw new BadRequestException("Venue ID noto'g'ri");
    }

    const venue = this.venueSchema.findById(venue_id);
    if (!venue) {
      throw new BadRequestException("Bunday Venue yo'q");
    }

    const venuePhoto = this.venuePhotoSchema.create(createVenuePhotoDto);
    return venuePhoto;
  }

  findAll() {
    return this.venuePhotoSchema
      .find()
      .populate({ path: "venue_id", select: "name" });
  }

  findOne(id: string) {
    return this.venuePhotoSchema
      .findById(id)
      .populate({ path: "venue_id", select: "name" });
  }

  update(id: string, updateVenuePhotoDto: UpdateVenuePhotoDto) {
    return `This action updates a #${id} venuePhoto`;
  }

  remove(id: string) {
    return `This action removes a #${id} venuePhoto`;
  }
}
