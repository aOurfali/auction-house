import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
    createUser(@Body() user: User): Observable<User> {
        return this.userService.createUser(user);
    }

    @Get(':id')
    findUser(@Param() params): Observable<User> {
        return this.userService.findUser(params.id)
    }

    @Get()
    findAllUsers(): Observable<User[]> {
        return this.userService.findAllUsers();
    }

    @Delete(':id')
    deleteUser(@Param('id')id: string): Observable<User> {
        return this.userService.deleteUser(Number(id));
    }

    @Put('id')
    updateUser(@Param('id')id: string, @Body() user: User): Observable<any> {
        return this.userService.updateUser(Number(id), user);
    }
}
