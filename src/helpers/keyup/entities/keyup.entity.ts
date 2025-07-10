import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EKeyupTypeAction } from '../shared/type';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Keyup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: EKeyupTypeAction })
  type: EKeyupTypeAction;

  @Column()
  value: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.replenish)
  user: User;
}
