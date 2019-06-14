import { ApiModelProperty } from '@nestjs/swagger';

export class PostRO {
  @ApiModelProperty()
  id?:string;
  @ApiModelProperty()
  title: string;
  @ApiModelProperty()
  description: string;
  @ApiModelProperty({ type: 'string', format: 'date-time', example: '2018-11-11T06:20:32.232Z' })
  created?: Date;
  @ApiModelProperty({ type: 'string', format: 'date-time', example: '2018-11-11T06:20:32.232Z' })
  updated?: Date;
}