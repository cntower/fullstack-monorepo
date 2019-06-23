import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './models/user.dto';
import { UserRO } from './models/user.ro';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }
  async showAllUsers(page = 1) {
    const users = await this.userRepository.find({
      relations: ['posts', 'bookmarks'],
      take: 25,
      skip: 25 * (page - 1)
    });
    return users.map(user => user.toResponseObject());
  }

  async get(username: string) {
    const user = await this.userRepository.findOne({ where: { username }, relations: ['posts', 'bookmarks'] });
    return user.toResponseObject();
  }

  async login(data: UserDTO): Promise<UserRO> {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
    }
    return user.toResponseObjectWithToken();
  }

  async register(data: UserDTO): Promise<UserRO> {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User alredy exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObjectWithToken();
  }
}
