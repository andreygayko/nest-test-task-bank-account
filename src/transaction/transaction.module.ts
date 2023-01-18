import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from 'src/account/account.module';
import { TransactionController } from './transaction.controller';
import { TransactionEntity } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity]), AccountModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
