import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from '../client/client.module';
import { AccountController } from './account.controller';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';
import { BalanseRestrictionGuard } from './balance.restriction.guard';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity]), ClientModule],
  controllers: [AccountController],
  providers: [AccountService, BalanseRestrictionGuard],
  exports: [AccountService],
})
export class AccountModule {}
