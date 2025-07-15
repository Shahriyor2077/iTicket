import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";
import { TicketStatus } from "./schemas/ticket_status.schema";
import { CreateTicketStatusDto } from "./dto/create-ticket_status.dto";
import { UpdateTicketStatusDto } from "./dto/update-ticket_status.dto";

@Injectable()
export class TicketStatusService {
  constructor(
    @InjectModel(TicketStatus.name) private readonly ticketStatusSchema: Model<TicketStatus>
  ) {}
  async create(createTicketStatusDto: CreateTicketStatusDto) {
    const exist = await this.ticketStatusSchema.findOne({
      name: createTicketStatusDto.name,
    });
    if (exist) {
      throw new ConflictException("Bunday ticketStatus allaqachon mavjud");
    }
    return this.ticketStatusSchema.create(createTicketStatusDto);
  }

  findAll() {
    return this.ticketStatusSchema.find();
  }

  async findOne(id: string) {
    const ticketStatus = await this.ticketStatusSchema.findOne({ _id: id });
    if (!ticketStatus) {
      throw new NotFoundException("Bunday id lik ticketStatus topilmadi");
    }
    return ticketStatus;
  }

  update(id: string, updateTicketStatusDto: UpdateTicketStatusDto) {
    return this.ticketStatusSchema.findByIdAndUpdate(id, updateTicketStatusDto);
  }

  async remove(id: string) {
    return this.ticketStatusSchema.findByIdAndDelete(id);
  }
}
