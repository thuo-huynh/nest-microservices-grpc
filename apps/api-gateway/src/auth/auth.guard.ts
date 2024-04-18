import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ValidateResponse } from './dto/validate-response.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  public readonly service: AuthService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: Request = ctx.switchToHttp().getRequest<Request>();
    const authorization: string = req.headers['authorization'];
    console.log("🚀 ~ AuthGuard ~ canActivate ~ authorization:", authorization)

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');
    console.log("🚀 ~ AuthGuard ~ canActivate ~ bearer:", bearer)

    if (!bearer) {
      throw new UnauthorizedException();
    }

    const token: string = bearer[1];

    const { status, userId }: ValidateResponse = await this.service.validate(token);
    console.log("🚀 ~ AuthGuard ~ canActivate ~ userId:", userId);
    
    (req as any).user = userId;

    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
