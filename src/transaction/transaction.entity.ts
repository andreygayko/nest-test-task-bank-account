import { ApiProperty } from '@nestjs/swagger';
import { AccountEntity } from 'src/account/account.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'transaction' })
export class TransactionEntity {
  @ApiProperty({
    example: '917db5f9e6b543a2af66a7270d920e7',
    description: 'Account Unique ID',
  })
  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  generateUuid() {
    this.id = uuidv4().replace(/-/g, '');
  }

  @ApiProperty({ example: '1.23', description: 'Transaction value' })
  @Column({
    type: 'float',
    transformer: {
      to(value) {
        return Number(value);
      },
      from(value) {
        return value;
      },
    },
    default: 0,
  })
  value: number;

  @ApiProperty({
    example: '2002-02-20',
    description: 'Transaction date',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  transaction_date: Date;

  @ManyToOne((type) => AccountEntity, (account) => account.id, { eager: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'account_id' })
  account_id: AccountEntity;
}
