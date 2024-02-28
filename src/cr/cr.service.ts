/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCrDto } from './dto/create-cr.dto';
import { UpdateCrDto } from './dto/update-cr.dto';
import { Cr } from './entities/cr.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CrRepository } from './repo/cr.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CrService {
  constructor(@InjectRepository(Cr)
  private crRepository: CrRepository,
  private userService: UserService,
) {}

async create(createCrDto: CreateCrDto, userId: number) {
  const cr: Cr = new Cr();
  cr.title = createCrDto.title;
  cr.description = createCrDto.description;
  cr.date = new Date().toLocaleString();
  cr.completed = false;
  cr.user = await this.userService.findUserById(userId);

  return this.crRepository.save(cr);
}

findAllCrByUserNotCompleted(userId: number) {
  // userid not completed
  return this.crRepository.find({
    relations: ["user"],
    where: { user: { id: userId }, completed: false }});
}

findAllCrByUserCompleted(userId: number) {
  // userid completed
  return this.crRepository.find({
    relations: ['user'],
    where: { user: { id: userId }, completed: true },
  });
}

update(crId: number) {
  return this.crRepository.update(crId, { completed : true});
}

remove(crId: number) {
  return this.crRepository.delete(crId);
}

}
