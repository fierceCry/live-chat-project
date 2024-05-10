import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserContent } from './UserContent';

@Entity({ schema: 'liveChat', name: 'users'})
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { name: "email", length: 30 })
  email: string;

  @Column("varchar", { name: "password", length: 100, nullable: true})
  password: string;
  
  @Column('varchar', {name: 'nickname', length: 100,})
  nickname: string;
  
  @OneToMany(() => UserContent, content => content.user)
  contents: UserContent[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
