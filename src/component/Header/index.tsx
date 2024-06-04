import { Box, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Box
      height={24}
      my={4}
      display="flex"
      justifyContent="center"
      gap={4}
      p={2}
    >
      <Typography variant="h4">Employee Management System</Typography>
    </Box>
  );
};
