import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { ExperienceHeaderRow } from "./ExperienceHeaderRow";
import { ExperienceDataRow } from "./ExperienceDataRow";
import { AddExperience } from "./AddExperience";
import { Add } from "@mui/icons-material";
import { StepperFooterButton } from "../StepperFooterButton";
import { IExperienceDetails, IUserDetails } from "../../../types/userType";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { FormContext } from "../../../context/FormContext";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../redux/FormSlice";
import { toast } from "react-toastify";

interface IExperienceDetailsProps {
  data?: Partial<IUserDetails>;
}

export const ExperienceDetails: FC<IExperienceDetailsProps> = ({ data }) => {
  const { handleNext } = useContext(FormContext);
  const dispatch = useDispatch();
  const [experienceData, setExperienceData] = useState<IExperienceDetails[]>(
    []
  );
  const [isOpenForm, setIsOpenForm] = useState(false);

  useEffect(() => {
    if (data?.experienceDetails) {
      setExperienceData(data?.experienceDetails!);
    }
  }, [data?.experienceDetails]);

  const handleToggleForm = () => {
    setIsOpenForm((prev) => !prev);
  };

  const manualNext = () => {
    if (experienceData.length) {
      dispatch(setUserData({ experienceDetails: experienceData }));
      handleNext();
    } else {
      toast.error("Please add minimum one experience.");
    }
  };

  const handleRemoveSingleRow = (id: number) => {
    setExperienceData((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <Stack spacing={3}>
      <Box display="flex" justifyContent="center">
        <Typography fontSize={24}>Experience Details</Typography>
      </Box>

      <Box display="flex" justifyContent="end" alignItems="center">
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={handleToggleForm}
        >
          Add Experience
        </Button>
      </Box>
      <ExperienceHeaderRow />
      <Divider />
      {!isOpenForm && !experienceData.length && (
        <Fragment>
          <Box display="flex" justifyContent="center">
            <Typography fontSize={14}>No record</Typography>
          </Box>
          <Divider />
        </Fragment>
      )}

      {experienceData?.map((experience, index) => (
        <Fragment>
          <ExperienceDataRow
            key={index}
            experience={experience}
            handleRemoveSingleRow={handleRemoveSingleRow}
          />
          <Divider />
        </Fragment>
      ))}

      {isOpenForm && (
        <Fragment>
          <AddExperience
            setExperienceData={setExperienceData}
            handleToggleForm={handleToggleForm}
          />
          <Divider />
        </Fragment>
      )}

      <StepperFooterButton manualNext={manualNext} />
    </Stack>
  );
};
