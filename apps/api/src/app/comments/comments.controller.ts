import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../shared/user.decorator';
import { CommentDTO } from './models/comment.dto';
import { CommentPostRO } from './models/comment-post.ro';
import { ApiSwaggerOperation } from '../../decorators/api-swagger-operation.decorator';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get('post/:postId')
  @ApiSwaggerOperation()
  getCommentsByPost(
    @Param('postId') postId: string,
    @Query('page') page: number
  ): Promise<CommentPostRO[]> {
    return this.commentService.getCommentsByPost(postId, page);
  }

  @Get('user/:userId')
  @ApiSwaggerOperation()
  getCommentsByUser(
    @Param('userId') userId: string,
    @Query('page') page: number
  ): Promise<CommentPostRO[]> {
    return this.commentService.getCommentsByUser(userId, page);
  }

  @Post('post/:postId')
  @ApiSwaggerOperation()
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  // @ApiOperation({ title: 'Create comment' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createComment(
    @Param('postId') postId: string,
    @User('id') userId,
    @Body() data: CommentDTO
  ): Promise<CommentPostRO> {
    return this.commentService.createComment(postId, userId, data);
  }

  @Get(':id')
  @ApiSwaggerOperation()
  // @ApiOperation({ title: 'Get comment' })
  @ApiResponse({ status: 200 })
  getComment(@Param('id') id: string): Promise<CommentPostRO> {
    return this.commentService.getComment(id);
  }

  @Delete(':id')
  @ApiSwaggerOperation()
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  // @ApiOperation({ title: 'Delete comment' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully deleted.',
    type: String,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  deleteComment(
    @Param('id') id: string,
    @User('id') userId
  ): Promise<CommentPostRO> {
    return this.commentService.deleteComment(id, userId);
  }
}

export class G964 {
  private static parabola = (x: number) => x * x;
  public static lenCurve = (n: number) => {
    const interval = { a: 0, b: 1 };
    const hn = (interval.b - interval.a) / n;
    const hnPow = hn ** 2;
    const py0 = G964.parabola(interval.a);
    let pyOld = py0;
    let lengthSum = 0;
    for (let i = 1; i <= n; i++) {
      const px = interval.a + hn * i;
      const py = G964.parabola(px);
      const dy = py - pyOld;
      pyOld = py;
      const hypotenuse = Math.sqrt(dy * dy + hnPow);
      lengthSum += hypotenuse;
    }
    return lengthSum;
  };
}
