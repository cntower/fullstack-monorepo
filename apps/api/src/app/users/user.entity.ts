import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserViewModel } from './models/user-view.model';
import { PostEntity } from '../posts/post.entity';

@Entity('user')
export class UserEntity {
  get token() {
    const { id, username } = this;
    return jwt.sign({
      id, username
    }, process.env.SECRET, { expiresIn: '7d' })
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  created: Date;
  @Column({
    type: 'text',
    unique: true
  })
  username: string;
  @Column('text')
  password: string;

  @OneToMany(type => PostEntity, post => post.author)
  posts: PostEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObjectWithToken(): UserViewModel {
    const { id, created, username, token, posts } = this;
    return { id, created, username, token, posts }
  }
  toResponseObject(): UserViewModel {
    const { id, created, username, posts } = this;
    return { id, created, username, posts }
  }
  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
}
