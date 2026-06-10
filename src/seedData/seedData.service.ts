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
        address: "ش الفتح أول شارع يمين بعد سوبر ماركت الجزيرة ، أرض أدمون، دمنهور، محافظة البحيرة",
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
        address: "74 طريق الحرية، كوم الدكة شرق، قسم العطارين، الإسكندرية،",
        phone: "01035645582",
        gender: GenderType.female,
        price: 550,
        specialization: specializationType.GeneralSurgerySpecialization,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "Mrehan ",
        lName: "adel",
        email: "mrehanAdel@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "دمنهور.النادي.امام مسجد سيدي عمر، قسم دمنهور، محافظة البحيرة 22111",
        phone: "01025458255",
        gender: GenderType.female,
        price: 630,
        specialization: specializationType.InternalMedicineSpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "Mohamed ",
        lName: "frag",
        email: "mohamedFrag@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "معروف، قسم قصر النيل، محافظة القاهرة 369P+2Q4، إبن الرشيد، روض الفرج، محافظة القاهرة 4341004",
        phone: "0123501044",
        gender: GenderType.male,
        price: 560,
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
        address: "next to Royal hospital, ElGomhoria street,  قسم دمنهور، محافظة البحيرة 5844124",
        phone: "0102266094",
        gender: GenderType.male,
        price: 750,
        specialization: specializationType.cardiologySpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "Razan",
        lName: "Diab",
        email: "razanDiab@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "29VC+4PF، البنا، المنصورة (قسم 2)، اول المنصورة، محافظة الدقهلية 7650728",
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
        address: "معروف، قسم قصر النيل، محافظة القاهرة 4272150",
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
        address: "شارع عبد السلام الشاذلى، قسم دمنهور، محافظة البحيرة 5844034",
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
        address: "st Front of Diewan, 1-Aly Ebn Aby Taleb st from Abd El Salam El Shazly, El Mohafza, محافظة البحيرة",
        phone: "0102250234",
        gender: GenderType.male,
        price: 360,
        specialization: specializationType.chestSpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "Noura ",
        lName: "Nassef",
        email: "NouraNassef@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "٤ عمرو بن كلثوم، الصوري، العطارين، محافظة الإسكندرية 5370041",
        phone: "01022501144",
        gender: GenderType.female,
        price: 640,
        specialization: specializationType.cardiologySpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "aya ",
        lName: "Mohamed",
        email: "ayaMohamed@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "Hilton Alexandria King's Ranch, 10.5 km, Cairo - Borg El-Arab Desert Rd, Ekeingy Maryout (Sharq WA Gharb), Alexandria Governorate",
        phone: "01235367852",
        gender: GenderType.female,
        price: 350,
        specialization: specializationType.EmergencyMedicine,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "mohamed",
        lName: "Essam",
        email: "mohamedEssam@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "شارع سعد زغلول، المنصورة (قسم 2)، ثان المنصورة، محافظة الدقهلية 35111",
        phone: "0114250215132",
        gender: GenderType.male,
        price: 500,
        specialization: specializationType.PhysicalTherapy,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "Momen",
        lName: "Yousri",
        email: "MomenYousri@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "29V7+JG8، شارع الجمهورية، ميت خميس وكفر الموجي، المنصورة، محافظة الدقهلية 7650030",
        phone: "01142502151",
        gender: GenderType.male,
        price: 600,
        specialization: specializationType.Anesthesiology,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
      {
        fName: "Mohamed",
        lName: "Ali",
        email: "MohamedAli@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "٣ أ شارع فاروق احمد خطاب متفرع من, أبو الهول السياحي، محافظة الجيزة",
        phone: "01232523252",
        gender: GenderType.male,
        price: 700,
        specialization: specializationType.InternalMedicineSpecialty,
        confirmed: true,
        role: UserRoleEnum.Doctor
      },
       {
        fName: "Rewan",
        lName: "Mahmoud",
        email: "RewanMahmoud@gmail.com",
        password: "1Lojy@1234",
        cPassword: "1Lojy@1234",
        address: "2646+85H، صلاح سالم، رابعة، قسم الجيزة، محافظة الجيزة 3724302",
        phone: "01232523252",
        gender: GenderType.female,
        price: 250,
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
        email: "nourAli@gmail.com",
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
        email: "monayoussef@gmail.com",
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
        email: "omarSaad@gmail.com",
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
        email: "youssefAdel@gmail.com",
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
        lName: "Osama",
        email: "mennaOsama@gmail.com",
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




