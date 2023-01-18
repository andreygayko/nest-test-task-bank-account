import {
  BadRequestException,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from '../client/client.service';
import { Repository } from 'typeorm';
import {
  ACCOUNT_NOT_FOUND,
  BALANCE_EXCEEDED,
  LIMIT_EXCEEDED,
  NOT_ACTIVE,
} from './account.constants';
import { AccountEntity } from './account.entity';
import { CreateAccountDto } from './dto/createAccount.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly clientService: ClientService,
  ) {}

  async createAccount(accountDto: CreateAccountDto): Promise<AccountEntity> {
    const client = await this.clientService.createClient({
      name: accountDto.name,
      document: accountDto.document,
      birth_date: accountDto.birth_date,
    });
    const newAccount = new AccountEntity();
    Object.assign(newAccount, { ...accountDto, person_id: client.id });
    return await this.accountRepository.save(newAccount);
  }

  async getAccountById(account_id: string): Promise<AccountEntity> {
    return this.accountRepository.findOneBy({ id: account_id });
  }

  async getAccounts(): Promise<AccountEntity[]> {
    return await this.accountRepository.find();
  }

  async increaseBalance({ account_id, value }): Promise<AccountEntity> {
    const account = await this.getAccountById(account_id);

    if (!account) {
      throw new BadRequestException(ACCOUNT_NOT_FOUND);
    }
    if (!account.active) {
      throw new MethodNotAllowedException(NOT_ACTIVE);
    }

    account.balance = account.balance + parseFloat(value);

    return await this.accountRepository.save(account);
  }

  async withdrawCash(
    { account_id, value },
    withdrawalToday: number,
  ): Promise<AccountEntity> {
    const account = await this.getAccountById(account_id);
    if (!account) {
      throw new BadRequestException(ACCOUNT_NOT_FOUND);
    }
    if (!account.active) {
      throw new MethodNotAllowedException(NOT_ACTIVE);
    }
    if (withdrawalToday + parseFloat(value) > Math.abs(withdrawalToday)) {
      throw new MethodNotAllowedException(LIMIT_EXCEEDED);
    }
    if (account.balance < value) {
      throw new MethodNotAllowedException(BALANCE_EXCEEDED);
    }
    account.balance = account.balance - parseFloat(value);

    return await this.accountRepository.save(account);
  }

  async lockAccount(accountId: string): Promise<AccountEntity> {
    const account = await this.getAccountById(accountId);

    if (!account) {
      throw new BadRequestException(ACCOUNT_NOT_FOUND);
    }
    account.active = false;
    return await this.accountRepository.save(account);
  }

  async unlockAccount(accountId: string): Promise<AccountEntity> {
    const account = await this.getAccountById(accountId);
    if (!account) {
      throw new BadRequestException(ACCOUNT_NOT_FOUND);
    }
    account.active = true;
    return await this.accountRepository.save(account);
  }

  async getAccountBalance(accountId: string): Promise<number> {
    const account = await this.getAccountById(accountId);

    if (!account) {
      throw new BadRequestException(ACCOUNT_NOT_FOUND);
    }
    if (!account.active) {
      throw new MethodNotAllowedException(NOT_ACTIVE);
    }

    return account.balance;
  }
}
