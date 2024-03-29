/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';
import { CrModule } from './cr/cr.module';

// FIND ALL USERS
//ADD USER
//DELETE USER


//ADD TODO BASED ON USER ID
//FIND ALL TODOS BASED ON USER ID (NOT COMPLETED)
//FIND ALL COMPLETED  TODOS BASED ON USER ID (COMPLETD)
//MARK TODO AS COMPLETED BASED ON TODO ID
//DELETE TODO BASED ON TODO ID


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.local.env']}),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : (configService: ConfigService) => ({
        type : "mysql",
        host : configService.get("DATABASE_HOST"),
        port : configService.get<number>("DATABASE_PORT"),
        username : configService.get("DATABASE_USERNAME"),
        password : configService.get("DATABASE_PASSWORD"),
        synchronize : configService.get<boolean>("DATABASE_SYNC"),
        logging : configService.get<boolean>("DATABASE_LOGGING"),
        database : configService.get("DATABASE_NAME"),
        entities : [__dirname + '/**/*.entity{.ts,.js}'],
      })
    }),
    UserModule,
    AuthModule,
    CrModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
