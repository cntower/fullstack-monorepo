import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { PostEntity } from '../../posts/post.entity';

export class UserViewModel {
  @ApiModelProperty()
  id: string;
  @ApiModelProperty({ type: 'string', format: 'date-time', example: '2018-11-11T06:20:32.232Z' })
  created?: Date;
  @ApiModelProperty()
  username: string;
  @ApiModelPropertyOptional()
  token?: string;
  @ApiModelPropertyOptional({ type: [PostEntity] })
  posts?: PostEntity[];
}