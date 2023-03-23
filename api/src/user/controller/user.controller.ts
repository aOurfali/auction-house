import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { hasRoles } from 'src/auth/decorator/roles.decorater';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User, UserRole } from '../models/user.interface';
import { UserService } from '../service/user.service';


@Controller('users')
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

    @hasRoles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
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
