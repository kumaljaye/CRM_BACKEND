/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags("Login")
export class AuthController {

  constructor(private jwtService : JwtService) {}

  @Post('/login')
  @UseGuards(AuthGuard("local"))
  login(@Req() req , @Body() loginDto : LoginDto) {

    //jwt token
    const user : User = req.user;
    const playload = {
        userId : user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status,
    };



    return { token : this.jwtService.sign(playload)};
  }
}
