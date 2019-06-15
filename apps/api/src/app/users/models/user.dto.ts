import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IUserDTO } from '@mono/api-interface';

export class UserDTO implements IUserDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly username: string;
  @ApiModelProperty({ type: 'string', format: 'password', example: '12345' })
  @IsNotEmpty()
  readonly password: string;
}