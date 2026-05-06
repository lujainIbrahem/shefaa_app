import { TokenService } from '../common/service/token.service';
import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { appointmentRepo, availableTimeRepo, OtpRepo, revokeTokenRepo, UserRepo } from '../module/Db';
import { bloodType, GenderType, specializationType, UserRoleEnum } from 'src/common';
import { Types } from 'mongoose';


@Injectable()
export class seedDataService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly appointmentRepo: appointmentRepo,
    private readonly availableTimeRepo: availableTimeRepo,
    private readonly OtpRepo: OtpRepo,
    private tokenService: TokenService,
    private readonly revokeTokenRepo: revokeTokenRepo,

  ) { }

  //======================== getProfile =====================

  async seedDoctors() {
    const doctorsData = [
      {
        fName: "loujain ",
        lName: "Ibrahem",
        email: "loujainIbrahem@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01022501044",
        gender: GenderType.female,
        price: 850,
        specialization: specializationType.EmergencyMedicine,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "salma ",
        lName: "Emad",
        email: "salmaEmad@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01035645582",
        gender: GenderType.female,
        price: 550,
        specialization: specializationType.GeneralSurgerySpecialization,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "mrehan ",
        lName: "adel",
        email: "mrehanAdel@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "1stgiza",
        phone: "01025458255",
        gender: GenderType.female,
        price: 630,
        specialization: specializationType.InternalMedicineSpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "mohamed ",
        lName: "frag",
        email: "mohamedFrag@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st new Cairo",
        phone: "0123501044",
        gender: GenderType.male,
        price: 360,
        specialization: specializationType.Nephrology,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "ahmed ",
        lName: "mostafa",
        email: "ahmedMostafa@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st mohamedAli",
        phone: "0102266094",
        gender: GenderType.male,
        price: 750,
        specialization: specializationType.cardiologySpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "razan",
        lName: "diab",
        email: "razanMohamed@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01022501044",
        gender: GenderType.female,
        price: 450,
        specialization: specializationType.chestSpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "yousef ",
        lName: "shaban",
        email: "yousefShaban@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01022501044",
        gender: GenderType.male,
        price: 990,
        specialization: specializationType.PhysicalTherapy,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "nour",
        lName: "mostafa",
        email: "nourmostafa@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01022501034",
        gender: GenderType.female,
        price: 720,
        specialization: specializationType.Psychiatry,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "ahmed",
        lName: "saif",
        email: "ahmedSaif@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "0102250234",
        gender: GenderType.male,
        price: 360,
        specialization: specializationType.chestSpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "menna ",
        lName: "osama",
        email: "mennaOsama@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "25st",
        phone: "01022501144",
        gender: GenderType.female,
        price: 640,
        specialization: specializationType.cardiologySpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
    ];
    const patientsData = [
      {
        confirmed: true,
        role: UserRoleEnum.Patient,
        fName: "loujain",
        lName: "ibrahem",
        email: "logyibrahem@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Cairo",
        phone: "01019475638",
        gender: GenderType.female,
        blood: bloodType.A_POS,
        disease: "Diabetes",
        age: 45,
        currentMedication: "Insulin",
        doctorId: new Types.ObjectId("69fa66af35d89cf25d58bef4"),
        companionId: new Types.ObjectId("69fa69e6d2d22f612eb3cbe7")

      }
      , {
        confirmed: true,
        role: UserRoleEnum.Patient,
        fName: "Aya",
        lName: "mohamed",
        email: "ayamohamed@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Alex",
        phone: "01058392017",
        gender: GenderType.female,
        blood: bloodType.O_POS,
        disease: "Hypertension",
        age: 38,
        currentMedication: "Amlodipine"
      }
      , {
        confirmed: true,
        role: UserRoleEnum.Patient,
        fName: "Youssef",
        lName: "Samir",
        email: "youssef3@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Giza",
        phone: "01092736451",
        gender: GenderType.male,
        blood: bloodType.B_POS,
        disease: "Asthma",
        age: 20,
        currentMedication: "Ventolin",
        doctorId: new Types.ObjectId("69fa66af35d89cf25d58bef7")
      }

      , {
        confirmed: true,
        role: UserRoleEnum.Patient,
        fName: "mohamed",
        lName: "ali",
        email: "sara4@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Mansoura",
        phone: "01076291845",
        gender: GenderType.male,
        blood: bloodType.AB_POS,
        disease: "Anemia",
        age: 29,
        currentMedication: "Iron supplements",
        doctorId: new Types.ObjectId("69fa66b035d89cf25d58befa"),
        companionId: new Types.ObjectId("69fa69e4d2d22f612eb3cbde")

      },
      {
        confirmed: true,
        role: UserRoleEnum.Patient,
        fName: "Khaled",
        lName: "Mostafa",
        email: "khaled5@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Tanta",
        phone: "01033847129",
        gender: GenderType.male,
        blood: bloodType.AB_NEG,
        disease: "Kidney Stones",
        age: 50,
        currentMedication: "Painkillers"
      },
      {
        confirmed: true,
        role: UserRoleEnum.Patient,
        fName: "Nour",
        lName: "Ali",
        email: "nour6@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Zagazig",
        phone: "01090561374",
        gender: GenderType.female,
        blood: bloodType.O_NEG,
        disease: "Depression",
        age: 33,
        currentMedication: "SSRIs",
        doctorId: new Types.ObjectId("69fa66b135d89cf25d58befd")
      },
      {
        confirmed: true,
        role: UserRoleEnum.Patient,
        fName: "Omar",
        lName: "Hany",
        email: "omar7@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Ismailia",
        phone: "01047192836",
        gender: GenderType.male,
        blood: bloodType.B_NEG,
        disease: "Heart Disease",
        age: 60,
        currentMedication: "Beta blockers"
      },
      {
        confirmed: true,
        role: UserRoleEnum.Patient,
        fName: "Momen",
        lName: "Yousri",
        email: "momen8@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "6th October",
        phone: "01065928310",
        gender: GenderType.male,
        blood: bloodType.AB_NEG,
        disease: "Migraine",
        age: 27,
        currentMedication: "Pain relievers",
        doctorId: new Types.ObjectId("69fa66b235d89cf25d58bf00")
      },
      {
        confirmed: true,
        role: UserRoleEnum.Patient,
        fName: "Tamer",
        lName: "Saad",
        email: "tamer9@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Fayoum",
        phone: "01081472953",
        gender: GenderType.male,
        blood: bloodType.A_POS,
        disease: "Liver Disease",
        age: 55,
        currentMedication: "Hepatitis treatment"
      },
      {
        confirmed: true,
        role: UserRoleEnum.Patient,
        fName: "Laila",
        lName: "Mahmoud",
        email: "laila10@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Shubra",
        phone: "01023658947",
        gender: GenderType.female,
        blood: bloodType.O_POS,
        disease: "Thyroid Disorder",
        age: 40,
        currentMedication: "Thyroxine",
        doctorId: new Types.ObjectId("69fa66b335d89cf25d58bf03")
      }
    ];

    const CompanionsData = [
      {
        confirmed: true,
        role: UserRoleEnum.Companion,
        fName: "Ali",
        lName: "Hassan",
        email: "ali1@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Cairo",
        phone: "01092736451",
        gender: GenderType.male,
        relationPatient: "father",
        experienceLevel: "junior",
        patientId: new Types.ObjectId("69fa68bfd678a3cd101bb079")
      },
      {
        confirmed: true,
        role: UserRoleEnum.Companion,
        fName: "Mona",
        lName: "Youssef",
        email: "mona2@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Giza",
        phone: "01058392017",
        gender: GenderType.female,
        relationPatient: "mother",
        experienceLevel: "senior",
        patientId: new Types.ObjectId("69fa68bed678a3cd101bb076")
      },
      {
        confirmed: true,
        role: UserRoleEnum.Companion,
        fName: "Omar",
        lName: "Saad",
        email: "omar3@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Alex",
        phone: "01019475638",
        gender: GenderType.male,
        relationPatient: "brother",
        experienceLevel: "mid",
        patientId: new Types.ObjectId("69fa68bdd678a3cd101bb073")
      },
      {
        confirmed: true,
        role: UserRoleEnum.Companion,
        fName: "Sara",
        lName: "Ali",
        email: "saraAhmed@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Mansoura",
        phone: "01076291845",
        gender: GenderType.female,
        relationPatient: "sister",
        experienceLevel: "junior",
        patientId: new Types.ObjectId("69fa68bdd678a3cd101bb070")
      },
      {
        confirmed: true,
        role: UserRoleEnum.Companion,
        fName: "Khaled",
        lName: "Mostafa",
        email: "khaledMostafa@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Tanta",
        phone: "01033847129",
        gender: GenderType.male,
        relationPatient: "son",
        experienceLevel: "mid",
        patientId: new Types.ObjectId("69fa68bcd678a3cd101bb06d")
      },
      {
        confirmed: true,
        role: UserRoleEnum.Companion,
        fName: "Nour",
        lName: "Hassan",
        email: "nourIbrahem@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Zagazig",
        phone: "01090561374",
        gender: GenderType.female,
        relationPatient: "daughter",
        experienceLevel: "senior",
        patientId: new Types.ObjectId("69fa68bbd678a3cd101bb06a")
      },
      {
        confirmed: true,
        role: UserRoleEnum.Companion,
        fName: "Tamer",
        lName: "Mahmoud",
        email: "tamer7@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Fayoum",
        phone: "01047192836",
        gender: GenderType.male,
        relationPatient: "father",
        experienceLevel: "junior",
        patientId: new Types.ObjectId("69fa68bbd678a3cd101bb067")
      },
      {
        confirmed: true,
        role: UserRoleEnum.Companion,
        fName: "Laila",
        lName: "Osama",
        email: "laila8@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Ismailia",
        phone: "01065928310",
        gender: GenderType.female,
        relationPatient: "mother",
        experienceLevel: "mid",
        patientId: new Types.ObjectId("69fa68bad678a3cd101bb064")
      },
      {
        confirmed: true,
        role: UserRoleEnum.Companion,
        fName: "Youssef",
        lName: "Adel",
        email: "youssef9@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "6th October",
        phone: "01081472953",
        gender: GenderType.male,
        relationPatient: "brother",
        experienceLevel: "senior",
        patientId: new Types.ObjectId("69fa68b9d678a3cd101bb061")
      },
      {
        confirmed: true,
        role: UserRoleEnum.Companion,
        fName: "Menna",
        lName: "Hany",
        email: "menna10@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Shubra",
        phone: "01023658947",
        gender: GenderType.female,
        relationPatient: "sister",
        experienceLevel: "junior",
        patientId: new Types.ObjectId("69fa68b8d678a3cd101bb05e")
      }
    ];

    for (const doctor of doctorsData) {
      const exists = await this.userRepo.findOne({ email: doctor.email })
      if (exists) continue
      await this.userRepo.create(doctor)
    }


    for (const patient of patientsData) {
      const exists = await this.userRepo.findOne({ email: patient.email })
      if (exists) continue
      await this.userRepo.create(patient)
    }

    for (const companion of CompanionsData) {
      const exists = await this.userRepo.findOne({ email: companion.email })
      if (exists) continue
      await this.userRepo.create(companion)
    }
    return { message: "done" }
  }
}




