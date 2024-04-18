import { RegisterRequest } from "apps/api-gateway/src/auth/dto/register-request.dto";
import { RegisterResponse } from "apps/api-gateway/src/auth/dto/register-response.dto";
import { Observable } from "rxjs";
import { LoginResponse } from "./dto/login-response.dto";
import { LoginRequest } from "./dto/login-request.dto";
import { ValidateRequest } from "./dto/validate-request.dto";
import { ValidateResponse } from "./dto/validate-respons.dto";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";

export interface AuthServiceClient {
    register(request: RegisterRequest): Observable<RegisterResponse>;
  
    login(request: LoginRequest): Observable<LoginResponse>;
  
    validate(request: ValidateRequest): Observable<ValidateResponse>;
  }
  
  export interface AuthServiceController {
    register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;
  
    login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;
  
    validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;
  }
  
  export function AuthServiceControllerMethods() {
    return function (constructor: Function) {
      const grpcMethods: string[] = ["register", "login", "validate"];
      for (const method of grpcMethods) {
        const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
        GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
      }
      const grpcStreamMethods: string[] = [];
      for (const method of grpcStreamMethods) {
        const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
        GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
      }
    };
  }