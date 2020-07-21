import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IPostDTO } from '@mono/api-interface';

export class PostDTO implements IPostDTO {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly description: string;
}
