import { Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Booking } from "./schemas/booking.schema";
import { Model } from "mongoose";

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingSchema: Model<Booking>
  ) {}
  create(createBookingDto: CreateBookingDto) {
    return "This action adds a new booking";
  }

  findAll() {
    return this.bookingSchema
      .find()
      .populate({ path: "payment_method_id", select: "name" })
      .populate({ path: "deliver_id", select: "name" })
      .populate("customer_id");
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
