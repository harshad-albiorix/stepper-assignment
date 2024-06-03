import { Grid, Typography } from "@mui/material";

export const ExperienceHeaderRow = () => {
  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={2.5}>
        <Typography fontSize={14} fontWeight={600}>
          Company Name
        </Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography fontSize={14} fontWeight={600}>
          Position
        </Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography fontSize={14} fontWeight={600}>
          Total Year
        </Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography fontSize={14} fontWeight={600}>
          Last CTC
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
