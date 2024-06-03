export interface PersonalDetailsFrom {
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  mobile: string;
  dob: string;
  presentAddress: string;
  permanentAddress: string;
}

export interface BankDetailsForm {
  bankName: string;
  accountName: string;
  bankAccountNumber: string;
  IFSCCode: string;
  aadhaarCardNumber: string;
  PANCard: string;
}

export interface Experience {
  year: number;
  month: number;
}

export interface ProfessionalDetailsForm {
  designation: string;
  department: string;
  experience: Experience;
  currentLocation: string;
  skill: string[];
}

export interface EducationDetailsForm {
  educationName: string;
  universityName: string;
  result: string;
  yearOfPassing: string;
}

export interface ExperienceDetailsForm {
  companyName: string;
  position: string;
  totalYear: number;
  lastCTC: string;
}

export interface CurrentOrgDetailsForm {
  joiningDate: string;
  nextAppraisalDate: string;
  currentCTC: string;
}
