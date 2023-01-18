import {
  Injectable,
  CanActivate,
  ExecutionContext,
  applyDecorators,
  UseGuards,
  BadRequestException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { todayString } from '../helpers/date.helper';
import { ACCOUNT_NOT_FOUND, REQUEST_LIMIT_EXCEEDED } from './account.constants';

@Injectable()
export class BalanseRestrictionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  balanceStatistic = {};

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accountId = request.query.id;

    if (!accountId) {
      throw new BadRequestException(ACCOUNT_NOT_FOUND);
    }

    if (
      this.balanceStatistic[accountId] &&
      this.balanceStatistic[accountId].date === todayString()
    ) {
      if (
        this.balanceStatistic[accountId].number ===
        parseInt(process.env.BALANCE_REQUEST_RESTRICTION)
      ) {
        throw new MethodNotAllowedException(REQUEST_LIMIT_EXCEEDED);
      }
      this.balanceStatistic[accountId].number += 1;
    } else {
      this.balanceStatistic[accountId] = {
        date: todayString(),
        number: 1,
      };
    }

    return true;
  }
}

export function BalanceRestriction(...request: string[]) {
  return applyDecorators(), UseGuards(BalanseRestrictionGuard);
}
