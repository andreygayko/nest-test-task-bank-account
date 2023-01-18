import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { TransactionEntity } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/history')
  @ApiOperation({ summary: 'Get transaction history by account id' })
  async getTransactionHistory(
    @Query('id') accountId: string,
  ): Promise<TransactionEntity[]> {
    return await this.transactionService.getTransactionHistory(accountId);
  }

  @Post('/refill')
  @ApiOperation({ summary: 'Create refill transaction' })
  async refillTransaction(
    @Body() transactionDto: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    return await this.transactionService.createRefillTransaction(
      transactionDto,
    );
  }

  @Post('/withdraw')
  @ApiOperation({ summary: 'Create withdrawal transaction' })
  async withdrawTransaction(
    @Body() transactionDto: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    return await this.transactionService.createWithdrawalTransaction(
      transactionDto,
    );
  }
}
