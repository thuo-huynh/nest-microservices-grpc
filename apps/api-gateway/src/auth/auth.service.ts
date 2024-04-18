import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE_NAME } from './auth.constant';
import { AuthServiceClient } from './auth.interface';
import { ValidateResponse } from './dto/validate-response.dto';

@Injectable()
export class AuthService {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  public async validate(token: string): Promise<ValidateResponse> {
    console.log("🚀 ~ AuthService ~ validate ~ token:", token)
    return firstValueFrom(this.svc.validate({ token }));
  }
}
