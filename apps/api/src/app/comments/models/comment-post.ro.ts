import { ApiModelProperty } from '@nestjs/swagger';
import { PostRO } from '../../posts/models/post.ro';
import { UserRO } from '../../users/models/user.ro';

export class CommentPostRO {
  @ApiModelProperty()
  id?: string;
  @ApiModelProperty({ type: 'string', format: 'date-time', example: '2018-11-11T06:20:32.232Z' })
  created: Date;
  @ApiModelProperty()
  comment: string;
  @ApiModelProperty()
  author?: UserRO;
  @ApiModelProperty()
  post?: PostRO;
}