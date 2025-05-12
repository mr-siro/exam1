/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface JWTPayload {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: CreateUserDto) {
    if (!registrationData.password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(registrationData.password, 10);

    const createdUser = await this.userService.createUser({
      ...registrationData,
      password: hashedPassword,
    });

    // Tạo payload chứa thông tin cần thiết (ví dụ: user id hoặc email)
    const payload = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
    };
    const accessToken = this.jwtService.sign(payload);

    // Xoá password khỏi kết quả trả về
    const { password, ...userWithoutPassword } = createdUser;

    return {
      user: userWithoutPassword,
      accessToken,
    };
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = '';
      return user;
    } catch (error: any) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  login(account: { id: number; name: string; email: string; role: string }): {
    access_token: string;
    name: string;
    email: string;
    role: string;
  } {
    const { id, name, email, role } = account;
    const payload: JWTPayload = { id, name, email, role };

    return {
      access_token: this.jwtService.sign(payload),
      name,
      email,
      role,
    };
  }
}
