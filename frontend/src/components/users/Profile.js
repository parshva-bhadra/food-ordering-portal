import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";

const Profile = (props) => {
  let navigate = useNavigate();
  const email_id = localStorage.getItem("email");
  
  const [id, setId] = useState("");
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
  const [wallet, setWallet] = useState("");

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

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {

    if (email_id == null) {
      navigate("/login")
    }

    const User = {
      email: email_id,
    };

    axios
      .post("http://localhost:4000/user/profile", User)
      .then((response) => {
        console.log(response.data)
        if (response.data.type == "user") {
          setId(response.data._id);
          setName(response.data.name);
          setEmail(response.data.email);
          setContact(response.data.contact);
          setAge(response.data.age);
          setBatch(response.data.batch);
          setPassword(response.data.password);
          setType(response.data.type);
          setWallet(response.data.wallet);
        }
        if (response.data.type == "vendor") {
          setId(response.data._id);
          setName(response.data.name);
          setEmail(response.data.email);
          setContact(response.data.contact);
          setShopname(response.data.shopname);
          setOpeningtime(response.data.openingtime);
          setClosingtime(response.data.closingtime);
          setPassword(response.data.password);
          setType(response.data.type);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
      wallet: wallet,
    };

    axios
      .post("http://localhost:4000/user/update/" + id, newUser)
      .then((response) => {
        alert("Updated!" + response.data.name)
        console.log(response.data);
      })
      .catch(err => {console.log(err);})
  };
  
  return (
    <div>
      <br />
      <br />
    <Grid container align={"center"} spacing={2}>
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
          Update
        </Button>
      </Grid>

    </Grid>
    </div>
  );
};

export default Profile;
