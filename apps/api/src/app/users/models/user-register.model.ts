import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserRegisterModel {
  @ApiModelProperty()
  @IsNotEmpty()
  username: string;
  @ApiModelProperty({ type: 'string', format: 'password', example: '12345' })
  @IsNotEmpty()
  password: string;
}