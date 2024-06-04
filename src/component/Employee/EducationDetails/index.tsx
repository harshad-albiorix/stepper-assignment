import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";

import { EducationHeaderRow } from "./EducationHeaderRow";
import { AddEducation } from "./AddEducation";
import { EducationDataRow } from "./EducationDataRow";
import { StepperFooterButton } from "../StepperFooterButton";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { IEducationDetails, IUserDetails } from "../../../types/userType";
import { Add } from "@mui/icons-material";
import { FormContext } from "../../../context/FormContext";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../redux/FormSlice";
import { toast } from "react-toastify";

interface IEducationDetailsProps {
  data?: Partial<IUserDetails>;
}

export const EducationDetails: FC<IEducationDetailsProps> = ({ data }) => {
  const { handleNext } = useContext(FormContext);
  const dispatch = useDispatch();
  const [educationData, setEducationData] = useState<IEducationDetails[]>([]);
  const [isOpenForm, setIsOpenForm] = useState(false);

  useEffect(() => {
    if (data?.educationDetails) {
      setEducationData(data?.educationDetails!);
    }
  }, [data?.educationDetails]);

  const handleToggleForm = () => {
    setIsOpenForm((prev) => !prev);
  };

  const manualNext = () => {
    if (educationData.length) {
      dispatch(setUserData({ educationDetails: educationData }));
      handleNext();
    } else {
      toast.error("Please add minimum one education.");
    }
  };

  const handleRemoveSingleRow = (id: number) => {
    setEducationData((prev) => prev.filter((edu) => edu.id !== id));
  };

  return (
    <Stack spacing={3}>
      <Box display="flex" justifyContent="center">
        <Typography fontSize={24}>Education Details</Typography>
      </Box>
      <Box display="flex" justifyContent="end" alignItems="center">
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={handleToggleForm}
        >
          Add Education
        </Button>
      </Box>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          paddingInline: 2,
          paddingTop: 1,
          boxShadow: 4,
        }}
      >
        <EducationHeaderRow />
        <Divider />
        {!isOpenForm && !educationData.length && (
          <Fragment>
            <Box display="flex" justifyContent="center" paddingBlock={2}>
              <Typography fontSize={14}>No record</Typography>
            </Box>
            <Divider />
          </Fragment>
        )}

        {educationData?.map((education, index) => (
          <Fragment>
            <EducationDataRow
              key={index}
              education={education}
              handleRemoveSingleRow={handleRemoveSingleRow}
              setEducationData={setEducationData}
            />
            <Divider />
          </Fragment>
        ))}

        {isOpenForm && (
          <Fragment>
            <AddEducation
              setEducationData={setEducationData}
              handleToggleForm={handleToggleForm}
            />
            <Divider />
          </Fragment>
        )}
      </Paper>

      <StepperFooterButton manualNext={manualNext} />
    </Stack>
  );
};
