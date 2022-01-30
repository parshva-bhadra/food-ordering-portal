import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import Wallet from "./components/users/Wallet";
import Addfood from "./components/users/Addfood";
import Vendordashboard from "./components/users/Vendordashboard";
import Userdashboard from "./components/users/Userdashboard";
import Stats from "./components/users/Stats";
import Editfood from "./components/users/Editfood";
import Favourites from "./components/users/Favourites";
import Vendormenu from "./components/users/Vendormenu";
import Usermenu from "./components/users/Usermenu";
import Navbar2 from "./components/templates/Navbar2";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const Layout2 = () => {
  return (
    <div>
      <Navbar2 />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="users" element={<UsersList />} /> */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="profile" element={<Profile />} /> */}
        </Route>
        <Route path="/profile/" element={<Layout2 />}>
          <Route path="/profile/" element={<Profile />} />
          {/* <Route path="users" element={<UsersList />} /> */}
          {/* <Route path="register" element={<Register />} /> */}
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="/profile/users" element={<UsersList />} />
          <Route path="/profile/wallet" element={<Wallet />} />
          <Route path="/profile/addfood" element={<Addfood />} />
          <Route path="/profile/vendormenu" element={<Vendormenu />} />
          <Route path="/profile/usermenu" element={<Usermenu />} />
          <Route path="/profile/userdashboard" element={<Userdashboard />} />
          <Route path="/profile/vendordashboard" element={<Vendordashboard />} />
          <Route path="/profile/favourites" element={<Favourites />} />
          <Route path="/profile/stats" element={<Stats />} />
          <Route path="/profile/edit/:id" element={<Editfood />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
