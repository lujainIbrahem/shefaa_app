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

 private async sendOtp(userId: Types.ObjectId, email: string) {
    const otp = generateOTP().toString();

    await this.OtpRepo.create({
      code: otp,
      createdBy: userId,
      type: UserOtp.confirmEmail,
      expireAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // send email via event
    eventEmitter.emit(UserOtp.confirmEmail, {
      email,
      otp,
    });

    return otp;
  }
  //======================== getProfileByLogin =====================

  async getProfile(req: UserReq) {
    const user = await this.userRepo.findById(req.user._id, "-password");
    if (!user) {
      throw new BadRequestException("user not found")
    }

    return { message: "Done", user }

  }

  //======================== getProfileByDoctor =====================

  async getProfileDoctor() {
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
    await this.sendOtp(user._id, user.email);
    }

    if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
      throw new BadRequestException("both old and new password are required");
    }

    if (oldPassword && newPassword) {
      if (!await Compare({ plainText: oldPassword, hash: user.password })) {
        throw new BadRequestException("invalid password")
      }
      user.password = newPassword
    await this.sendOtp(user._id, user.email);
    }
    Object.assign(user, profile)
    await user.save()
    return { message: "update Done ", user }

  }

  //======================== updateProfileId =====================

  async updateProfileId(req: UserReq, body: updateProfileIdDTO, params: profileDTO) {
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


