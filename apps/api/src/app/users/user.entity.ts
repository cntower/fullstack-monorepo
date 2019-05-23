import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiModelProperty()
  @CreateDateColumn()
  created: Date;
  @ApiModelProperty()
  @Column({
    type: 'text',
    unique: true
  })
  username: string;
  @Column('text')
  password: string;
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  toResponseObject() {
    const { id, created, username, token } = this;
    return { id, created, username, token }
  }
  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
  @ApiModelProperty()
  private get token() {
    const { id, username } = this;
    return jwt.sign({
      id, username
    }, process.env.SECRET, { expiresIn: '7d' })
  }
}
