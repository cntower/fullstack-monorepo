import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CommentDTO {
  @ApiModelProperty()
  @IsString()
  comment: string;
}