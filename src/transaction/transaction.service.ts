import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';
import { yesterday } from 'src/helpers/date.helper';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { TransactionEntity } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly accountService: AccountService,
  ) {}

  async getTransactionHistory(account_id) {
    return await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.account_id', 'account')
      .where('account.id=:id', { id: account_id })
      .getMany();
  }

  async createRefillTransaction(
    transactionDto: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    const updatedAccount = await this.accountService.increaseBalance(
      transactionDto,
    );
    if (!updatedAccount) {
      throw new BadRequestException();
    }
    const newTransaction = new TransactionEntity();
    Object.assign(newTransaction, { ...transactionDto });

    return await this.transactionRepository.save(newTransaction);
  }

  async createWithdrawalTransaction(
    transactionDto: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    const withdrawedToday = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.value)', 'total')
      .leftJoin('transaction.account_id', 'account')
      .where('account.id=:id', { id: transactionDto.account_id })
      .andWhere('transaction.transaction_date > :yesterday', {
        yesterday: yesterday(),
      })
      .andWhere('transaction.value < 0')
      .getRawOne();

    const withdrawalToday = Math.abs(withdrawedToday.total);
    const updatedAccount = await this.accountService.withdrawCash(
      transactionDto,
      withdrawalToday,
    );
    if (!updatedAccount) {
      throw new BadRequestException();
    }
    const newTransaction = new TransactionEntity();
    Object.assign(newTransaction, {
      ...transactionDto,
      value: -transactionDto.value,
    });
    return await this.transactionRepository.save(newTransaction);
  }
}
