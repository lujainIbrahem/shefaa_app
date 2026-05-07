import { Body, Controller,Patch,  Post, Req,  UsePipes } from '@nestjs/common';
import {  confirmEmailDTO, forgetPasswordDTO, loginDTO, logOutDTO, resendOtpDTO, resetPasswordDTO, signUpDTO, updatePasswordDTO } from './signUpDTO';
import { RoleValidationPipe } from 'src/common/pipes';
import type { UserReq } from 'src/common/interfaces';
import { Auth, UserTokenTypeEnum } from 'src/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

constructor(private readonly userService :UserService){}

@Post("signUp")
@UsePipes(RoleValidationPipe)
signUp(
    @Body() body:signUpDTO,
){
    return this.userService.signUp(body)
}

@Post("resendOtp")
resendOtp(
    @Body() body:resendOtpDTO,
){
    return this.userService.resendOtp(body)
}
    

@Patch("confirmEmail")
confirmEmail(
    @Body() body:confirmEmailDTO,
){
    return this.userService.confirmEmail(body)
}


@Post("login")
login(
    @Body() body:loginDTO,
){
    return this.userService.login(body)
}

@Auth({ roles: [], typeToken: UserTokenTypeEnum.refresh }) 
@Patch("refreshToken")
refreshToken(
    @Req() req:UserReq
){
    return this.userService.refreshToken(req)
}

@Post("forgetPassword")
forgetPassword(
    @Body() body:forgetPasswordDTO,
){
    return this.userService.forgetPassword(body)
}

@Auth()
@Patch("updatePassword")
updatePassword(
    @Body() body:updatePasswordDTO,
    @Req() req:UserReq
){
    return this.userService.updatePassword(body,req)
}



@Patch("resetPassword")
resetPassword(
    @Body() body:resetPasswordDTO,
){
    return this.userService.resetPassword(body)
}

@Auth({ roles: [], typeToken: UserTokenTypeEnum.refresh }) 
@Post("logOut")
logOut(
    @Body() body:logOutDTO,
    @Req() req:UserReq
){
    return this.userService.logOut(body,req)
}



}
