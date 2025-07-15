import { PartialType } from '@nestjs/swagger';
import { CreateSetTypeDto } from './create-set_type.dto';

export class UpdateSetTypeDto extends PartialType(CreateSetTypeDto) {}
