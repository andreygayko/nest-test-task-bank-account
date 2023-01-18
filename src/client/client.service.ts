import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ALREADY_EXISTS } from './client.constants';
import { ClientEntity } from './client.entity';
import { CreateClientDto } from './dto/createClient.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async createClient(clientDto: CreateClientDto): Promise<ClientEntity> {
    const isClientExists = await this.clientRepository.findOneBy({
      name: clientDto.name,
    });
    if (isClientExists) {
      throw new BadRequestException(ALREADY_EXISTS);
    }
    const newClient = new ClientEntity();
    Object.assign(newClient, { ...clientDto });

    return await this.clientRepository.save(newClient);
  }
}
