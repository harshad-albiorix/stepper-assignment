import { Box, Grid, Stack, Typography } from "@mui/material";
import { FormContext } from "../../../context/FormContext";
import { FC, useContext, useEffect, useRef } from "react";
import { Input } from "../../core";
import { useFormik } from "formik";
import { BankDetailsForm } from "../../../constant/type";
import { bankDetailsSchema } from "../../../constant/schema";
import { StepperFooterButton } from "../StepperFooterButton";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../redux/FormSlice";
import { IUserDetails } from "../../../types/userType";

interface IBankDetailsProps {
  data?: Partial<IUserDetails>;
}

export const BankDetails: FC<IBankDetailsProps> = ({ data }) => {
  const { handleNext } = useContext(FormContext);
  const dispatch = useDispatch();

  const formik = useFormik<BankDetailsForm>({
    initialValues: {
      bankName: "",
      accountName: "",
      bankAccountNumber: "",
      IFSCCode: "",
      aadhaarCardNumber: "",
      PANCard: "",
    },
    // validationSchema: bankDetailsSchema,
    onSubmit: (value: BankDetailsForm) => handleSubmit(value),
  });

  const formikRef = useRef(formik);

  useEffect(() => {
    if (data?.bankDetails) {
      formikRef.current.setValues(data?.bankDetails);
    }
  }, [data?.bankDetails]);

  const handleSubmit = (value: BankDetailsForm) => {
    if (value) {
      dispatch(setUserData({ bankDetails: value }));
      handleNext();
    }
  };

  return (
    <Stack spacing={3}>
      <Box display="flex" justifyContent="center">
        <Typography fontSize={24}>Bank Details</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Input
                formik={formik}
                name="bankName"
                id="bankName"
                label="Bank Name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                formik={formik}
                name="accountName"
                id="accountName"
                label="Account Name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                formik={formik}
                name="bankAccountNumber"
                id="bankAccountNumber"
                label="Bank Account Number"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                formik={formik}
                name="IFSCCode"
                id="IFSCCode"
                label="IFSC Code"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                formik={formik}
                name="aadhaarCardNumber"
                id="aadhaarCardNumber"
                label="Aadhaar Card Number"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                formik={formik}
                name="PANCard"
                id="PANCard"
                label="PAN Card"
                variant="standard"
              />
            </Grid>
          </Grid>
        </Box>
        <StepperFooterButton />
      </form>
    </Stack>
  );
};
