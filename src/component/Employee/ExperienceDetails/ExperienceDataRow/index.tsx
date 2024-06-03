import { Delete, Edit } from "@mui/icons-material";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import { IExperienceDetails } from "../../../../types/userType";
import { Dispatch, FC, Fragment, useState } from "react";
import { AddExperience } from "../AddExperience";

interface IExperienceDataRowProps {
  experience: IExperienceDetails;
  handleRemoveSingleRow: (id: number) => void;
  setExperienceData: Dispatch<React.SetStateAction<IExperienceDetails[]>>;
}

export const ExperienceDataRow: FC<IExperienceDataRowProps> = ({
  experience,
  handleRemoveSingleRow,
  setExperienceData,
}) => {
  const [data, setData] = useState<IExperienceDetails | null>(null);

  const handleCloseEdit = () => {
    setData(null);
  };

  if (data) {
    return (
      <Fragment>
        <AddExperience
          data={data}
          setExperienceData={setExperienceData}
          handleToggleForm={handleCloseEdit}
        />
        <Divider />
      </Fragment>
    );
  }

  return (
    <Grid
      container
      columnSpacing={4}
      rowSpacing={1}
      alignItems="center"
      paddingBlock={2}
    >
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
          <IconButton onClick={() => setData(experience)}>
            <Edit color="secondary" />
          </IconButton>

          <IconButton onClick={() => handleRemoveSingleRow(experience.id)}>
            <Delete color="error" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};
