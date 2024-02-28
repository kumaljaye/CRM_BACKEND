/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repo/user.repository';
import { User } from './entities/user.entity';
import { Constants } from 'src/utils/constants';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class UserService {
  
  constructor(@InjectRepository(User) private readonly userRespository : UserRepository) {}
  
  create(createUserDto: CreateUserDto) {
    const user : User = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;
    user.status = Constants.STATUS.PENDING;
    return this.userRespository.save(user) ;
  }

  findUserById(id:number) {
    return this.userRespository.findOneOrFail({ where: { id: id} });
  }

  findAll() {
    return this.userRespository.find();
  }

  findUserByEmail(email: string) {
    return this.userRespository.findOne({ where: { email:  email} });
  }

  remove(id: number) {
    return this.userRespository.delete(id);
  }

  async approveUser(userId: number): Promise<void> {
    const User = await this.findUserById(userId);
    if (!User) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    User.status = 'approved';
    await this.userRespository.save(User);
  }

  async rejectUser(userId: number): Promise<void> {
    const User = await this.findUserById(userId);
    if (!User) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    User.status = 'rejected';
    await this.userRespository.save(User);
  }

  async updateUser(userId: number, updatedUser: User): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    
    const { userType, status } = updatedUser;
    user.role = userType;
    user.status = status;
  
    return await this.userRespository.save(user);
  }
  
}
