import { ApiProperty } from '@nestjs/swagger';
import { ClientEntity } from '../client/client.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'account' })
export class AccountEntity {
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

  @ApiProperty({ example: '1.23', description: 'Account balance' })
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
  balance: number;

  @ApiProperty({
    example: '50.99',
    description: 'Amount of withdrawal cash limited per day',
  })
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
  daily_withdrawal_limit: number;

  @ApiProperty({
    example: 'true',
    description: 'Active account or not',
  })
  @Column({ default: false })
  active: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Active account or not',
  })
  @Column({ type: 'integer', default: 1 })
  account_type: number;

  @ApiProperty({
    example: '2002-02-20',
    description: 'Create date',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @OneToOne((type) => ClientEntity, (client) => client.id)
  @JoinColumn({ referencedColumnName: 'id', name: 'person_id' })
  person_id: ClientEntity;
}
