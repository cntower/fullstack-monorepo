import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity, IPost } from '../../post/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(PostEntity) private postRepository: Repository<PostEntity>) {

  }
  async createPost(post: CreatePostDto) {
    const postRepo = this.postRepository.create(post);
    return this.postRepository.save(postRepo);
  }
  async updatePost(id: number, data: Partial<CreatePostDto>) {
    const post = this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.postRepository.update(id, data);
    return post;
  }
  async deletePost(id: number) {
    const post = this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.postRepository.delete(id);
    return post;
  }
  getPost(id: number) {
    const post = this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }
  async getPosts() {
    return await this.postRepository.find();
  }
}
