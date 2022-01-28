import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
      }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
        setEmail("");
        setPassword("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const User = {
            email: email,
            password: password
        };

        console.log(User)

        axios
            .post("http://localhost:4000/user/login", User)
            .then((response) => {
                if (response.data != null)
                {
                    console.log(response.data);
                    localStorage.setItem("email",response.data.email);
                    localStorage.setItem("type",response.data.type);
                    navigate("/profile");
                }
                else
                {
                    console.log("login failed");
                }
            }); 
        resetInputs();
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={onChangeEmail}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Login
                </Button>
            </Grid>
        </Grid>
    );
};

export default Login;
