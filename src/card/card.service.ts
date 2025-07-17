import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './schemas/card.schema';
import { Model } from 'mongoose';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private readonly cardSchema: Model<Card>
  ){}
  create(createCardDto: CreateCardDto) {
    return ;
  }

  findAll() {
    return this.cardSchema.find().populate("booking_id", "customer_id");
  }

  findOne(id: number) {
    return this.cardSchema.findById(id);
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
