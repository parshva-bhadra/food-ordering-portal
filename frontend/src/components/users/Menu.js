import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { grid } from "@mui/system";


const Menu = (props) => {

  const vendor_id_local = localStorage.getItem("id");

  const [food, setFood] = useState([]);
  const [itemname, setItemname] = useState("");
  const [price, setPrice] = useState("");
  const [vendor_id, setVendor_id] = useState("");
  const [rating, setRating] = useState("");
  const [no_of_users, setNo_of_users] = useState("");
  const [type, setType] = useState("");
  const [addons, setAddons] = useState("");
  const [tags, setTags] = useState("");
  const [id, setId] = useState("");

  let navigate = useNavigate();

  const onChangeItemname = (event) => {
    setItemname(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  const onChangeAddons = (event) => {
    setAddons(event.target.value);
  };

  const onChangeTags = (event) => {
    setTags(event.target.value);
  };

  const email_id = localStorage.getItem("email");

  useEffect(() => {

    if (email_id == null) {
      navigate("/login")
    }

    axios
      .post("http://localhost:4000/food")
      .then((response) => {
        console.log(response.data)
        setFood(response.data)
      })
      .catch((err) => { console.log(err); });
  }, []);

  const onDelete = (id) => {
    axios.delete('http://localhost:4000/food/delete/'+id)
      .then(response => { 
        console.log(response.data);
      });
      setFood(food.filter(el => el._id !== id));
  };

  const onUpdate = (id) => {
    navigate("/profile/edit/" + id)
  };
  
  return (
    <div>

      <Grid item xs={12}>
        <Paper>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell> Sr No.</TableCell>
                <TableCell>Name of Item</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Veg</TableCell>
                <TableCell>Add ons</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {food.map((food, ind) => (
                <TableRow key={ind}>
                  {food.vendor_id == vendor_id_local && <>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{food.itemname}</TableCell>
                    <TableCell>{food.price}</TableCell>
                    <TableCell>{food.rating}</TableCell>
                    <TableCell>{String(food.type)}</TableCell>
                    <TableCell>{food.addons.map((current_object, i) => {
                      return <li key={i}>{current_object.addon}, price:{current_object.price}</li>
                    })}</TableCell>
                    <TableCell>{food.tags.map((current_tag, i) => {
                      return <li key={i}>{current_tag}</li>
                    })}</TableCell>
                    <TableCell>
                      <Grid item xs={12}>
                        <Button variant="outlined" onClick={  () => {onDelete(food._id)}  }>
                          Delete
                        </Button>
                      </Grid></TableCell>
                    <TableCell><Grid item xs={12}>
                      <Button variant="outlined" onClick={  () => {onUpdate(food._id)}  }>
                        Update
                      </Button>
                    </Grid>
                    </TableCell>

                  </>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </div>
    // <Grid container align={"center"} spacing={2}>
    //     <Grid item xs={12}>
    //         <TextField
    //             label="Amount"
    //             variant="outlined"
    //             value={wallet}
    //             onChange={onChangeWallet}
    //         />
    //     </Grid>
    //     <Grid item xs={12}>
    //         <Button variant="contained" onClick={onSubmit}>
    //             Update
    //         </Button>
    //     </Grid>
    // </Grid>
  );
};

export default Menu
