import { ApiModelProperty, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

export class CreateDto {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly age: number;

  @ApiModelProperty()
  readonly breed: string;
}

import { Controller, Get, Put, Delete, Param, Body, Post, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { PostDTO } from './models/post.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../shared/user.decorator';
import { PostRO } from './models/post.ro';
import { PostUserRO } from './models/post-user.ro';
import { Votes } from '../shared/votes.enum';
import { PostEntity } from '../entities';
@ApiUseTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Get()
  @ApiResponse({ status: 200, type: [PostUserRO] })
  getPosts(): Promise<PostRO[]> {
    return this.postsService.getPosts();
  }
  @Get(':id')
  @ApiResponse({ status: 200, type: PostRO })
  getPost(@Param('id') id: string): Promise<PostUserRO> {
    return this.postsService.getPost(id);
  }
  @Post()
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @ApiOperation({ title: 'Create post' })
  @ApiResponse({ status: 201, description: 'The post has been successfully created.', type: PostRO })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createPost(@User('id') userId, @Body() createPost: PostDTO): Promise<PostUserRO> {
    return this.postsService.createPost(userId, createPost);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @ApiOperation({ title: 'Update post' })
  @ApiResponse({ status: 201, description: 'The post has been successfully updated.', type: PostRO })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updatePost(@Param('id') id: string, @User('id') userId, @Body() post: Partial<PostEntity>): Promise<PostUserRO> {
    return this.postsService.updatePost(id, userId, post);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @ApiOperation({ title: 'Delete post' })
  @ApiResponse({ status: 201, description: 'The post has been successfully deleted.', type: String })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async deletePost(@Param('id') id: string, @User('id') userId): Promise<string> {
    return this.postsService.deletePost(id, userId);
  }


  @Post(':id/upvote')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @ApiOperation({ title: 'Upvote post' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async upvotePost(@Param('id') id: string, @User('id') userId) {
    return this.postsService.vote(id, userId, Votes.UP);
  }

  @Post(':id/downvote')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @ApiOperation({ title: 'Down vote post' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async downvotePost(@Param('id') id: string, @User('id') userId) {
    return this.postsService.vote(id, userId, Votes.DOWN);
  }

  @Post(':id/bookmark')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @ApiOperation({ title: 'Bookmark post' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async bookmarkPost(@Param('id') id: string, @User('id') userId) {
    return this.postsService.bookmark(id, userId);
  }

  @Delete(':id/bookmark')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @ApiOperation({ title: 'Unbookmark post' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async unbookmarkPost(@Param('id') id: string, @User('id') userId) {
    return this.postsService.unbookmark(id, userId);
  }
}
