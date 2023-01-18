import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { StringToNumber } from '../../validators/stringToNumber.validator';

export class CreateAccountDto {
  @ApiProperty({ example: 'John Doe', description: 'Client name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Passport', description: 'Client document' })
  @IsString()
  @IsNotEmpty()
  readonly document: string;

  @ApiProperty({
    example: '2002-02-20',
    description: 'Client date of birth',
  })
  @IsNotEmpty()
  @IsDateString()
  readonly birth_date: Date;

  @ApiProperty({ example: '5.99', description: 'Client balance' })
  @StringToNumber({ message: 'balance should able to be casted to number' })
  readonly balance: string;

  @ApiProperty({ example: '5.99', description: 'Daily withdrawal cash limit' })
  @StringToNumber({
    message: 'daily_withdrawal_limit should able to be casted to number',
  })
  @IsNotEmpty()
  readonly daily_withdrawal_limit: string;

  @ApiProperty({
    example: 'true',
    description: 'Shows if account is active or not',
  })
  @IsBoolean()
  @IsNotEmpty()
  readonly active: boolean;

  @ApiProperty({ example: '1', description: 'Account type' })
  @IsNotEmpty()
  readonly account_type: number;
}
