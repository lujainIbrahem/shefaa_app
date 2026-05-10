import { Controller, Get, Post, Body, Res, Req, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { completeProfileDTO, GoogleLoginDTO } from './authDTO';
import type { UserReq } from 'src/common/interfaces';
import { Auth, UserRoleEnum, UserTokenTypeEnum } from 'src/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // ====================== login with Google via idToken ======================
@Post("google")
googleLogin(@Body() body: GoogleLoginDTO) {
  return this.authService.loginWithGoogle(body);
}
  // ====================== completeProfile ======================
  @Auth({
        roles: [],
        typeToken: UserTokenTypeEnum.access
    })
  @Patch('completeProfile')
  async completeProfile(
    @Req() req: UserReq,
    @Body() body: completeProfileDTO,
  ) {
    return this.authService.completeProfile(req, body);
  }

}