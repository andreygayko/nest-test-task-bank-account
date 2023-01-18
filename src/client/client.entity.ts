import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'client' })
export class ClientEntity {
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

  @ApiProperty({ example: 'John Doe', description: 'Client name' })
  @Column({ default: '' })
  name: string;

  @ApiProperty({ example: 'Passport', description: 'Client document' })
  @Column({ default: '' })
  document: string;

  @ApiProperty({
    example: '01.01.2001',
    description: 'Client date of birth',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  birth_date: Date;
}
