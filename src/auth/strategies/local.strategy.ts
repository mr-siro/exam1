import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth_service: AuthService) {
    super({ usernameField: 'email' }); // Mặc định là username, đổi sang email
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.auth_service.getAuthenticatedUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
