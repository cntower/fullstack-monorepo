import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, OneToMany, ManyToMany, JoinTable } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { PostEntity } from './post.entity';
import { UserPostsRO } from '../users/models/user-posts.ro';

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

  @ManyToMany(type => PostEntity, { cascade: true })
  @JoinTable()
  bookmarks: PostEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObjectWithToken(): UserPostsRO {
    const { id, created, username, token, posts, bookmarks } = this;
    return { id, created, username, token, posts, bookmarks }
  }
  toResponseObject(): UserPostsRO {
    const { id, created, username, posts, bookmarks } = this;
    return { id, created, username, posts, bookmarks }
  }
  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
}
