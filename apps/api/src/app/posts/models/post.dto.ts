import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserRO } from '../../users/models/user.ro';

export class PostDTO {
  @ApiModelProperty()
  @IsString()
  readonly title: string;

  @ApiModelProperty()
  @IsString()
  readonly description: string;
  // @ApiModelProperty()
  // author?: UserViewModel;
}