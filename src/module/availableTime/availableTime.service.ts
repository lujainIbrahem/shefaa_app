import { BadRequestException, Injectable } from '@nestjs/common';
import { revokeTokenRepo, UserRepo, availableTimeRepo} from '../Db';
import { Types } from 'mongoose';
import type{ UserReq } from 'src/common/interfaces';
import { createAvailableTimeDTO, doctorIdDTO } from './availableTimeDTO';
import { TokenService } from 'src/common/service/token.service';

@Injectable()
export class availableTimeService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly availableTimeRepo: availableTimeRepo,
    private tokenService: TokenService,
    private readonly revokeTokenRepo: revokeTokenRepo,
  ) { }
  private async revoke(req: UserReq) {
    const revoked = await this.revokeTokenRepo.findOne({ tokenId: req.decoded.jwtid });

    if (revoked) {
      throw new BadRequestException("Session expired. Please login again.");
    }

  }
  //================== createAvailableTime =====================

  //بظبط المواعيد
async createAvailableTime(req: UserReq, body: createAvailableTimeDTO) {
  const { date, start, end } = body

  await this.revoke(req)


  const selectedDate = new Date(`${date}T00:00:00`)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate.getTime() < today.getTime()) {
    throw new BadRequestException(
      "Cannot create slots for past dates"
    )
  }

  const doctorId = req.user._id

  const slots: any[] = []

  let current = new Date(`${date}T${start}:00`);
  const endTime = new Date(`${date}T${end}:00`);

  while (current < endTime) {

    const next = new Date(current)
    next.setMinutes(next.getMinutes() + 30)

    const isExist = await this.availableTimeRepo.findOne({
      doctorId,
      date: new Date(date),
      start: current,
      end: next
    })

    if (!isExist) {
      slots.push({
        doctorId,
        date: new Date(date),
        start: current,
        end: next,
        isBooked: false
      })
    }

    current = next
  }

  await this.availableTimeRepo.createMany(slots)

  return { message: "Slots created successfully" }
}
  
  //================== getAvailableTime =====================

  //كل الدكاتره الفاضين
  async getAvailableTime(date: string ,req: UserReq) {
    await this.revoke(req)
    const availableTime = await this.availableTimeRepo.find({
      filter: { date, isBooked: false },
      populate: {
        path: "doctorId",
        select: "fName lName specialization email phone peice "
      }
    });
    return { message: "Done", availableTime };
  }


  //================== getAvailableTimeId =====================

  async getAvailableTimeId(req: UserReq,date: string, param: doctorIdDTO) {
    await this.revoke(req)
    const isExist = await this.userRepo.findById(param.id)
    if (!isExist) {
      throw new BadRequestException("doctor not exist")
    }
    if (isExist) {
      const user = new Types.ObjectId(param.id)
      const availableTime = await this.availableTimeRepo.find({
        filter: { date, isBooked: false, doctorId: user },
        populate: {
          path: "doctorId",
          select: "fName lName specialization email phone peice "
        }
      })
      return { message: "Done", availableTime };

    }
  }


}


