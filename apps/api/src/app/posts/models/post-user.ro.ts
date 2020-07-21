import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRO } from '../../users/models/user.ro';
import { CommentRO } from '../../comments/models/comment.ro';

export class PostUserRO {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ type: 'string', format: 'date-time', example: '2018-11-11T06:20:32.232Z' })
  created?: Date;
  @ApiProperty({ type: 'string', format: 'date-time', example: '2018-11-11T06:20:32.232Z' })
  updated?: Date;
  @ApiProperty()
  author?: UserRO;
  @ApiProperty()
  upvotes?: number;
  @ApiProperty()
  downvotes?: number;
  @ApiPropertyOptional({ type: [CommentRO] })
  comments?: CommentRO[];
}
