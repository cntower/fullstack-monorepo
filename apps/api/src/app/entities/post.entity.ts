import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Exclude } from 'class-transformer';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  title: string;
  @Column('text')
  description: string;
  @Exclude()
  @CreateDateColumn()
  created: Date;
  @Exclude()
  @UpdateDateColumn()
  updated: Date;
  @ManyToOne(type => UserEntity, author => author.posts)
  author: UserEntity;
  @ManyToMany(type => UserEntity, { cascade: true })
  @JoinTable()
  upvotes: UserEntity[];
  @ManyToMany(type => UserEntity, { cascade: true })
  @JoinTable()
  downvotes: UserEntity[];

  @OneToMany(type => CommentEntity, comment=>comment.post)
  comments: CommentEntity[];
}
