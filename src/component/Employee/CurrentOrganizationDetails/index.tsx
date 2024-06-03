import { Box, Grid, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { CurrentOrgDetailsForm } from "../../../constant/type";
import { currentOrgDetailsSchema } from "../../../constant/schema";
import { DateInputField, Input } from "../../core";
import { StepperFooterButton } from "../StepperFooterButton";
import { useDispatch } from "react-redux";
import { resetCurrentUser, setUserData } from "../../../redux/FormSlice";
import { useLocation, useNavigate } from "react-router-dom";
import store from "../../../redux/store";
import { createUser, updateUser } from "../../../redux/MainSlice";
import { generateUniqueRandomNumber } from "../../../utils/func";
import { FC, useEffect, useRef } from "react";
import { IUserDetails } from "../../../types/userType";

interface ICurrentOrganizationDetailsProps {
  data?: Partial<IUserDetails>;
}

export const CurrentOrganizationDetails: FC<
  ICurrentOrganizationDetailsProps
> = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const currentUrl = pathname.split("/")[1];

  const formik = useFormik<CurrentOrgDetailsForm>({
    initialValues: {
      joiningDate: "",
      nextAppraisalDate: "",
      currentCTC: "",
    },
    validationSchema: currentOrgDetailsSchema,
    onSubmit: (value: CurrentOrgDetailsForm) => handleSubmit(value),
  });

  const formikRef = useRef(formik);

  useEffect(() => {
    if (data?.currentOrgDetails) {
      formikRef.current.setValues(data?.currentOrgDetails);
    }
  }, [data?.currentOrgDetails]);

  const handleBackToList = () => {
    dispatch(resetCurrentUser());
    navigate("/");
  };

  const handleCreateUser = () => {
    const currentUser = store.getState().form.currentUser;
    if (currentUser) {
      const id = generateUniqueRandomNumber();
      dispatch(createUser({ ...currentUser, id }));
      handleBackToList();
    }
  };

  const handleUpdateUser = () => {
    const currentUser = store.getState().form.currentUser;

    if (currentUser) {
      dispatch(updateUser({ ...currentUser }));
      handleBackToList();
    }
  };

  const handleSubmit = async (value: CurrentOrgDetailsForm) => {
    if (value) {
      dispatch(setUserData({ currentOrgDetails: value }));
      if (currentUrl === "edit-employee") {
        handleUpdateUser();
      } else {
        handleCreateUser();
      }
    }
  };

  return (
    <Stack spacing={3}>
      <Box display="flex" justifyContent="center">
        <Typography fontSize={24}>Current Organization Details</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <DateInputField
              formik={formik}
              name="joiningDate"
              id="joiningDate"
              label="Joining Date"
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <DateInputField
              formik={formik}
              name="nextAppraisalDate"
              id="nextAppraisalDate"
              label="Next Appraisal Date"
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              formik={formik}
              name="currentCTC"
              id="currentCTC"
              label="Current CTC"
              variant="standard"
            />
          </Grid>
        </Grid>
        <StepperFooterButton />
      </form>
    </Stack>
  );
};
