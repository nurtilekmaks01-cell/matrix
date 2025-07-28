import { Keyup } from 'src/helpers/keyup/entities/keyup.entity';
import { Replenish } from 'src/modules/replenish/entities/replenish.entity';
import { Withdraw } from 'src/modules/withdraw/entities/withdraw.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  telegram_id: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  username: string;

  @Column({ type: 'boolean' })
  is_baned: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true, type: 'integer', default: 0 })
  action_count?: number | null;

  @OneToMany(() => Replenish, (replenish) => replenish.user)
  replenish: Replenish[];

  @OneToMany(() => Replenish, (replenish) => replenish.admin)
  admin_replenish: Replenish[];

  @OneToMany(() => Withdraw, (withdraw) => withdraw.user)
  withdraw: Withdraw[];

  @OneToMany(() => Withdraw, (withdraw) => withdraw.admin)
  admin_withdraw: Withdraw[];

  @OneToMany(() => Keyup, (keyup) => keyup.user)
  keyup: Keyup[];
}
