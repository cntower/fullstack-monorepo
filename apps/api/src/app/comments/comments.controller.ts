import { Controller, Get, Param, Post, UseGuards, Body, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../shared/user.decorator';
import { CommentDTO } from './models/comment.dto';
import { CommentEntity } from '../entities';
import { CommentPostRO } from './models/comment-post.ro';
import { CommentRO } from './models/comment.ro';

@ApiUseTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) { }

  @Get('post/:postId')
  getCommentsByPost(@Param('postId') postId: string): Promise<CommentPostRO[]> {
    return this.commentService.getCommentsByPost(postId);
  }

  @Get('user/:userId')
  getCommentsByUser(@Param('userId') userId: string): Promise<CommentPostRO[]> {
    return this.commentService.getCommentsByUser(userId);
  }

  @Post('post/:postId')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @ApiOperation({ title: 'Create comment' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createComment(@Param('postId') postId: string, @User('id') userId, @Body() data: CommentDTO): Promise<CommentPostRO> {
    return this.commentService.createComment(postId, userId, data);
  }

  @Get(':id')
  @ApiOperation({ title: 'Get comment' })
  @ApiResponse({ status: 200 })
  getComment(@Param('id') id: string): Promise<CommentPostRO> {
    return this.commentService.getComment(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @ApiOperation({ title: 'Delete comment' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully deleted.', type: String })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  deleteComment(@Param('id') id: string, @User('id') userId): Promise<CommentPostRO> {
    return this.commentService.deleteComment(id, userId);
  }
}
