import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';


@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
    createUser(@Body() user: User): Observable<User | Object> {
        return this.userService.createUser(user).pipe(
            map((user: User) => user),
            catchError(err => of({error: err.message}))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return {access_token: jwt};
            })
        )
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
