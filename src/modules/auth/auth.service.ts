import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });

    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new UnauthorizedException("Incorrect user password");

    const result = { ...user };
    delete result.password;

    return result;
  }

  public async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
