import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepo } from "../Db"; // تأكدي من المسار الصح عندك
import { TokenService } from "src/common/service/token.service";
import { GenderType, specializationType, userProvider, UserRoleEnum } from "src/common";
import { OAuth2Client } from 'google-auth-library';
import { UserReq } from "src/common/interfaces";
import { completeProfileDTO, GoogleLoginDTO } from "./authDTO";
import { Types } from "mongoose";
import { randomUUID } from "crypto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
    private tokenService: TokenService,
  ) { }
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  async loginWithGoogle(body: GoogleLoginDTO) {
    const { idToken, role } = body
    if (!idToken) {
      throw new BadRequestException("idToken is required");
    }

    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      throw new BadRequestException("Invalid Google token");
    }

    const email = payload.email;

    const fName = payload.given_name || payload.name?.split(" ")[0] || "User";
    const lName = payload.family_name || payload.name?.split(" ")[1] || "Google";
    // 1️⃣ check user
    let user = await this.userRepo.findOne({ email });

    // 2️⃣ create if not exists
    if (!user) {
      user = await this.userRepo.create({
        email,
        fName,
        lName,
        role,
        confirmed: true,
      });
    }

    // 3️⃣ generate session
    const jwtid = randomUUID();
    const access_token = await this.tokenService.GenerateToken({
      payload: { userId: user._id, email: user.email, jwtid },
      options: {
        secret: user.role === UserRoleEnum.Doctor ? process.env.ACCESS_TOKEN_DOCTOR!
          : user.role === UserRoleEnum.Patient ? process.env.ACCESS_TOKEN_PATIENT!
            : process.env.ACCESS_TOKEN_COMPANION!,
        expiresIn: "15m"
      }
    });

    const refresh_token = await this.tokenService.GenerateToken({
      payload: { userId: user._id, email: user.email, jwtid },
      options: {
        secret: user.role == UserRoleEnum.Doctor ? process.env.REFRESH_TOKEN_DOCTOR!
          : user.role === UserRoleEnum.Patient ? process.env.REFRESH_TOKEN_PATIENT!
            : process.env.REFRESH_TOKEN_COMPANION!,
        expiresIn: "1y"
      }
    });

    return {
      message: "Google login success",
      access_token,
      refresh_token,
      user,
    };
  }

  async completeProfile(req: UserReq, body: completeProfileDTO) {
    const { age, gender, phone, specialization, currentMedication, disease, address, blood, price, patientId, relationPatient,
      experienceLevel, doctorId, companionId } = body


    const user = await this.userRepo.findById(req.user._id)
    if (!user) {
      throw new BadRequestException("user not found")
    }

    user.address = address || ""
    user.phone = phone || ""
    if (gender) { user.gender = gender }

    if (user.role === "Doctor") {
      if (!specialization) {
        throw new BadRequestException("Specialization is required")
      }
      user.specialization = specialization
      if (price) user.price = price

    }

    if (user.role === "Patient") {
      if (!blood || !disease || !age || !currentMedication) {
        throw new BadRequestException("patient's field is required")
      }
      user.blood = blood
      user.disease = disease
      user.age = age
      user.currentMedication = currentMedication
      if (doctorId) {
        const doctor = await this.userRepo.findOne({
          _id: doctorId,
          role: UserRoleEnum.Doctor
        })
        if (!doctor) throw new BadRequestException("doctorId not found")

        user.doctorId = new Types.ObjectId(doctorId);
      }
      if (companionId) {
        const Companion = await this.userRepo.findOne({
          _id: companionId,
          role: UserRoleEnum.Companion
        })
        if (!Companion) throw new BadRequestException("companionId not found")

        user.companionId = new Types.ObjectId(companionId);
      }
    }

    if (user.role === "Companion") {
      if (!patientId || !experienceLevel || !relationPatient) {
        throw new BadRequestException("Companion's field is required")
      }
      user.experienceLevel = experienceLevel
      user.relationPatient = relationPatient
      if (patientId) {
        const patient = await this.userRepo.findOne({
          _id: patientId,
          role: UserRoleEnum.Patient
        })
        if (!patient) throw new BadRequestException("patientId not found")

        user.patientId = new Types.ObjectId(patientId);
      }

    }
    await user.save();
    return { message: "complete information is available" }
  }




}