import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { IPostDTO } from '@mono/api-interface';

export class PostDTO implements IPostDTO {
  @ApiModelProperty()
  @IsString()
  readonly title: string;

  @ApiModelProperty()
  @IsString()
  readonly description: string;
}