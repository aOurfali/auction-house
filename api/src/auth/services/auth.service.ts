import { Injectable,  BadRequestException, ForbiddenException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { from, Observable, of } from 'rxjs';
import { User } from 'src/user/models/user.interface';
//import * as bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');
//import { Request, Response } from 'express';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    generateJWT(user: User): Observable<string> {
        return from(this.jwtService.signAsync({user}));
    }
    
      async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

    /*
    hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    comparePasswords(newPassword: string, passwordHash: string): Observable<any>{
        return from(bcrypt.compareSync(newPassword, passwordHash));
    }*/

    async hashPassword(password: string) {
      const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }
    
    async comparePasswords(password: string, hash: string) {
        return await bcrypt.compareSync(password, hash);
    }
}
