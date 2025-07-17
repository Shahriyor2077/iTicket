import { PartialType } from '@nestjs/swagger';
import { CreateCardItemDto } from './create-card_item.dto';

export class UpdateCardItemDto extends PartialType(CreateCardItemDto) {}
