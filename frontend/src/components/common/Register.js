import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [shopname, setShopname] = useState("");
  const [openingtime, setOpeningtime] = useState("");
  const [closingtime, setClosingtime] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const onChangeShopname = (event) => {
    setShopname(event.target.value);
  };

  const onChangeOpennigtime = (event) => {
    setOpeningtime(event.target.value);
  };

  const onChangeClosingtime = (event) => {
    setClosingtime(event.target.value);
  };

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setContact("");
    setAge("");
    setBatch("");
    setShopname("");
    setOpeningtime("");
    setClosingtime("");
    setPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      contact: contact,
      age: age,
      batch: batch,
      shopname: shopname,
      openingtime: openingtime,
      closingtime: closingtime,
      type: type,
      password: password,
    };

    // console.log(newUser)

    axios
      .post("http://localhost:4000/user/register", newUser)
      .then((response) => {
        alert(response.data)
        console.log(response.data);
      });
    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ maxWidth: 500 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Occupation"
              onChange={onChangeType}
            >
              <MenuItem value="user">Student</MenuItem>
              <MenuItem value="vendor">Vendor</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12}></Grid>
      {type === "user" &&
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={onChangeUsername}
            />
          </Grid>
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
              label="Contact Number"
              variant="outlined"
              value={contact}
              onChange={onChangeContact}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              variant="outlined"
              value={age}
              onChange={onChangeAge}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl size="large" style={{ width: 235, align: 'center' }}>
              <InputLabel id="select-Batch" >Batch</InputLabel>
              <Select
                labelId="select-Batch"
                id="Batch-simple-select"
                value={batch}
                label="Batch"
                onChange={onChangeBatch}
                xs={12}
              >
                <MenuItem value={"UG1"}>UG1</MenuItem>
                <MenuItem value={"UG2"}>UG2</MenuItem>
                <MenuItem value={"UG3"}>UG3</MenuItem>
                <MenuItem value={"UG4"}>UG4</MenuItem>
                <MenuItem value={"UG5"}>UG5</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Create Password"
              variant="outlined"
              value={password}
              onChange={onChangePassword}
            />
          </Grid>
        </Grid>
      }
      {type === "vendor" &&
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Manager's Name"
              variant="outlined"
              value={name}
              onChange={onChangeUsername}
            />
          </Grid>
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
              label="Contact Number"
              variant="outlined"
              value={contact}
              onChange={onChangeContact}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Shop Name"
              variant="outlined"
              value={shopname}
              onChange={onChangeShopname}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Opening Time"
              variant="outlined"
              value={openingtime}
              onChange={onChangeOpennigtime}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Closing Time"
              variant="outlined"
              value={closingtime}
              onChange={onChangeClosingtime}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Create Password"
              variant="outlined"
              value={password}
              onChange={onChangePassword}
            />
          </Grid>
        </Grid>
      }
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;
