import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator"
import { Types } from "mongoose";
import { bloodType, GenderType, specializationType, UserRoleEnum } from "src/common";


export class GoogleLoginDTO {

  @IsString()
  @IsNotEmpty()
  idToken: string;

  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}


export class completeProfileDTO {

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEnum(GenderType)
    gender?: GenderType;

    @IsOptional()
    @IsDate()
    changeCredentails?: Date;

    // Doctor fields
    @IsOptional()
    @IsEnum(specializationType)
    specialization?: specializationType;


    // Patient fields
    @IsOptional()
    @IsEnum(bloodType)
    blood?: bloodType;

    @IsOptional()
    @IsString()
    disease?: string;

    @IsOptional()
    @IsNumber()
    @Min(10)
    @Max(80)
    age?: number;

    @IsOptional()
    @IsString()
    currentMedication?: string;

    @IsOptional()
    doctorId?: Types.ObjectId;

    @IsOptional()
    companionId?: Types.ObjectId;

    // Companion fields

    @IsOptional()
    patientId?: Types.ObjectId;

    @IsOptional()
    @IsString()
    relationPatient?: string;

    @IsOptional()
    @IsString()
    experienceLevel?: string;

}