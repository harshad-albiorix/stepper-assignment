import { Box, Button } from "@mui/material";
import { FC, useContext } from "react";
import { FormContext } from "../../../context/FormContext";
import { steps } from "../../../constant/data";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCurrentUser } from "../../../redux/FormSlice";

interface IStepperFooterButtonProps {
  manualNext?: () => void;
}

export const StepperFooterButton: FC<IStepperFooterButtonProps> = ({
  manualNext,
}) => {
  const { activeStep, handleBack } = useContext(FormContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackToList = () => {
    dispatch(resetCurrentUser());
    navigate("/");
  };

  return (
    <Box display="flex" justifyContent="space-between" pt={4}>
      <Button variant="outlined" onClick={handleBackToList}>
        Back to List
      </Button>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
          variant="contained"
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {manualNext ? (
          <Button type="button" variant="contained" onClick={manualNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        ) : (
          <Button type="submit" variant="contained">
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        )}
      </Box>
    </Box>
  );
};
