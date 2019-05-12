import { Injectable } from '@nestjs/common';
import { PostEntity } from '../../app/post/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(PostEntity) private postRepository: Repository<PostEntity>) {

  }
  async createPost(post: PostEntity) {
    const postRepo = this.postRepository.create(post);
    return this.postRepository.save(postRepo);
  }
  async updatePost(id: number, post: PostEntity) {
    await this.postRepository.update(id, post);
    return this.postRepository.findOne({ where: { id } });
  }
  async deletePost(id: number) {
    await this.postRepository.delete(id);
  }
  getPost(id: number) {
    return this.postRepository.findOne({ where: { id } });
  }
  async getPosts() {
    return await this.postRepository.find();
  }
}
