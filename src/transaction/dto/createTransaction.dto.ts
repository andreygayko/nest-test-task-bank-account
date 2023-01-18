import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { StringToNumber } from '../../validators/stringToNumber.validator';

export class CreateTransactionDto {
  @ApiProperty({
    example: '917db5f9e6b543a2af66a7270d920e7',
    description: 'Account id',
  })
  @IsString()
  @IsNotEmpty()
  readonly account_id: string;

  @ApiProperty({ example: '5.99', description: 'Amount of funds' })
  @StringToNumber({ message: 'value should able to be casted to number' })
  @IsNotEmpty()
  readonly value: string;
}
