import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDTO } from './models/post.dto';
import { PostUserRO } from './models/post-user.ro';
import { Votes } from '../shared/votes.enum';
import { PostEntity, UserEntity } from '../entities';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) {

  }

  private async _vote(post: PostEntity, user: UserEntity, vote: Votes) {
    const upvote = post.upvotes.filter(voter => voter.id === user.id).length;
    const downvote = post.downvotes.filter(voter => voter.id === user.id).length;
    if (!upvote && !downvote) {
      post[vote].push(user);
    } else {
      if (downvote) {
        post.downvotes = post.downvotes.filter(voter => voter.id !== user.id);
      }
      if (upvote) {
        post.upvotes = post.upvotes.filter(voter => voter.id !== user.id);
      }
      post[vote].push(user);
      await this.postRepository.save(post);
    }
    return post;
  };

  async vote(id: string, userId: string, vote: Votes) {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['author', 'upvotes', 'downvotes'] });
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['bookmarks'] });
    return this._vote(post, user, vote);
  }

  async bookmark(id: string, userId: string) {
    const post = await this.postRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['bookmarks'] });
    if (user.bookmarks.find(b => b.id === post.id)) {
      throw new HttpException('Post alredy bookmarked', HttpStatus.BAD_REQUEST);
    } else {
      user.bookmarks.push(post);
      await this.userRepository.save(user);
      return user.toResponseObject();
    }
  }

  async unbookmark(id: string, userId: any) {
    const post = await this.postRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['bookmarks'] });
    if (user.bookmarks.find(b => b.id === post.id)) {
      user.bookmarks = user.bookmarks.filter(b => b.id !== post.id)
      await this.userRepository.save(user);
      return user.toResponseObject();
    } else {
      throw new HttpException('Post not bookmarked', HttpStatus.BAD_REQUEST);
    }
  }

  private ensureOwnership(post: Partial<PostEntity>, userId: string) {
    if (post.author && post.author.id !== userId) {
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
    }
  }

  private toResponseObject(post: PostEntity): PostUserRO {
    return {
      ...post,
      author: post.author && post.author.toResponseObject(),
      upvotes: post.upvotes && post.upvotes.length,
      downvotes: post.downvotes && post.downvotes.length
    }
  }

  async createPost(userId: string, postData: PostDTO): Promise<PostUserRO> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const post = await this.postRepository.create({ ...postData, author: user });
    await this.postRepository.save(post);
    return this.toResponseObject(post);
  }

  async updatePost(id: string, userId: string, data: Partial<PostDTO>): Promise<PostUserRO> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'upvotes', 'downvotes']
    });
    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(post, userId);
    await this.postRepository.update(id, data);
    return this.toResponseObject(post);
  }
  async deletePost(id: string, userId: string): Promise<string> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'upvotes', 'downvotes']
    });
    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(post, userId);
    await this.postRepository.delete(id);
    return id;
  }
  async getPost(id: string): Promise<PostUserRO> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'upvotes', 'downvotes']
    });
    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseObject(post);
  }
  async getPosts(page = 1): Promise<PostUserRO[]> {
    const posts = await this.postRepository.find({
      relations: ['author', 'upvotes', 'downvotes'],
      take: 25,
      skip: 25 * (page - 1)
    });
    return posts.map(post => this.toResponseObject(post))
  }
}
