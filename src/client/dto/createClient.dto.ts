import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'John Doe', description: 'Client name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Passport', description: 'Client document' })
  @IsString()
  @IsNotEmpty()
  readonly document: string;

  @ApiProperty({
    example: '01.01.2001',
    description: 'Client date of birth',
  })
  @IsNotEmpty()
  readonly birth_date: Date;
}
