
import { MongooseModule, Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { bloodType, GenderType, specializationType, userProvider, UserRoleEnum } from 'src/common/enums';
import type { HOtpDocument } from './otp.model';
import { Hash } from 'src/utils';

@Schema({ timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true }, strictQuery: true })

export class User {

  @Prop({ type: String, required: true, minlength: 2, trim: true })
  fName: string;
  @Prop({ type: String, required: true, minlength: 2, trim: true })
  lName: string;
  @Virtual({
    get() {
      return `${this.fName} ${this.lName}`
    },
    set(v) {
      this.fName = v.split(' ')[0]
      this.lName = v.split(' ')[1]
    }
  })
  userName: string;

  @Prop({ type: String, required: true, unique: true, trim: true })
  email: string;

  @Prop({ type: String, trim: true, required: function(){
    return this.provided === userProvider.system
  } })
  password: string;
  
  
  @Prop({ type: String, enum: userProvider, default: userProvider.system })
  provider: string;


  @Prop({ type: Boolean, default: false })
  confirmed: boolean;

  @Prop({ type: String, enum: GenderType })
  gender: GenderType;

  @Prop({ type: String, enum: UserRoleEnum, required: true })
  role: UserRoleEnum;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: Date, default: Date.now })
  changeCredentails: Date;

  @Prop({ type: Boolean, default: false })
  profileCompleted: boolean;

  // Doctor fields
  @Prop({ type: String, enum: specializationType })
  specialization: specializationType;

  @Prop({ type: Number })
  price: number;

  // Patient fields
  @Prop({ type: String, enum: bloodType })
  blood: bloodType;

  @Prop({ type: String })
  disease: string;

  @Prop({ type: Number, min: 10, max: 80 })
  age: number;

  @Prop({ type: String })
  currentMedication: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  doctorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  companionId: Types.ObjectId;

  // Companion fields
  @Prop({ type: String })
  relationPatient: string;

  @Prop({ type: String })
  experienceLevel: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  patientId: Types.ObjectId;


  @Virtual()
  otp: HOtpDocument[]
}

export const UserSchema = SchemaFactory.createForClass(User);
export type HUserDocument = HydratedDocument<User>

UserSchema.virtual("otp", {
  ref: "Otp",
  localField: "_id",
  foreignField: "createdBy"
})

export const UserModel = MongooseModule.forFeatureAsync([
  {
    name: User.name,
    useFactory: () => {
      UserSchema.pre("save", async function (next) {
        if (this.isModified("password")) {
          this.password = await Hash({ plainText: this.password });
        }
        next()
      })

      return UserSchema
    }
  }])
