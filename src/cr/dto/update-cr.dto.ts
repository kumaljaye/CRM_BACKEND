import { PartialType } from '@nestjs/swagger';
import { CreateCrDto } from './create-cr.dto';

export class UpdateCrDto extends PartialType(CreateCrDto) {}
