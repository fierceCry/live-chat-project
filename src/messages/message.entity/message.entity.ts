import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'liveChat', name: 'users'})
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  sender: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
