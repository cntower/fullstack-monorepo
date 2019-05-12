import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostsService } from './posts/posts.service';
import { PostEntity } from '../app/post/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }
  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }
  @Get(':id')
  getPost(@Param('id') id: number) {
    return this.postsService.getPost(id);
  }
  @Post()
  async createPost(@Body() post: PostEntity) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  async updatePost(@Param('id') id: number, @Body() post: PostEntity) {
    return this.postsService.updatePost(id, post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }
}
