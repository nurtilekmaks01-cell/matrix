import { EBanks } from 'src/modules/bank/shared/types';
import { User } from 'src/modules/user/entities/user.entity';
import { ERequest } from 'src/shared/types/request';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Withdraw {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bet_id: string;

  @Column({ enum: ERequest })
  status: ERequest;

  @Column({ enum: EBanks })
  bank: EBanks;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  price: string | null;

  @Column()
  phone_number: string;

  @Column()
  secret_code: string;

  @Column()
  message_id: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.withdraw)
  user: User;

  @ManyToOne(() => User, (user) => user.admin_replenish, { nullable: true })
  admin: User;
}
