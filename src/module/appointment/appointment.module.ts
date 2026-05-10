import { Module } from '@nestjs/common';
import { appointmentModel, appointmentRepo, availableTimeRepo,revokeTokenModel,revokeTokenRepo,UserModel, UserRepo } from '../Db';
import { availableTimeModel } from '../Db/models/availableTime.model';
import { appointmentService } from './appointment.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/service/token.service';
import { appointmentController } from './appointment.controller';

@Module({
  imports:[availableTimeModel,UserModel,appointmentModel,revokeTokenModel],
  controllers:[appointmentController],
  providers: [appointmentService,appointmentRepo,availableTimeRepo,UserRepo,TokenService,JwtService,revokeTokenRepo],
})

export class appointmentModule {}



