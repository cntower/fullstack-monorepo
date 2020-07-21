import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostRO } from '../../posts/models/post.ro';

export class UserPostsRO {
  @ApiProperty()
  id: string;
  @ApiProperty({ type: 'string', format: 'date-time', example: '2018-11-11T06:20:32.232Z' })
  created?: Date;
  @ApiProperty()
  username: string;
  @ApiPropertyOptional()
  token?: string;
  @ApiPropertyOptional({type: [PostRO]})
  posts?: PostRO[];
  @ApiPropertyOptional({type: [PostRO]})
  bookmarks?: PostRO[];
}
