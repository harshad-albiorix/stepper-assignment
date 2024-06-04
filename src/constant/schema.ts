import * as Yup from "yup";

export const personalDetailsSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required."),
  lastname: Yup.string().required("Last name is required."),
  middlename: Yup.string().required("Middle name is required."),
  email: Yup.string().email("Email not valid").required("Email is required."),
  mobile: Yup.string().required("Mobile is required."),
  dob: Yup.string().required("Date of birth is required."),
  permanentAddress: Yup.string().required("Permanent Address is required."),
  presentAddress: Yup.string().required("Present Address is required."),
});

export const bankDetailsSchema = Yup.object().shape({
  bankName: Yup.string().required("Bank name is required."),
  accountName: Yup.string().required("Account name is required."),
  bankAccountNumber: Yup.number().required("Bank Account number is required."),
  IFSCCode: Yup.string()
    .matches(
      /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/,
      "Invalid IFSC code format (AAAA0000001)"
    )
    .required("IFSC code is required"),
  aadhaarCardNumber: Yup.string().required("Aadhaar card number is required."),
  PANCard: Yup.string()
    .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN format (AAAAA0000A)")
    .required("PAN card is required"),
});

export const professionalDetailsSchema = Yup.object().shape({
  designation: Yup.string().required("Designation is required."),
  department: Yup.string().required("Department is required."),
  experience: Yup.object()
    .shape({
      year: Yup.number()
        .min(0, "Year must be a positive number.")
        .required("Year of experience is required."),
      month: Yup.number()
        .min(0, "Month must be a positive number.")
        .max(11, "Month must be less than 12.")
        .required("Month of experience is required."),
    })
    .required("Experience details are required."),
  currentLocation: Yup.string().required("Current Location is required."),
  skill: Yup.array()
    .of(Yup.string().required("Skill is required."))
    .min(1, "At least one skill is required."),
});

export const educationDetailsSchema = Yup.object().shape({
  educationName: Yup.string().required("Education name is required."),
  universityName: Yup.string().required("University name is required."),
  result: Yup.string().required("Result is required."),
  yearOfPassing: Yup.string().required("Year of passing is required."),
});

export const experienceDetailsSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required."),
  position: Yup.string().required("Position is required."),
  totalYear: Yup.number().required("Total year is required."),
  lastCTC: Yup.string().required("Last CTC is required."),
});

export const currentOrgDetailsSchema = Yup.object().shape({
  joiningDate: Yup.string().required("Joining date is required."),
  nextAppraisalDate: Yup.string().required("Next Appraisal date is required."),
  currentCTC: Yup.string().required("Current CTC is required."),
});
