import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EBanks } from '../shared/types';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone_number?: string;

  @Column()
  qrcode_link: string;

  @Column()
  link_hash: string;

  @Column()
  href: string;

  @Column({ enum: EBanks })
  type: EBanks;
}
