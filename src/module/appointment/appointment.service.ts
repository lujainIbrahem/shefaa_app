import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { appointmentRepo, revokeTokenRepo, UserRepo,availableTimeRepo } from '../Db';
import { Types } from 'mongoose';
import type{ UserReq } from 'src/common/interfaces';
import { appointmentIdDTO, createAppointmentDTO } from './appointmentDTO';
import { TokenService } from 'src/common/service/token.service';
import { statusType, UserRoleEnum } from 'src/common';

@Injectable()
export class appointmentService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly availableTimeRepo: availableTimeRepo,
    private readonly appointmentRepo: appointmentRepo,
    private tokenService: TokenService,
    private readonly revokeTokenRepo: revokeTokenRepo,



  ) { }

  private async revoke(req: UserReq) {
    const revoked = await this.revokeTokenRepo.findOne({ tokenId: req.decoded.jwtid });

    if (revoked) {
      throw new BadRequestException("Session expired. Please login again.");
    }

  }
  //================== createAppointment =====================
  //بظبط المواعيد
  async createAppointment(req: UserReq, body: createAppointmentDTO) {
        await this.revoke(req)
    const { availableId } = body;
    let patientId = req.user._id;

    if (req.user.role === UserRoleEnum.Companion) {
      const companion = await this.userRepo.findById(req.user._id);

      if (!companion?.patientId) {
        throw new BadRequestException("No patient linked to this companion");
      }

      patientId = companion.patientId;
    }
    const available = await this.availableTimeRepo.findById(availableId);
    if (!available) throw new BadRequestException("Slot not found");
    if (available.isBooked) throw new BadRequestException("Slot already booked");

    const doctorId = available.doctorId;

    const date = available.date;
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

    const alreadyBooked = await this.appointmentRepo.findOne({
      doctorId,
      patientId,
      status: statusType.confirmed,
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    if (alreadyBooked) {
      throw new BadRequestException("You already have a confirmed appointment with this doctor today");
    }

    const appointment = await this.appointmentRepo.create({
      doctorId,
      patientId,
      availableId: new Types.ObjectId(availableId),
      status: statusType.confirmed,
      date: date
    });

    available.isBooked = true;
    await available.save();

    const fullAppointment = await this.appointmentRepo.findById(
      appointment._id,
      {},
      {},
      {
        path: 'availableId',
        select: 'start end isBooked',
        populate: {
          path: 'doctorId',
          select: 'fName lName specialization email phone price'
        }
      }
    );

    return { message: "Done", appointment: fullAppointment };
  }

  //================== cancelAppointment =====================

  async cancelAppointment(req: UserReq, param: appointmentIdDTO) {
        await this.revoke(req)
    const appointment = await this.appointmentRepo.findById(param.id)
    if (!appointment) {
      throw new BadRequestException("this aapointment not exist")
    }
    const isDoctor =
    appointment.doctorId.toString() === req.user._id.toString();

  const isPatient =
    appointment.patientId.toString() === req.user._id.toString();

  const isCompanion =
    req.user.role === UserRoleEnum.Companion;

  if (!isDoctor && !isPatient && !isCompanion) {
    throw new ForbiddenException(
      "Not allowed to cancel this appointment"
    );
  }
    appointment.status = statusType.cancelled
    await appointment.save()

    await this.availableTimeRepo.findByIdAndUpdate({
      id: appointment.availableId,
      update: { isBooked: false }
    })

    return { message: "Done", appointment };

  }

  //================== getAppointment =====================

  async getAppointment(req: UserReq) {
        await this.revoke(req)
    const user = await this.userRepo.findById(req.user._id);

    if (!user) {
      throw new BadRequestException("user not found");
    }

    let patientId = user._id;

    // Companion → map to patient
    if (user.role === UserRoleEnum.Companion) {
      if (!user.patientId) {
        throw new BadRequestException("No patient linked to this companion");
      }
      patientId = user.patientId;
    }

    if (
      user.role === UserRoleEnum.Patient ||
      user.role === UserRoleEnum.Companion
    ) {
      const appointments = await this.appointmentRepo.find({
        filter: {
          patientId,
          status: statusType.confirmed
        },
        select: "-__v",
        populate: [
          {
            path: "doctorId",
            select: "fName lName specialization email phone price"
          },
          {
            path: "availableId",
            select: "start end isBooked"
          }
        ]
      });

      return { message: "Done", appointments };
    }

    // DOCTOR
    if (user.role === UserRoleEnum.Doctor) {
      const appointments = await this.appointmentRepo.find({
        filter: {
          doctorId: user._id,
          status: statusType.confirmed
        },
        select: "-__v",
        populate: [
          {
            path: "patientId",
            select: "fName lName email currentMedication age phone address disease blood"
          },
          {
            path: "availableId",
            select: "start end isBooked"
          }
        ]
      });

      return { message: "Done", appointments };
    }

    throw new BadRequestException("Not allowed");
  }
}


