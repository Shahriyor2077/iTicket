import { Module } from '@nestjs/common';
import { CardItemService } from './card_item.service';
import { CardItemController } from './card_item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CardItem, CardItemSchema } from './schemas/card_item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CardItem.name,
        schema: CardItemSchema
      }
    ])
  ],
  controllers: [CardItemController],
  providers: [CardItemService],
  exports: [CardItemService]
})
export class CardItemModule {}
