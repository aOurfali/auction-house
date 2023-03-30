import { Body, Controller, Get, Post, Request, Response, UseGuards, HttpCode, HttpStatus, Req, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /*
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }*/

  /*
  @Post()
  async login(@Body() loginDTO: LoginDTO): Promise<{ access_token: string }> {
    const { name, pass } = loginDTO;
    const valid = await this.authService.validateUser(name, pass);
    if (!valid) {
      throw new UnauthorizedException();
    }
    return await this.authService.generateAccessToken(name);
  }

  /*
  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }*/

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}