import { Avatar, Box, Button, IconButton, Stack } from "@mui/material";
import { Header, Table } from "../../component";
import { Delete, Edit, InsertDriveFile, PersonAdd } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeUser } from "../../redux/MainSlice";

export const UserList = () => {
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.main.data);
  const dispatch = useDispatch();

  const handleRemoveUser = (id: number) => {
    dispatch(removeUser(id));
  };

  const column = [
    {
      id: "profile",
      numeric: false,
      disablePadding: true,
      label: "Profile",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "department",
      numeric: false,
      disablePadding: false,
      label: "department",
    },
    {
      id: "designation",
      numeric: false,
      disablePadding: false,
      label: "Designation",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "mobile",
      numeric: false,
      disablePadding: false,
      label: "Mobile",
    },
    {
      id: "resume",
      numeric: false,
      disablePadding: false,
      label: "Resume",
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
    },
  ];

  const data = users?.map((x) => {
    const { personalDetails, professionalDetails, id } = x;
    return {
      profile: (
        <Avatar src={personalDetails?.profile}>
          {personalDetails?.firstname[0]}
        </Avatar>
      ),
      name: `${personalDetails?.firstname} ${personalDetails?.lastname}`,
      department: `${professionalDetails?.department}`,
      designation: `${professionalDetails?.designation}`,
      email: `${personalDetails?.email}`,
      mobile: `${personalDetails?.mobile}`,
      resume: (
        <Link to={professionalDetails?.resume!} target="_blank" download>
          <IconButton>
            <InsertDriveFile color="action" />
          </IconButton>
        </Link>
      ),
      action: (
        <Box display="flex" justifyContent="right">
          <IconButton onClick={() => navigate(`edit-employee/${id}`)}>
            <Edit color="secondary" />
          </IconButton>
          <IconButton onClick={() => handleRemoveUser(id!)}>
            <Delete color="error" />
          </IconButton>
        </Box>
      ),
    };
  });

  return (
    <Stack spacing={8}>
      <Header />
      <Stack spacing={3}>
        <Box display="flex" justifyContent="end">
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => navigate("add-employee")}
          >
            Add Employee
          </Button>
        </Box>
        <Table data={data} column={column} />
      </Stack>
    </Stack>
  );
};
