/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { CrService } from './cr.service';
import { CreateCrDto } from './dto/create-cr.dto';
import { UpdateCrDto } from './dto/update-cr.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('cr')
@ApiTags("Cr")
@ApiSecurity("JWT-auth")
export class CrController {
  constructor(private readonly crService: CrService) {}

  @Post(":userId")
  async create(@Body(ValidationPipe) createCrDto: CreateCrDto, @Param("userId") userId: number) {
    return await this.crService.create(createCrDto, userId);
  }



   @Get("/findAllNotCompleted/:userId")
   findAllCrByUserIdNotCompleted(@Param("userId") userId : number) {
     return this.crService.findAllCrByUserNotCompleted(Number(userId)) ;
   }
  

  @Get("/findAllCompleted/:userId")
  findAllCrByUserIdCompleted(@Param("userId") userId : number) {
    return this.crService.findAllCrByUserCompleted(Number(userId)) ;
  }
  

  @Patch(':id')
  update(@Param('id') id: number) {
    return this.crService.update(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crService.remove(Number(id));
  }
}
