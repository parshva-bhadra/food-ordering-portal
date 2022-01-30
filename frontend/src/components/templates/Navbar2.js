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
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {type == "user" &&
          <Button color="inherit" onClick={() => navigate("/profile/userdashboard")}>
            My Orders
          </Button>
          }
          {type == "vendor" &&
          <Button color="inherit" onClick={() => navigate("/profile/vendordashboard")}>
            Dashboard
          </Button>
          }
          <Button color="inherit" onClick={() => navigate("/profile/")}>
            My Profile
          </Button>
          {type == "user" &&
          <Button color="inherit" onClick={() => navigate("/profile/wallet")}>
            Wallet
          </Button>
          }
          {type == "vendor" &&
          <Button color="inherit" onClick={() => navigate("/profile/vendormenu")}>
            Menu
          </Button>
          }
          {type == "user" &&
          <Button color="inherit" onClick={() => navigate("/profile/usermenu")}>
            Dashboard
          </Button>
          }
          {type == "user" &&
          <Button color="inherit" onClick={() => navigate("/profile/favourites")}>
            Favourites
          </Button>
          }
          {type == "vendor" &&
          <Button color="inherit" onClick={() => navigate("/profile/addfood")}>
            Add Item
          </Button>
          }
          {type == "vendor" &&
          <Button color="inherit" onClick={() => navigate("/profile/stats")}>
            Statistics
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
