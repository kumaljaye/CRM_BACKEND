/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private userService : UserService) {
        super({
            usernameField : "email",
            passwordField : "password"
        })
    }

    async validate(email : string , password : string) : Promise<User> {
        const user : User = await this.userService.findUserByEmail(email);
        if(user && user.password == password) return user;
        if(user == undefined) throw new UnauthorizedException("User Not Found : " + email);
        if(user.password != password) throw new UnauthorizedException("Invalid Password");
        if (user.status === 'rejected') {
            throw new UnauthorizedException('Your account has been rejected. Please contact support.');
          }
      
          if (user.status !== 'approved') {
            throw new UnauthorizedException('Your account is pending approval.');
          }
    }
}