import { Delete, Edit } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { IEducationDetails } from "../../../../types/userType";
import { FC } from "react";

interface IEducationDataRowProps {
  education: IEducationDetails;
  handleRemoveSingleRow: (id: number) => void;
}

export const EducationDataRow: FC<IEducationDataRowProps> = ({
  education,
  handleRemoveSingleRow,
}) => {
  return (
    <Grid container columnSpacing={4} rowSpacing={1} alignItems="center">
      <Grid item xs={2.5}>
        <Typography fontSize={14}>{education?.educationName}</Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography fontSize={14}>{education?.universityName}</Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography fontSize={14}>{education?.result}</Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography fontSize={14}>{education?.yearOfPassing}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Box display="flex" alignItems="center" gap={0.5} flexWrap="wrap">
          <Edit color="secondary" />
          <IconButton onClick={() => handleRemoveSingleRow(education.id)}>
            <Delete color="error" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};
