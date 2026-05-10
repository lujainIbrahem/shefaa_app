import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import type { UserReq } from 'src/common/interfaces';
import { Auth, UserRoleEnum, UserTokenTypeEnum } from 'src/common';
import { appointmentService } from './appointment.service';
import { appointmentIdDTO, createAppointmentDTO } from './appointmentDTO';

@Controller('appointment')
export class appointmentController {

    constructor(private readonly appointmentService: appointmentService) { }


    //======================== createAppointment =====================
    @Auth({
        roles: [UserRoleEnum.Patient, UserRoleEnum.Companion],
        typeToken: UserTokenTypeEnum.access
    })
    @Post("createAppointment")
    createAppointment(
        @Req() req: UserReq,
        @Body() body: createAppointmentDTO
    ) {
        return this.appointmentService.createAppointment(req, body)
    }

    //======================== cancelAppointment ====================
    @Auth({
        roles: [UserRoleEnum.Patient, UserRoleEnum.Companion,UserRoleEnum.Doctor],
        typeToken: UserTokenTypeEnum.access
    })
    @Patch("cancelAppointment/:id")
    cancelAppointment(
        @Req() req: UserReq,
        @Param() param: appointmentIdDTO
    ) {
        return this.appointmentService.cancelAppointment(req,param)
    }
    //======================== getAppointmentPatient ====================
    @Auth({
        roles: [],
        typeToken: UserTokenTypeEnum.access
    })
    @Get("getAppointment")
    getAppointmentPatient(
        @Req() req: UserReq,
    ) {
        return this.appointmentService.getAppointment(req)
    }

}
