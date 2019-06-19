import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities';
import { UserEntity } from '../entities';
import { Repository } from 'typeorm';
// import { CommentEntity } from './comment.entity';
import { CommentDTO } from './models/comment.dto';
import { CommentEntity } from '../entities';
import { CommentPostRO } from './models/comment-post.ro';
import { CommentRO } from './models/comment.ro';

@Injectable()
export class CommentsService {
  async getCommentsByUser(userId: string, page = 1): Promise<CommentPostRO[]> {
    const comments = await this.commentRepository.find({
      where: { author: userId },
      take: 25,
      skip: 25 * (page - 1)
    }); // relations?
    return comments;
  }
  async getCommentsByPost(postId: string, page = 1): Promise<CommentPostRO[]> {
    const comments = await this.commentRepository.find({
      where: { post: postId },
      take: 25,
      skip: 25 * (page - 1)
    });
    return comments;
  }
  async createComment(postId: string, userId: any, data: CommentDTO): Promise<CommentPostRO> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    const author = await this.userRepository.findOne({ where: { id: userId } });

    const comment = this.commentRepository.create({
      ...data,
      author,
      post
    });
    await this.commentRepository.save(comment);
    return comment;
  }
  async getComment(id: string): Promise<CommentPostRO> {
    return await this.commentRepository.findOne({ where: { id }, relations: ['author', 'post'] });
  }
  async deleteComment(id: string, userId: string): Promise<CommentPostRO> {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['author', 'post'] });
    if (comment.author.id !== userId) {
      throw new HttpException('You do not own this comment', HttpStatus.UNAUTHORIZED);
    }
    await this.commentRepository.remove(comment);
    return comment;
  }
  constructor(
    @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
    @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) { }
}
