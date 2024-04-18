import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '../jwt.service';
import { Auth } from '../entities/auth.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


  constructor(configService: ConfigService, @Inject(JwtService)
  private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: true,
    });
  }

  private validate(token: string): Promise<Auth | never> {
    console.log("🚀 ~/////////////////JwtStrategy ~ validate ~ token:", token)
    return this.jwtService.validateUser(token);
  }
}
