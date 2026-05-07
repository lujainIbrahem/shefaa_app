import {  IsArray, IsBoolean, isBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Length, Matches, Max, Min, ValidateIf } from "class-validator"
import { Types } from "mongoose";
import { IsMatch } from "src/common/decorator";
import {  bloodType, flagType, GenderType, specializationType, UserRoleEnum } from "src/common/enums";
import { IAvailableTime } from "src/common/interfaces";
import { PickType } from '@nestjs/mapped-types';


export class resendOtpDTO{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string
}


export class loginDTO extends resendOtpDTO{
   
    @IsStrongPassword()
    @IsNotEmpty({message:"password is require"})
    password:string

}

export class confirmEmailDTO extends resendOtpDTO{
   
 @IsNotEmpty()
    @IsString()
    @Matches(/^\d{6}$/)
    code:string

}

export class signUpDTO extends loginDTO {

  @IsString()
  @Length(2, 30)
  @IsOptional()
   @ValidateIf((data:signUpDTO)=>{ return Boolean(!data.userName)})
  fName?: string;

  @IsString()
  @IsOptional()
    @ValidateIf((data:signUpDTO)=>{ return Boolean(!data.userName)})
  lName?: string;

  @IsString()
  @IsNotEmpty({ message: "Username is required" })
  @Length(3, 50)
  @ValidateIf((data:signUpDTO)=>{ return Boolean(!data.fName && !data.lName)})
  userName: string;

  @IsMatch(["password"])
  @ValidateIf((data: signUpDTO) => { return Boolean(data.password) })
  cPassword: string

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEnum(UserRoleEnum)
  @IsNotEmpty()
  role: UserRoleEnum;

  @IsOptional()
  @IsBoolean()
  confirmed?: boolean;

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

export class updatePasswordDTO{
 @IsStrongPassword()
    @IsNotEmpty({message:"password is required"})
  oldPassword:string

   @IsStrongPassword()
    @IsNotEmpty({message:"password is required"})
  newPassword:string

    @IsMatch(["newPassword"])
    @ValidateIf((data:updatePasswordDTO)=>{ return Boolean(data.newPassword)})
    cPassword:string
}


export class resetPasswordDTO extends PickType(loginDTO, ['password' ,'email'] as const) {
   
 @IsNotEmpty()
    @IsString()
    @Matches(/^\d{6}$/)
  code:string

 @IsMatch(["password"])
  @ValidateIf((data: signUpDTO) => { return Boolean(data.password) })
  cPassword: string


}


export class forgetPasswordDTO extends resendOtpDTO{}


export class logOutDTO{

  @IsEnum(flagType)
  @IsNotEmpty()
  flag: flagType;
}
