import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { UserRO } from '../../users/models/user.ro';
import { CommentRO } from '../../comments/models/comment.ro';

export class PostUserRO {
  @ApiModelProperty()
  id?: string;
  @ApiModelProperty()
  title: string;
  @ApiModelProperty()
  description: string;
  @ApiModelProperty({ type: 'string', format: 'date-time', example: '2018-11-11T06:20:32.232Z' })
  created?: Date;
  @ApiModelProperty({ type: 'string', format: 'date-time', example: '2018-11-11T06:20:32.232Z' })
  updated?: Date;
  @ApiModelProperty()
  author?: UserRO;
  @ApiModelProperty()
  upvotes?: number;
  @ApiModelProperty()
  downvotes?: number;
  @ApiModelPropertyOptional({ type: [CommentRO] })
  comments?: CommentRO[];
}