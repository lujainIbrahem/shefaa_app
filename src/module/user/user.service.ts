import { TokenService } from '../../common/service/token.service';
import { BadRequestException, ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { availableTimeRepo, OtpRepo, revokeTokenRepo, UserRepo } from '../Db';
import { confirmEmailDTO, forgetPasswordDTO, loginDTO, logOutDTO, resendOtpDTO, resetPasswordDTO, signUpDTO, updatePasswordDTO } from './signUpDTO';
import { flagType, GenderType, UserOtp, UserRoleEnum } from 'src/common/enums';
import { Types } from 'mongoose';
import { Compare, eventEmitter } from 'src/utils';
import { UserReq } from 'src/common/interfaces';
import { generateOTP } from "src/common";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly OtpRepo: OtpRepo,
    private tokenService: TokenService,
    private readonly revokeTokenRepo: revokeTokenRepo,
    private readonly availableTimeRepo: availableTimeRepo,

  ) { }


  private async sendOtp(
    userId: Types.ObjectId,
    email: string,
    type: UserOtp
  ) {

    const otp = generateOTP();

    await this.OtpRepo.create({
      code: otp,
      createdBy: userId,
      type,
      expireAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    eventEmitter.emit(type, {
      email,
      otp,
    });

  }

  //======================== signUp =====================

  async signUp(body: signUpDTO) {
    const { fName, lName, userName, password, email, age, gender, phone, specialization
      , currentMedication, disease, address, blood, role, price,
      patientId, relationPatient, experienceLevel, doctorId, companionId } = body

    const userExist = await this.userRepo.findOne({ email })

    if (userExist) {
      throw new ConflictException('User already exist');
    }
    let user;
    if (role == UserRoleEnum.Doctor) {
      user = await this.userRepo.create({
        fName, lName,
        userName,
        password,
        email,
        role,
        gender: gender ? (gender as GenderType) : GenderType.male,
        phone,
        specialization,
        address,
        price


      })
    }
    else if (role == UserRoleEnum.Patient) {
      if (companionId) {
        const companion = await this.userRepo.findOne({
          _id: companionId,
          role: UserRoleEnum.Companion
        })
        if (!companion) {
          throw new BadRequestException('companion not found')
        }
      }
      if (doctorId) {
        const doctor = await this.userRepo.findOne({
          _id: doctorId,
          role: UserRoleEnum.Doctor
        })
        if (!doctor) {
          throw new BadRequestException('doctor not found')
        }
      }
      user = await this.userRepo.create({
        fName, lName,
        userName,
        password,
        email,
        age,
        gender,
        phone,
        address,
        disease,
        currentMedication,
        role,
        blood,
        doctorId: doctorId ? new Types.ObjectId(doctorId) : undefined,
        companionId: companionId ? new Types.ObjectId(companionId) : undefined,
      })
    }
    else if (role == UserRoleEnum.Companion) {
      if (patientId) {
        const patient = await this.userRepo.findOne({
          _id: patientId,
          role: UserRoleEnum.Patient
        })
        if (!patient) {
          throw new BadRequestException('patient not found')
        }
      }
      user = await this.userRepo.create({
        fName, lName,
        userName,
        password,
        email,
        age,
        gender,
        phone,
        address,
        role,
        experienceLevel,
        relationPatient,
        patientId: patientId ? new Types.ObjectId(patientId) : undefined
      })
    }

    if (!user) {
      throw new ForbiddenException("User not created")
    }
    await this.sendOtp(user._id, user.email, UserOtp.confirmEmail);

    return user
  }

  //======================== resendOtp =====================

  async resendOtp(body: resendOtpDTO) {
    const { email } = body

    const user = await this.userRepo.findOne(
      { email, confirmed: false },
      undefined,
      { populate: { path: "otp" } }
    )

    if (!user) {
      throw new BadRequestException("User not found");
    }
    if (await (user.otp as any).length > 0) {
      throw new BadRequestException("otp already exist");
    }

    await this.sendOtp(user._id, user.email, UserOtp.confirmEmail);
    return { message: "otp sent success" }

  }


  //======================== confirmEmail =====================


  async confirmEmail(body: confirmEmailDTO) {
    const { email, code } = body;

    const user = await this.userRepo.findOne(
      { email, confirmed: false },
      undefined,
      { populate: { path: "otp" } }
    );

    if (!user) {
      throw new BadRequestException("User not found or already exists");
    }

    const otpArray = user.otp as any[];

    if (!otpArray?.length) {
      throw new BadRequestException("OTP not found or expired, please resend OTP");
    }

    const otpRecord = otpArray[0];

    if (!otpRecord?.code) {
      throw new BadRequestException("Invalid OTP data");
    }

    if (code !== otpRecord.code) {
      throw new BadRequestException("Invalid OTP");
    }

    user.confirmed = true;
    await user.save();

    await this.OtpRepo.deleteOne({
      filter: {
        createdBy: user._id,
        type: UserOtp.confirmEmail, // مهم جدًا
      },
    });

    return { message: "email confirmed" };
  }

  //======================== login =====================


  async login(body: loginDTO) {
    const { email, password } = body

    const user = await this.userRepo.findOne({ email, confirmed: true })

    if (!user) {
      throw new BadRequestException("User not found");
    }
    const role = user.role
    if (!await Compare({ plainText: password, hash: user.password })) {
      throw new BadRequestException("Invalid password");
    }

    const access_token = await this.tokenService.GenerateToken({
      payload: { userId: user._id, email: user.email },
      options: {
        secret: user.role === UserRoleEnum.Doctor ? process.env.ACCESS_TOKEN_DOCTOR!
          : user.role === UserRoleEnum.Patient ? process.env.ACCESS_TOKEN_PATIENT!
            : process.env.ACCESS_TOKEN_COMPANION!,
        expiresIn: "1h"
      }
    });

    const refresh_token = await this.tokenService.GenerateToken({
      payload: { id: user._id, email: user.email },
      options: {
        secret: user.role == UserRoleEnum.Doctor ? process.env.REFRESH_TOKEN_DOCTOR!
          : user.role === UserRoleEnum.Patient ? process.env.REFRESH_TOKEN_PATIENT!
            : process.env.REFRESH_TOKEN_COMPANION!,
        expiresIn: "1y"
      }
    });

    return { message: "Done", access_token, refresh_token, role }
  }


  //======================== forgetPassword =====================

  async forgetPassword(body: forgetPasswordDTO) {
    const { email } = body

    const user = await this.userRepo.findOne({ email })

    if (!user) {
      throw new BadRequestException("User not found");
    }

    await this.sendOtp(user._id, user.email, UserOtp.forgetPassword);


    return { message: "Done" }
  }

  //======================== update password =====================

  async updatePassword(body: updatePasswordDTO, req: UserReq) {
    const { oldPassword, newPassword } = body

const revoked = await this.revokeTokenRepo.findOne({
      userId: req.user._id,
});

if (revoked) {
  throw new BadRequestException("Session expired. Please login again.");
}
    const user = await this.userRepo.findById(req.user._id)
    if (!user) {
      throw new BadRequestException("user not found")
    }

    if (!await Compare({ plainText: oldPassword, hash: user.password })) {
      throw new BadRequestException("invalid password")
    }
    user.password = newPassword
    await user.save()
    return { message: "Done" }


  }

  //======================== resetPassword =====================

  async resetPassword(body: resetPasswordDTO) {
    const { email, password, code } = body
    const user = await this.userRepo.findOne(
      { email },
      undefined,
      { populate: { path: "otp" } }
    )

    if (!user) {
      throw new BadRequestException("email not exit, please try to forgetPassword first ")
    }

    if (!(user.otp as any)?.length || !await Compare({ plainText: code, hash: (user.otp as any)[0].code })) {
      throw new BadRequestException("Invalid otp")
    }

    user.password = password
    await user.save()
    await this.OtpRepo.deleteOne({ filter: { createdBy: user._id } })

    return { message: "Done" }


  }


  //======================== refreshToken =====================

  async refreshToken(req: UserReq) {

    const user = req.user;
    const access_token = await this.tokenService.GenerateToken({
      payload: { userId: user._id, email: user.email },
      options: {
        secret: user.role === UserRoleEnum.Doctor ? process.env.ACCESS_TOKEN_DOCTOR!
          : user.role === UserRoleEnum.Patient ? process.env.ACCESS_TOKEN_PATIENT!
            : process.env.ACCESS_TOKEN_COMPANION!,
        expiresIn: "1h"
      }
    });

    const refresh_token = await this.tokenService.GenerateToken({
      payload: { id: user._id, email: user.email },
      options: {
        secret: user.role == UserRoleEnum.Doctor ? process.env.REFRESH_TOKEN_DOCTOR!
          : user.role === UserRoleEnum.Patient ? process.env.REFRESH_TOKEN_PATIENT!
            : process.env.REFRESH_TOKEN_COMPANION!,
        expiresIn: "1y"
      }
    });
    await this.revokeTokenRepo.create({
      tokenId: req.decoded.id,

      userId: user._id,
      expireAt: new Date(req.decoded?.exp! * 1000),
    });
    return { message: "Done", access_token, refresh_token }

  }
  //======================== logOut ====================

  async logOut(body: logOutDTO, req: UserReq) {
    const { flag } = body

    if (!req.user || !req.decoded) {
      throw new BadRequestException("Invalid token");
    }

    if (flag == flagType.All) {
      await this.userRepo.updateOne(
        { _id: req.user._id },
        {
          changeCredentails: new Date()
        }
      )
      return { message: "success ,logout from all devices" }
    }

    if (!req.decoded.id) {
      throw new BadRequestException("Invalid refresh token");
    }

    await this.revokeTokenRepo.create({
      tokenId: req.decoded.id,
      userId: req.user._id,
      expireAt: new Date(req.decoded?.exp! * 1000),
    })

    return { message: "success ,logout from this devices" }

  }



}


