import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {

    constructor (
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {}
    
    createUser(user: User): Observable<User> {
        return from(this.userRepository.save(user));
    }

    findUser(id: number): Observable<User> {
        return from(this.userRepository.findOneBy({id}));
    }

    findAllUsers(): Observable<User[]> {
        return from(this.userRepository.find());
    }

    deleteUser(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    updateUser(id: number, user: User): Observable<any> {
        return from(this.userRepository.update(id, user));
    }
}
