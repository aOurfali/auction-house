import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { UserEntity } from './user/models/user.entity';
import { AuthModule } from './auth/auth.module';
import { AuctionModule } from './auction/auction.module';
import { AuctionEntity } from './auction/models/auction.entity';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test',
      database: 'postgres',
      entities: [UserEntity, AuctionEntity],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    AuctionModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
