import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserViewModel } from '../../users/models/user-view.model';

export class CreatePostDTO {
  @ApiModelProperty()
  @IsString()
  readonly title: string;

  @ApiModelProperty()
  @IsString()
  readonly description: string;
  // @ApiModelProperty()
  // author?: UserViewModel;
}