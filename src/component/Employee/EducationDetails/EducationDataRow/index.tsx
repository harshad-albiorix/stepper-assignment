import { Delete, Edit } from "@mui/icons-material";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import { IEducationDetails } from "../../../../types/userType";
import { Dispatch, FC, Fragment, useState } from "react";
import { AddEducation } from "../AddEducation";

interface IEducationDataRowProps {
  education: IEducationDetails;
  setEducationData: Dispatch<React.SetStateAction<IEducationDetails[]>>;
  handleRemoveSingleRow: (id: number) => void;
}

export const EducationDataRow: FC<IEducationDataRowProps> = ({
  education,
  setEducationData,
  handleRemoveSingleRow,
}) => {
  const [data, setData] = useState<IEducationDetails | null>(null);

  const handleCloseEdit = () => {
    setData(null);
  };

  if (data) {
    return (
      <Fragment>
        <AddEducation
          setEducationData={setEducationData}
          handleToggleForm={handleCloseEdit}
          data={data}
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
          <IconButton onClick={() => setData(education)}>
            <Edit color="secondary" />
          </IconButton>
          <IconButton onClick={() => handleRemoveSingleRow(education.id)}>
            <Delete color="error" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};
