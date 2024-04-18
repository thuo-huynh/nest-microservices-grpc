import { Injectable } from "@nestjs/common";
import { Auth } from "./entities/auth.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService as Jwt } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class JwtService {
    constructor(@InjectRepository(Auth) private readonly repository: Repository<Auth>, private readonly jwt: Jwt){
        this.jwt = jwt;
    }

    public async decode(token: string): Promise<unknown> {
        return this.jwt.decode(token, null);
    }

    public async validateUser(decoded: any): Promise<Auth> {
    return this.repository.findOne(decoded.id);
    }

    public generateToken(auth: Auth): string {
        return this.jwt.sign({ id: auth.id, email: auth.email });
    }

    public encodePassword(password: string): string {
        const salt: string = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    public isPasswordValid(password: string, userPassword: string): boolean {
        return bcrypt.compareSync(password, userPassword);
    }

    public async verify(token: string): Promise<any> {
        try {
          return this.jwt.verify(token);
        } catch (err) {
        console.log("🚀 ~ JwtService ~ verify ~ err:", err)
        }
      }
    
}