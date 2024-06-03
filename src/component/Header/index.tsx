import { Box } from "@mui/material";

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
      <h3>Employee Management System</h3>
    </Box>
  );
};
