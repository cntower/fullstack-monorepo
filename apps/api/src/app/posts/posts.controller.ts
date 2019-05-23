import { ApiModelProperty, ApiResponse, ApiOperation } from '@nestjs/swagger';

export class CreateDto {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly age: number;

  @ApiModelProperty()
  readonly breed: string;
}

import { Controller, Get, Put, Delete, Param, Body, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';
@ApiUseTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }
  @Get()
  @ApiResponse({status: 200, type: [PostEntity]})
  getPosts() {
    return this.postsService.getPosts();
  }
  @Get(':id')
  getPost(@Param('id') id: number) {
    return this.postsService.getPost(id);
  }
  @Post()
  @ApiOperation({ title: 'Create post' })
  @ApiResponse({ status: 201, description: 'The post has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createPost(@Body() createPost: CreatePostDto) {
    return this.postsService.createPost(createPost);
  }

  @Put(':id')
  async updatePost(@Param('id') id: number, @Body() post: Partial<PostEntity>) {
    return this.postsService.updatePost(id, post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }
}
