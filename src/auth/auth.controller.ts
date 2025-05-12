import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
// Removed incorrect import of Request from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticationService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: Request) {
    const { id, name, email, role } = (req as unknown as RequestWithUser).user; // req.user is attached by LocalStrategy
    return this.authenticationService.login({ id, name, email, role });
  }
}
