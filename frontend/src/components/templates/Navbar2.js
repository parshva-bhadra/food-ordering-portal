import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar2 = () => {
  const navigate = useNavigate();
  const type = localStorage.getItem("type");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/profile")}
          >
            My Profile
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/profile/users")}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile/")}>
            My Profile
          </Button>
          {type == "user" &&
          <Button color="inherit" onClick={() => navigate("/profile/wallet")}>
            Wallet
          </Button>
          }
          <Button color="inherit" onClick={() => navigate("/login/")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar2;
