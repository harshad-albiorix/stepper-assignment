import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { PersonalDetailsFrom } from "../../../constant/type";
import { DateInputField, Input } from "../../core";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "../../../context/FormContext";
import { StepperFooterButton } from "../StepperFooterButton";
import { personalDetailsSchema } from "../../../constant/schema";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../redux/FormSlice";
import { useFileUpload } from "../../../hooks/useFileUpload";
import { CloudUpload } from "@mui/icons-material";
import { IUserDetails } from "../../../types/userType";

interface IPersonalDetailsProps {
  data?: Partial<IUserDetails>;
}

export const PersonalDetails: FC<IPersonalDetailsProps> = ({ data }) => {
  const { handleNext } = useContext(FormContext);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const { fileUrl, handleUpload } = useFileUpload();

  const formik = useFormik<PersonalDetailsFrom>({
    initialValues: {
      firstname: "",
      lastname: "",
      middlename: "",
      dob: "",
      email: "",
      mobile: "",
      permanentAddress: "",
      presentAddress: "",
    },
    // validationSchema: personalDetailsSchema,
    onSubmit: (value: PersonalDetailsFrom) => handleSubmit(value),
  });

  const formikRef = useRef(formik);

  useEffect(() => {
    if (data?.personalDetails) {
      formikRef.current.setValues(data?.personalDetails);
    }
  }, [data?.personalDetails]);

  useEffect(() => {
    if (selected) {
      formikRef.current.setFieldValue(
        "permanentAddress",
        formik.values.presentAddress
      );
    }
  }, [formik.values.presentAddress, selected]);

  const handleSubmit = (value: PersonalDetailsFrom) => {
    if (value) {
      dispatch(
        setUserData({ personalDetails: { ...value, profile: fileUrl } })
      );
      handleNext();
    }
  };

  return (
    <Stack spacing={3}>
      <Box display="flex" justifyContent="center">
        <Typography fontSize={24}>Personal Details</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Input
              formik={formik}
              name="firstname"
              id="firstname"
              label="First Name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              formik={formik}
              name="middlename"
              id="middlename"
              label="Middle Name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              formik={formik}
              name="lastname"
              id="lastname"
              label="Last Name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              formik={formik}
              name="email"
              id="email"
              label="Email"
              variant="standard"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              formik={formik}
              name="mobile"
              id="mobile"
              label="Mobile Number"
              variant="standard"
            />
          </Grid>
          <Grid item xs={4}>
            <DateInputField
              formik={formik}
              name="dob"
              id="dob"
              label="Date of Birth"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleUpload}
              type="button"
              startIcon={<CloudUpload />}
              variant="contained"
            >
              Upload Image
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Input
              formik={formik}
              name="presentAddress"
              id="presentAddress"
              label="Present Address"
              variant="standard"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              formik={formik}
              name="permanentAddress"
              id="permanentAddress"
              label="Permanent Address"
              variant="standard"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected}
                    onClick={() => setSelected((prev) => !prev)}
                  />
                }
                label="Copy to Permanent Address"
              />
            </FormGroup>
          </Grid>
        </Grid>
        <StepperFooterButton />
      </form>
    </Stack>
  );
};
