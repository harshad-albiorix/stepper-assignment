import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import { steps } from "../../constant/data";
import { FormContext } from "../../context/FormContext";
import {
  BankDetails,
  CurrentOrganizationDetails,
  EducationDetails,
  ExperienceDetails,
  PersonalDetails,
  ProfessionalDetails,
} from "../../component";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setUserData } from "../../redux/FormSlice";

const components = [
  PersonalDetails,
  BankDetails,
  ProfessionalDetails,
  EducationDetails,
  ExperienceDetails,
  CurrentOrganizationDetails,
];

export const AddEmployee = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const users = useSelector((state: RootState) => state.main.data);
  const currentUser = useSelector((state: RootState) => state.form.currentUser);
  const dispatch = useDispatch();

  const params = useParams();

  const getEmployeeById = useCallback(
    (id: number) => {
      return !!id ? users?.find((user) => user.id === id) : {};
    },
    [users]
  );

  const id = parseInt(params?.id ? params?.id : "");

  useEffect(() => {
    if (id) {
      const data = getEmployeeById(id);
      dispatch(setUserData({ ...data }));
    }
  }, [dispatch, getEmployeeById, id]);

  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <FormContext.Provider
      value={{ activeStep, handleNext, handleBack, handleReset }}
    >
      <Box sx={{ width: "100%", paddingBlock: 2 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((item, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step key={index} {...stepProps}>
                <StepLabel {...labelProps}>{item.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Fragment>
        ) : (
          <Box sx={{ paddingBlock: 4 }}>
            {components?.map((Component, index) => {
              if (activeStep === index) {
                return <Component key={index} data={currentUser ?? {}} />;
              }
            })}
          </Box>
        )}
      </Box>
    </FormContext.Provider>
  );
};
