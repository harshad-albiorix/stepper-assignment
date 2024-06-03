import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { FormContext } from "../../../context/FormContext";
import { FC, useContext, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { ProfessionalDetailsForm } from "../../../constant/type";
import { professionalDetailsSchema } from "../../../constant/schema";
import { Dropdown, DropdownWithMultiple, Input } from "../../core";
import { StepperFooterButton } from "../StepperFooterButton";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../redux/FormSlice";
import { CloudUpload } from "@mui/icons-material";
import { useFileUpload } from "../../../hooks/useFileUpload";
import { IUserDetails } from "../../../types/userType";

interface IProfessionalDetailsProps {
  data?: Partial<IUserDetails>;
}

export const ProfessionalDetails: FC<IProfessionalDetailsProps> = ({
  data,
}) => {
  const { handleNext } = useContext(FormContext);
  const dispatch = useDispatch();
  const { fileUrl, handleUpload } = useFileUpload();

  const formik = useFormik<ProfessionalDetailsForm>({
    initialValues: {
      designation: "",
      department: "",
      experience: {
        month: 0,
        year: 0,
      },
      currentLocation: "",
      skill: [],
    },
    // validationSchema: professionalDetailsSchema,
    onSubmit: (value: ProfessionalDetailsForm) => handleSubmit(value),
  });

  const formikRef = useRef(formik);

  useEffect(() => {
    if (data?.professionalDetails) {
      formikRef.current.setValues(data?.professionalDetails);
    }
  }, [data?.professionalDetails]);

  const handleSubmit = (value: ProfessionalDetailsForm) => {
    if (value) {
      dispatch(
        setUserData({ professionalDetails: { ...value, resume: fileUrl } })
      );
      handleNext();
    }
  };

  return (
    <Stack spacing={3}>
      <Box display="flex" justifyContent="center">
        <Typography fontSize={24}>Professional Details</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Input
              formik={formik}
              name="designation"
              id="designation"
              label="Designation"
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              formik={formik}
              name="department"
              id="department"
              label="Department"
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" gap={2} alignItems={"center"}>
              <Typography>Experience:</Typography>
              <FormControl fullWidth>
                <InputLabel id="experience.year">Year</InputLabel>
                <Dropdown
                  labelId="experience.year"
                  name="experience.year"
                  id="experience.year"
                  label="Year"
                  variant="standard"
                  options={[
                    { value: 0, label: "0 Year" },
                    { value: 1, label: "1 Year" },
                    { value: 2, label: "2 Year" },
                    { value: 3, label: "3 Year" },
                    { value: 4, label: "4 Year" },
                    { value: 5, label: "5 Year" },
                  ]}
                  formik={formik}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="experience.month">Month</InputLabel>
                <Dropdown
                  labelId="experience.month"
                  name="experience.month"
                  id="experience.month"
                  label="Year"
                  variant="standard"
                  options={[
                    { value: 0, label: "0 Month" },
                    { value: 1, label: "1 Month" },
                    { value: 2, label: "2 Month" },
                    { value: 3, label: "3 Month" },
                    { value: 4, label: "4 Month" },
                    { value: 5, label: "5 Month" },
                  ]}
                  formik={formik}
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Input
              formik={formik}
              name="currentLocation"
              id="currentLocation"
              label="Current Location"
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="experience.month">Skills</InputLabel>
              <DropdownWithMultiple
                labelId="skill"
                name="skill"
                id="skill"
                label="Skills"
                variant="standard"
                formik={formik}
                options={["React Js", "Node Js", "HTML"]}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={handleUpload}
              type="button"
              startIcon={<CloudUpload />}
              variant="contained"
            >
              Upload Resume
            </Button>
          </Grid>
        </Grid>
        <StepperFooterButton />
      </form>
    </Stack>
  );
};
