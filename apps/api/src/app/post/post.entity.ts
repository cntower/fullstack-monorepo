import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from "typeorm";

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column('text') title: string;
  @Column('text') description: string;
  @CreateDateColumn() created: Date;
}