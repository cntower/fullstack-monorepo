import { ApiProperty } from '@nestjs/swagger';

export class PostRO {
  @ApiProperty()
  id?:string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ type: 'string', format: 'date-time', example: '2018-11-11T06:20:32.232Z' })
  created?: Date;
  @ApiProperty({ type: 'string', format: 'date-time', example: '2018-11-11T06:20:32.232Z' })
  updated?: Date;
}
