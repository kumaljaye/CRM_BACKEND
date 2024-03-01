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

    async validate(email: string, password: string): Promise<any> {
        const user = await this.userService.findUserByEmail(email);
        if (!user || user.password !== password) {
          throw new UnauthorizedException('Invalid credentials');
        }
        if (user.status !== 'approved') {
          throw new UnauthorizedException('Your account is not approved');
        }
        return user;
      }
}