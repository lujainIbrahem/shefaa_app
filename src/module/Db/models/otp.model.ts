import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {  UserOtp } from 'src/common/enums';
import { eventEmitter, Hash } from 'src/utils';

@Schema({timestamps:true, toObject:{virtuals:true}, toJSON:{virtuals:true},strictQuery:true})

export class Otp {

  @Prop({type:String,required:true, trim:true})
  code: string;

  @Prop({type:Types.ObjectId,required:true, ref:"User"})
  createdBy: Types.ObjectId;

  @Prop({type:String,enum:UserOtp, required: true })
  type: UserOtp;

  @Prop({type:Date,required:true})
  expireAt: Date;

}

export type HOtpDocument =HydratedDocument<Otp>

export const OtpSchema = SchemaFactory.createForClass(Otp);
OtpSchema.index({expireAt:1},{expireAfterSeconds:0})


   OtpSchema.pre("save", async function (next) {

  if (this.isModified("code")) {
    this.code = await Hash({ plainText: this.code });
  }

  next();
});

export const OtpModel = MongooseModule.forFeature([
  {
    name: Otp.name,
 schema: OtpSchema
  }
])