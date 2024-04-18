import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterRequest } from 'apps/api-gateway/src/auth/dto/register-request.dto';
import { RegisterResponse } from 'apps/api-gateway/src/auth/dto/register-response.dto';
import { Repository } from 'typeorm';
import { LoginRequest } from './dto/login-request.dto';
import { LoginResponse } from './dto/login-response.dto';
import { ValidateRequest } from './dto/validate-request.dto';
import { ValidateResponse } from './dto/validate-respons.dto';
import { Auth } from './entities/auth.entity';
import { JwtService } from './jwt.service';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth) private readonly repository: Repository<Auth>, @Inject(JwtService) private readonly jwtService: JwtService){}

  public async register({email, password}: RegisterRequest): Promise<RegisterResponse>{
    const auth: Auth = await this.repository.findOne({ where: { email } });
    console.log("🚀 ~ AuthService ~ register ~ auth:", auth)
    if (auth) {
      return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
    }

    const data = new Auth()
    data.email = email;
    data.password = this.jwtService.encodePassword(password);

    await this.repository.save(data);

    return { status: HttpStatus.CREATED, error: null };
  }

  public async login({ email, password }: LoginRequest): Promise<LoginResponse> {
    const auth: Auth = await this.repository.findOne({ where: { email } });
    if (!auth) {
      return { status: HttpStatus.NOT_FOUND, error: ['E-Mail not found'], token: null };
    }

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(password, auth.password);
    if (!isPasswordValid) {
      return { status: HttpStatus.NOT_FOUND, error: ['Password wrong'], token: null };
    }

    const token: string = this.jwtService.generateToken(auth);
    return { token, status: HttpStatus.OK, error: null };
  }

  public async validate({ token }: ValidateRequest): Promise<ValidateResponse> {
    const decoded: Auth = await this.jwtService.verify(token);
    if (!decoded) {
      return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null };
    }

    const auth: Auth = await this.jwtService.validateUser(decoded);
    if (!auth) {
      return { status: HttpStatus.CONFLICT, error: ['User not found'], userId: null };
    }

    return { status: HttpStatus.OK, error: null, userId: decoded.id };
  }
}
