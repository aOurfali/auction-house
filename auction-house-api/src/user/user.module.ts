import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './controller/user.controller';
import { UserEntity } from './models/user.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UserService],
  controllers: [UserController],

})
export class UserModule {}
