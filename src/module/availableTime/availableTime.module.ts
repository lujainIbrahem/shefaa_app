import { Module } from '@nestjs/common';
import { availableTimeRepo,revokeTokenModel,revokeTokenRepo,UserModel, UserRepo } from '../Db';
import { availableTimeModel } from '../Db/models/availableTime.model';
import { availableTimeService } from './availableTime.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/service/token.service';
import { availableTimeController } from './availableTime.controller';

@Module({
  imports:[availableTimeModel,UserModel,revokeTokenModel],
  controllers:[availableTimeController],
  providers: [availableTimeService,availableTimeRepo,UserRepo,TokenService,JwtService,revokeTokenRepo],
})

export class availableTimeModule {}



