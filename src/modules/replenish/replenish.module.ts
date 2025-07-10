import { Module } from '@nestjs/common';
import { ReplenishService } from './replenish.service';
import { ReplenishController } from './replenish.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Replenish } from './entities/replenish.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Replenish, User])],
  controllers: [ReplenishController],
  providers: [ReplenishService],
  exports: [ReplenishService],
})
export class ReplenishModule {}
