import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';
import { BalanceRestriction } from './balance.restriction.guard';
import { CreateAccountDto } from './dto/createAccount.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: 'Account creation' })
  async createClient(
    @Body() accountDto: CreateAccountDto,
  ): Promise<AccountEntity> {
    return await this.accountService.createAccount(accountDto);
  }

  @Get('/balance')
  @ApiOperation({
    summary: 'Get account balance by id (limited request number)',
  })
  @BalanceRestriction()
  async getBalance(@Query('id') id: string): Promise<number> {
    return await this.accountService.getAccountBalance(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get account list for testing purposes' })
  async getAccounts(): Promise<AccountEntity[]> {
    return await this.accountService.getAccounts();
  }

  @Post('/lock')
  @ApiOperation({ summary: 'Lock account by id (status "active: false")' })
  async lockAccount(@Body() { account_id }): Promise<AccountEntity> {
    return await this.accountService.lockAccount(account_id);
  }

  @Post('/unlock')
  @ApiOperation({ summary: 'Unlock account by id (status "active: true")' })
  async unlockAccount(@Body() { account_id }): Promise<AccountEntity> {
    return await this.accountService.unlockAccount(account_id);
  }
}
