import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserViewModel } from '../../users/models/user-view.model';

export class PostRO {
  @ApiModelProperty()
  id?:string;
  @ApiModelProperty()
  @IsString()
  readonly title: string;
  @ApiModelProperty()
  @IsString()
  readonly description: string;
  @ApiModelProperty({ type: 'string', format: 'date-time', example: '2018-11-11T06:20:32.232Z' })
  created?: Date;
  @ApiModelProperty({ type: 'string', format: 'date-time', example: '2018-11-11T06:20:32.232Z' })
  updated?: Date;
  @ApiModelProperty()
  author?: UserViewModel;
}