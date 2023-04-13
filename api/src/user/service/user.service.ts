import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User, UserRole } from '../models/user.interface';

@Injectable()
export class UserService {
  
    constructor (
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService
    ) {}
    
    createUser(user: User): Observable<User> {
        return from(this.authService.hashPassword(user.password)).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.name = user.name;
                newUser.username = user.username;
                newUser.email = user.email;
                newUser.password = passwordHash;
                newUser.role = UserRole.USER;
               
                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
        )
    }

    findUser(id: number): Observable<User> {
        return from(this.userRepository.findOneBy({id})).pipe(
            map((user: User) => {
                const {password, ...result} = user;
                return result;
            })
        )
    }

    findUserByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOneBy({username})
    }

    findUserByName(name: string): Promise<UserEntity> {
        return this.userRepository.findOneBy({ name });
    }

    findAllUsers(): Observable<User[]> {
        return from(this.userRepository.find()).pipe(
            map((users: User[]) => {
                users.forEach(function (ele) { delete ele.password });
                return users;
            })
        )
    }

    deleteUser(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    updateUser(id: number, user: User): Observable<any> {
        delete user.email;
        delete user.password;
        delete user.role;

        return from(this.userRepository.update(id, user)).pipe(
            switchMap(() => this.findUser(id))
        );
    }

    updateRoleOfUser(id: number, user: User): Observable<any> {
        return from(this.userRepository.update(id, user));
    }

    login(username: string, password: string): Observable<string> {
        return from(this.findUserByUsername(username)).pipe(
            switchMap((user: User) => from(this.authService.comparePasswords(password, user.password)).pipe(
                map((match: boolean) => {
                    if(match) {
                        const {password, ...result} = user;
                        return result;
                    } else {
                        throw Error;
                    }
                })
            ))
        ).pipe(
            switchMap((user: User) => {
                if(user) {
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
                } else {
                    return 'Wrong Credentials';
                }
            })
        )
    }
}
