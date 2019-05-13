import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiModelProperty()
  @IsString()
  readonly title: string;

  @ApiModelProperty()
  @IsString()
  readonly description: string;
}