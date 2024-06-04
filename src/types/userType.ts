export interface ICommon {
  id: number;
}

export interface IPersonalDetails {
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  mobile: string;
  dob: string;
  permanentAddress: string;
  presentAddress: string;
  profile: string;
}

export interface IBankDetails {
  bankName: string;
  accountName: string;
  bankAccountNumber: string;
  IFSCCode: string;
  aadhaarCardNumber: string;
  PANCard: string;
}

export interface IExperienceDuration {
  year: number;
  month: number;
}

export interface IProfessionalDetails {
  designation: string;
  department: string;
  experience: IExperienceDuration;
  currentLocation: string;
  skill: string[];
  resume: string;
}

export interface IEducationDetails extends ICommon {
  educationName: string;
  universityName: string;
  result: string;
  yearOfPassing: string;
}

export interface IExperienceDetails extends ICommon {
  companyName: string;
  position: string;
  totalYear: number;
  lastCTC: string;
}

export interface ICurrentOrgDetails {
  joiningDate: string;
  nextAppraisalDate: string;
  currentCTC: string;
}

export interface IUserDetails extends ICommon {
  personalDetails: IPersonalDetails;
  bankDetails: IBankDetails;
  professionalDetails: IProfessionalDetails;
  educationDetails: IEducationDetails[];
  experienceDetails: IExperienceDetails[];
  currentOrgDetails: ICurrentOrgDetails;
}
