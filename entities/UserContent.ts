// UserContent.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';

@Entity({ schema: 'liveChat', name: 'user_contents' })
export class UserContent {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  content: string;

  @ManyToOne(() => Users, user => user.contents)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}