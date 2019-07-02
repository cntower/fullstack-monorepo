import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { IUserDTO } from '@mono/api-interface';

export class UserDTO implements IUserDTO {
  @ApiModelProperty({
    type: 'string',
    example: 'username',
    minLength: 4,
    maxLength: 64
  })
  @IsNotEmpty()
  @MinLength(4, { message: 'Username must be at least 4 character in length' })
  @MaxLength(64, { message: 'Username must be at most 64 character in length' })
  readonly username: string;
  @ApiModelProperty({
    type: 'string',
    format: 'password',
    example: 'password',
    minLength: 4,
    maxLength: 64,
  })
  @IsNotEmpty()
  @MinLength(4, { message: 'Password must be at least 4 character in length' })
  @MaxLength(64, { message: 'Password must be at most 64 character in length' })
  readonly password: string;
}