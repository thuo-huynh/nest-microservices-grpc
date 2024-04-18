import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME } from 'apps/api-gateway/src/auth/auth.constant';
import { RegisterRequest } from 'apps/api-gateway/src/auth/dto/register-request.dto';
import { RegisterResponse } from 'apps/api-gateway/src/auth/dto/register-response.dto';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login-request.dto';
import { LoginResponse } from './dto/login-response.dto';
import { ValidateRequest } from './dto/validate-request.dto';
import { ValidateResponse } from './dto/validate-respons.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  private register(payload: RegisterRequest): Promise<RegisterResponse>{
    
    console.log("🚀 ~ AuthController ~ register ~ payload:", payload)
    return this.authService.register(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  private login(payload: LoginRequest): Promise<LoginResponse>{
    return this.authService.login(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  private validate(payload: ValidateRequest): Promise<ValidateResponse>{
    return this.authService.validate(payload);
  }
}
