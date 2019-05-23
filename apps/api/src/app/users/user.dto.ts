import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';


export class UserDTO{
  @ApiModelProperty()
  @IsNotEmpty()
  username: string;
  @ApiModelProperty()
  @IsNotEmpty()
  password: string;
}
