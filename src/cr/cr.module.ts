/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CrService } from './cr.service';
import { CrController } from './cr.controller';
import { Cr } from './entities/cr.entity';
import { CrRepository } from './repo/cr.repository';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Cr,CrRepository]), UserModule],
  controllers: [CrController],
  providers: [CrService],
  exports: [CrService],
})
export class CrModule {}
