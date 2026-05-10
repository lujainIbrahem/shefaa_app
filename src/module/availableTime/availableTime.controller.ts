import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import type { UserReq } from 'src/common/interfaces';
import { Auth, UserRoleEnum, UserTokenTypeEnum } from 'src/common';
import { availableTimeService } from './availableTime.service';
import { createAvailableTimeDTO, doctorIdDTO } from './availableTimeDTO';

@Controller('doctor')
export class availableTimeController {

    constructor(private readonly availableTimeService: availableTimeService) { }


    //======================== createAvailableTime =====================
    @Auth({
        roles: [UserRoleEnum.Doctor],
        typeToken: UserTokenTypeEnum.access
    })
    @Post("createAvailableTime")
    createAvailableTime(
        @Req() req: UserReq,
        @Body() body: createAvailableTimeDTO
    ) {
        return this.availableTimeService.createAvailableTime(req, body)
    }

    //======================== getAvailableTime =====================
    @Auth({
        roles: [],
        typeToken: UserTokenTypeEnum.access
    })
    @Get("AvailableTime")
    getAvailableTime(
        @Query('date') date: string,
        @Req() req: UserReq,

    ) {
        return this.availableTimeService.getAvailableTime(date, req)
    }
    //======================== getAvailableTimeId =====================
    @Auth({
        roles: [],
        typeToken: UserTokenTypeEnum.access
    })
    @Get("AvailableTime/:id")
    getAvailableTimeId(
        @Req() req: UserReq,
        @Query('date') date: string,
        @Param() param: doctorIdDTO,


    ) {
        return this.availableTimeService.getAvailableTimeId(req, date, param);
    }
}
