import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDTO {
  @ApiProperty()
  @IsString()
  comment: string;
}
