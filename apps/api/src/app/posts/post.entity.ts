import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, UpdateDateColumn } from "typeorm";
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserEntity } from '../users/user.entity';

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
}