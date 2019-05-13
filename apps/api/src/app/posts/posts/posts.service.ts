import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity, IPost } from '../../post/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(PostEntity) private postRepository: Repository<PostEntity>) {

  }
  async createPost(post: IPost) {
    const postRepo = this.postRepository.create(post);
    return this.postRepository.save(postRepo);
  }
  async updatePost(id: number, post: IPost) {
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
