import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { CreatePostDTO } from './models/create-post.dto';
import { UserEntity } from '../users/user.entity';
import { PostRO } from './models/post.ro';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) {

  }

  private ensureOwnership(post: Partial<PostEntity>, userId: string) {
    if (post.author && post.author.id !== userId) {
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
    }
  }

  private toResponseObject(post: PostEntity): PostRO {
    console.log(post);
    return { ...post, author: post.author && post.author.toResponseObject() }
  }

  async createPost(userId: string, postData: CreatePostDTO): Promise<PostRO> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const post = await this.postRepository.create({ ...postData, author: user });
    await this.postRepository.save(post);
    return this.toResponseObject(post);
  }

  async updatePost(id: string, userId: string, data: Partial<CreatePostDTO>): Promise<PostRO> {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['author'] });
    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(post, userId);
    await this.postRepository.update(id, data);
    return post;
  }
  async deletePost(id: string, userId: string): Promise<string> {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['author'] });
    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(post, userId);
    await this.postRepository.delete(id);
    return id;
  }
  async getPost(id: string): Promise<PostRO> {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['author'] });
    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }
  async getPosts(): Promise<PostRO[]> {
    const posts = await this.postRepository.find({ relations: ['author'] });
    return posts.map(post => this.toResponseObject(post))
  }
}
