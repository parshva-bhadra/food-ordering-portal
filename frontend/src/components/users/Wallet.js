import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as React from 'react';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Wallet = (props) => {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [wallet, setWallet] = useState("");
  
  let navigate = useNavigate();

  const onChangeWallet = (event) => {
    setWallet(event.target.value);
  };
  
  const email_id = localStorage.getItem("email");
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
          setId(response.data._id);
          setName(response.data.name);
          setEmail(response.data.email);
          setContact(response.data.contact);
          setAge(response.data.age);
          setBatch(response.data.batch);
          setPassword(response.data.password);
          setType(response.data.type);
          setType(response.data.type);
          setWallet(response.data.wallet);
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
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Amount"
          variant="outlined"
          value={wallet}
          onChange={onChangeWallet}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Update
        </Button>
      </Grid>
    </Grid>
  );
};

export default Wallet
