import { Delete, Edit } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { IExperienceDetails } from "../../../../types/userType";
import { FC } from "react";

interface IExperienceDataRowProps {
  experience: IExperienceDetails;
  handleRemoveSingleRow: (id: number) => void;
}

export const ExperienceDataRow: FC<IExperienceDataRowProps> = ({
  experience,
  handleRemoveSingleRow,
}) => {
  return (
    <Grid container columnSpacing={4} rowSpacing={1} alignItems="center">
      <Grid item xs={2.5}>
        <Typography fontSize={14}>{experience.companyName}</Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography fontSize={14}>{experience.position}</Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography fontSize={14}>{experience.totalYear}</Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography fontSize={14}>{experience.lastCTC}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Box display="flex" alignItems="center" gap={0.5} flexWrap="wrap">
          <Edit color="secondary" />
          <IconButton onClick={() => handleRemoveSingleRow(experience.id)}>
            <Delete color="error" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};
