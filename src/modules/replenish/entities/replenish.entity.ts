import { User } from 'src/modules/user/entities/user.entity';
import { ERequest } from 'src/shared/types/request';
import { EBookmakers } from 'src/shared/types/telegram';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Replenish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message_id: string;

  @Column()
  bet_id: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  name: string;

  @Column({ enum: ERequest })
  status: ERequest;

  @Column({ enum: EBookmakers, nullable: true, default: EBookmakers.XBET })
  bookmaker: EBookmakers;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.replenish)
  user: User;

  @ManyToOne(() => User, (user) => user.admin_replenish, { nullable: true })
  admin: User;
}
