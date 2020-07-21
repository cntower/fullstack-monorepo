import { ApiProperty } from '@nestjs/swagger';
import { PostRO } from '../../posts/models/post.ro';
import { UserRO } from '../../users/models/user.ro';

export class CommentPostRO {
  @ApiProperty()
  id?: string;
  @ApiProperty({ type: 'string', format: 'date-time', example: '2018-11-11T06:20:32.232Z' })
  created: Date;
  @ApiProperty()
  comment: string;
  @ApiProperty()
  author?: UserRO;
  @ApiProperty()
  post?: PostRO;
}
