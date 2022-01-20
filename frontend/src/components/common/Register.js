import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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

  const onChangeOpeningtime = (event) => {
    setOpeningtime(event.target.value);
  };

  const onChangeClosingtime = (event) => {
    setClosingtime(event.target.value);
  };

  const onChangeType = (event) => {
    setType(event.target.value);
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
    setType("");
  };

  const onSubmitStudent = (event) => {
    event.preventDefault();

    const newUserStudent = {
      name: name,
      email: email,
      contact: contact,
      age: age,
      batch: batch,
      shopname: shopname,
      openingtime: openingtime,
      closingtime: closingtime,
      type: type
    };

    axios
      .post("http://localhost:4000/user/register", newUserStudent)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });
    }

    const onSubmitVendor = (event) => {
      event.preventDefault();
    const newUserVendor = {
      name: name,
      email: email,
      contact: contact,
      age: age,
      batch: batch,
      shopname: shopname,
      openingtime: openingtime,
      closingtime: closingtime,
      type: type
    };

    axios
      .post("http://localhost:4000/user/register", newUserVendor)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });
    

    resetInputs();
  };

  return (
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
        <form>
          <label>Type</label>
          <select name="type" id="dropdown" onChange={onChangeType} >
            <option value="STUDENT">STUDENT</option>
            <option value="VENDOR">VENDOR</option>
          </select>
        </form>
      </Grid>
      {type ==="STUDENT" &&
        <Grid container align={"center"} spacing={2}><Grid item xs={12}>
          <TextField
            label="Age"
            variant="outlined"
            value={age}
            onChange={onChangeAge} />
        </Grid><Grid item xs={12}>
            <TextField
              label="Batch"
              variant="outlined"
              value={batch}
              onChange={onChangeBatch} />
          </Grid>
          <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmitStudent}>
          Register
        </Button>
      </Grid></Grid>
      }
      {type ==="VENDOR" &&
       <Grid container align={"center"} spacing={2}><Grid item xs={12}>
        <TextField
          label="Shop Name"
          variant="outlined"
          value={shopname}
          onChange={onChangeShopname} />
      </Grid><Grid item xs={12}>
        <TextField
          label="Opening Time"
          variant="outlined"
          value={openingtime}
          onChange={onChangeOpeningtime}
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
        <Button variant="contained" onClick={onSubmitVendor}>
          Register
        </Button>
      </Grid></Grid>
}
      
    </Grid>
  );
};

export default Register;