import { Grid, Typography } from "@mui/material";

export const EducationHeaderRow = () => {
  return (
    <Grid container columnSpacing={4} paddingBlock={2}>
      <Grid item xs={2.5}>
        <Typography fontSize={14} fontWeight={600}>
          Education Name
        </Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography fontSize={14} fontWeight={600}>
          University Name
        </Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography fontSize={14} fontWeight={600}>
          Result
        </Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography fontSize={14} fontWeight={600}>
          Year of Passing
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography fontSize={14} fontWeight={600}>
          Action
        </Typography>
      </Grid>
    </Grid>
  );
};
