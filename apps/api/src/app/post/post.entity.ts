import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from "typeorm";
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('post')
export class PostEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiModelProperty()
  @Column('text')
  title: string;
  @ApiModelProperty()
  @Column('text')
  description: string;
  @Exclude()
  @CreateDateColumn()
  created: Date;
}