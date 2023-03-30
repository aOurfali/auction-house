import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '10000s'}
            })
        }),
    ],
    providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy],
    exports: [AuthService],
    controllers: [AuthController]
})

export class AuthModule {
    
}

