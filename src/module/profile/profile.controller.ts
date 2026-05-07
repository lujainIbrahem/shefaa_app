import { Body, Controller, Get, Param, Patch, Query, Req } from '@nestjs/common';
import type { UserReq } from 'src/common/interfaces';
import { Auth, UserRoleEnum, UserTokenTypeEnum } from 'src/common';
import { profileService } from './profile.service';
import { profileDTO, updateProfileDTO, updateProfileIdDTO } from './profileDTO';

@Controller('user')
export class ProfileController {

    constructor(private readonly profileService: profileService) { }


    //======================== getProfile =====================

    @Auth({
        roles: [],
        typeToken: UserTokenTypeEnum.access
    })
    @Get("getProfile")
    getProfile(
        @Req() req: UserReq,
    ) {
        return this.profileService.getProfile(req)
    }


    //======================== getProfileDoctor =====================

    @Get("getProfileDoctor")
    getProfileDoctor(
                @Req() req: UserReq,

    ) {
        return this.profileService.getProfileDoctor(req)
    }

    //======================== getProfileId =====================

    @Auth({
        roles: [UserRoleEnum.Companion, UserRoleEnum.Doctor],
        typeToken: UserTokenTypeEnum.access
    })
    @Get("getProfile/:id")
    getprofileId(
        @Param() params: profileDTO,
        @Req() req: UserReq
    ) {
        return this.profileService.getprofileId(req, params)
    }

    //======================== getDoctorById  =====================

    @Get("getDoctorById/:id")
    getDoctorById(
        @Param() params: profileDTO,
        @Req() req: UserReq
    ) {
        return this.profileService.getDoctorById(req, params)
    }

    //======================== getDoctorPatients =====================
    @Auth({
        roles: [UserRoleEnum.Doctor, UserRoleEnum.Companion],
        typeToken: UserTokenTypeEnum.access
    })
    @Get("getDoctorPatients")
    getDoctorPatients(
        @Req() req: UserReq,
    ) {
        return this.profileService.getDoctorPatients(req)
    }

    //======================== updateProfile =====================

    @Auth({
        roles: [],
        typeToken: UserTokenTypeEnum.access
    })
    @Patch("updateProfile")
    updateProfile(
        @Req() req: UserReq,
        @Body() body: updateProfileDTO
    ) {
        return this.profileService.updateProfile(req, body)
    }

    //======================== updateProfileId =====================
    @Auth({
        roles: [UserRoleEnum.Companion, UserRoleEnum.Doctor],
        typeToken: UserTokenTypeEnum.access
    })
    @Patch("updateProfile/:id")
    updateProfileId(
        @Req() req: UserReq,
        @Body() body: updateProfileIdDTO,
        @Param() params: profileDTO,

    ) {
        return this.profileService.updateProfileId(req, body, params)
    }


}
