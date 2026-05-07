import { TokenService } from '../../common/service/token.service';
import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { OtpRepo, revokeTokenRepo, UserRepo } from '../Db';
import { Types } from 'mongoose';
import { UserReq } from 'src/common/interfaces';
import { profileDTO, updateProfileDTO, updateProfileIdDTO } from './profileDTO';
import { generateOTP, Role, UserOtp, UserRoleEnum } from 'src/common';
import { Compare, eventEmitter } from 'src/utils';

@Injectable()
export class profileService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly OtpRepo: OtpRepo,
    private tokenService: TokenService,
    private readonly revokeTokenRepo: revokeTokenRepo,

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

  private async revoke(
   userId: Types.ObjectId) {
    const revoked = await this.revokeTokenRepo.findOne({
    userId
});

if (revoked) {
  throw new BadRequestException("Session expired. Please login again.");
}

  }
  //======================== getProfileByLogin =====================

  async getProfile(req: UserReq) {
      await this.revoke(req.user._id)

    const user = await this.userRepo.findById(req.user._id, "-password");
    if (!user) {
      throw new BadRequestException("user not found")
    }

    return { message: "Done", user }

  }

  //======================== getProfileByDoctor =====================

  async getProfileDoctor(req: UserReq) {
        await this.revoke(req.user._id)

    const doctors = await this.userRepo.find({
      filter: { role: UserRoleEnum.Doctor },
      select: "-password"
    });
    if (doctors.length === 0) {
      throw new BadRequestException("Doctors not found")
    }

    return { message: "Done", doctors }


  }

  //======================== getProfilePatientForDoctor =====================

  async getDoctorPatients(req: UserReq) {
        await this.revoke(req.user._id)

    const user = await this.userRepo.findById(req.user._id, "-password");

    if (!user) {
      throw new BadRequestException("user not found");
    }

    let patients: any[] = [];

    if (req.user.role === UserRoleEnum.Doctor) {
      patients = await this.userRepo.find({
        filter: {
          role: UserRoleEnum.Patient,
          doctorId:user._id
        },
        select: "-password -provider"
      });
    }

    else if (req.user.role === UserRoleEnum.Companion) {
      patients = await this.userRepo.find({
        filter: {
          role: UserRoleEnum.Patient,
          companionId: user._id
        },
        select: "-password -provider"
      });
    }

    else {
      throw new ForbiddenException("Not allowed");
    }
    return {
      message: patients.length ? "Done" : "No patients found",
      patients
    };
  }

  //======================== getProfileId =====================

  async getprofileId(req: UserReq, params: profileDTO) {
        await this.revoke(req.user._id)

    const user = await this.userRepo.findById(params.id, "-password -updatedAt -createdAt -provider -confirmed");

    if (!user) {
      throw new BadRequestException("user not found");
    }

    // Doctor check
    if (req.user.role === UserRoleEnum.Doctor) {
      if (user.doctorId && user.doctorId.toString() !== req.user._id.toString()) {
        throw new ForbiddenException("Not allowed");
      }
    }

    // Companion check
    else if (req.user.role === UserRoleEnum.Companion) {
      if (user.companionId && user.companionId.toString() !== req.user._id.toString()) {
        throw new ForbiddenException("Not allowed");
      }
    }

    return { message: "Done", user };
  }
  //======================== getDoctorById  =====================

  async getDoctorById(req: UserReq, params: profileDTO) {
        await this.revoke(req.user._id)

    const doctor = await this.userRepo.findOne
      (
        {
          _id: params.id,
          role: UserRoleEnum.Doctor
        },

        "-password -confirmed -provider -role -gender"
      );

    if (!doctor) {
      throw new BadRequestException("Doctor not found");
    }

    return { message: "Done", doctor };
  }

  //======================== updateProfile =====================

  async updateProfile(req: UserReq, body: updateProfileDTO) {
        await this.revoke(req.user._id)

    const { email, oldPassword, newPassword, ...profile } = body

    const user = await this.userRepo.findById(req.user._id, "-password")
    if (!user) {
      throw new BadRequestException("user not found")
    }

    if (email && email !== user.email) {
      const userExist = await this.userRepo.findOne({ email })
      if (userExist) {
        throw new BadRequestException("Email already taken")
      }
      user.email = email
      user.confirmed = false
    await this.sendOtp(user._id, user.email,UserOtp.confirmEmail);
    }

    if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
      throw new BadRequestException("both old and new password are required");
    }

    if (oldPassword && newPassword) {
      if (!await Compare({ plainText: oldPassword, hash: user.password })) {
        throw new BadRequestException("invalid password")
      }
      user.password = newPassword
    await this.sendOtp(user._id, user.email, UserOtp.confirmEmail);
    }
    Object.assign(user, profile)
    await user.save()
    return { message: "update Done ", user }

  }

  //======================== updateProfileId =====================

  async updateProfileId(req: UserReq, body: updateProfileIdDTO, params: profileDTO) {
        await this.revoke(req.user._id)

    const { ...profile } = body
    const user = await this.userRepo.findById(params.id, "-password")
    if (!user) {
      throw new BadRequestException("user not found")
    }
      if (user.role !== UserRoleEnum.Patient) {
    throw new ForbiddenException("You can only update patients");
  }

    if (req.user.role === UserRoleEnum.Doctor) {
      if (user.doctorId?.toString() !== req.user._id.toString()) {
        {
          throw new ForbiddenException("Not allowed");
        }
      }
    }
    else if (req.user.role === UserRoleEnum.Companion) {
      if (user.companionId?.toString() !== req.user._id.toString()) {
        throw new ForbiddenException("Not allowed");
      }
    }
    Object.assign(user, profile)
    await user.save()
    return { message: "update Done ", user }

  }


}


