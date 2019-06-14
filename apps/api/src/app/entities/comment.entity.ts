import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, JoinTable, OneToOne } from "typeorm";
import { UserEntity } from '../entities';
import { PostEntity } from '../entities';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  created: Date;
  @Column('text')
  comment: string;
  @ManyToOne(type => UserEntity)
  @JoinTable()
  author: UserEntity;
  @ManyToOne(type => PostEntity)
  post: PostEntity;
}