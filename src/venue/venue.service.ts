import { Injectable } from "@nestjs/common";
import { CreateVenueDto } from "./dto/create-venue.dto";
import { UpdateVenueDto } from "./dto/update-venue.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Venue } from "./schemas/venue.schema";
import { Model } from "mongoose";


@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue.name) private readonly venueSchema: Model<Venue>
  ) {}
  create(createVenueDto: CreateVenueDto) {
    return this.venueSchema.create(createVenueDto);
  }

  findAll() {
    return this.venueSchema
      .find()
      .select("name")
      .populate({ path: "region_id", select: "name" })
      .populate({ path: "district_id", select: "name" });
  }

  findOne(id: string) {
    return this.venueSchema
      .findById(id)
      .select("name")
      .populate({ path: "region_id", select: "name" })
      .populate({ path: "district_id", select: "name" });
  }

  update(id: string, updateVenueDto: UpdateVenueDto) {
    return this.venueSchema.findByIdAndUpdate(id, updateVenueDto);
  }

  remove(id: string) {
    return this.venueSchema.findByIdAndDelete(id);
  }
}
