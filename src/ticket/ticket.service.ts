import { ConflictException, Injectable } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Ticket } from "./schemas/ticket.schema";
import { Model } from "mongoose";

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketSchema: Model<Ticket>
  ) {}
  create(createTicketDto: CreateTicketDto) {
    return this.ticketSchema.create(createTicketDto);
  }

  findAll() {
    return this.ticketSchema.find().populate("ticket_status_id");
  }

  findOne(id: number) {
    return this.ticketSchema.findOne().populate("ticket_status_id");
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
