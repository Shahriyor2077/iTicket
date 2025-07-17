import { Injectable } from '@nestjs/common';
import { CreateCardItemDto } from './dto/create-card_item.dto';
import { UpdateCardItemDto } from './dto/update-card_item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CardItem } from './schemas/card_item.schema';
import { Model } from 'mongoose';

@Injectable()
export class CardItemService {
  constructor(
    @InjectModel(CardItem.name) private readonly cardItemSchema: Model<CardItem>
  ){}
  create(createCardItemDto: CreateCardItemDto) {
    return 'This action adds a new cardItem';
  }

  findAll() {
    return this.cardItemSchema.find().populate("card_id", "ticket_id");
  }

  findOne(id: number) {
    return this.cardItemSchema.findOne().populate("card_id", "ticket_id");
  }

  update(id: number, updateCardItemDto: UpdateCardItemDto) {
    return `This action updates a #${id} cardItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} cardItem`;
  }
}
