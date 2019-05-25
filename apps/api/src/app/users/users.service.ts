import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterModel } from './models/user-register.model';
import { UserViewModel } from './models/user-view.model';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }
  async showAllUsers() {
    const users = await this.userRepository.find();
    return users.map(user => user.toResponseObject());
  }

  async login(data: UserRegisterModel): Promise<UserViewModel> {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
    }
    return user.toResponseObjectWithToken();
  }

  async register(data: UserRegisterModel): Promise<UserViewModel> {
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
