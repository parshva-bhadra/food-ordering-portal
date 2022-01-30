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
import Fuse from "fuse.js"

const Usermenu = (props) => {



  const user_id_local = localStorage.getItem("id");

  const [food, setFood] = useState([]);
  const [order, setOrder] = useState([]);
  const [newfood, setNewfood] = useState([]);
  const [itemname, setItemname] = useState("");
  const [price, setPrice] = useState("");
  const [vendor_id, setVendor_id] = useState("");
  const [rating, setRating] = useState("");
  const [no_of_users, setNo_of_users] = useState("");
  const [type, setType] = useState("");
  const [addons, setAddons] = useState("");
  const [tags, setTags] = useState("");
  const [id, setId] = useState("");
  const [query, updateQuery] = useState('');

  const fuse = new Fuse(food, {
    keys: [
      'itemname'
    ]
  });


  const [quantity, setQuantity] = useState(0);

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


  const resetInputs = () => {
    setAddons("");
  };


  const onChangeTags = (event) => {
    setTags(event.target.value);
  };

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const email_id = localStorage.getItem("email");

  const Search = (event) => {
    console.log(event.target.value);
    //setPrint_Food(foods.filter(ele => ele.item_name.includes(event.target.value)));
    setNewfood(food.filter(ele => ele.itemname.toLowerCase().includes(event.target.value)));
  };


  const fuzzySearch = (e) => {
    var array = fuse.search(e.target.value);
    var result = e.target.value ? array.map(current => current.item) : food;
    setNewfood(result);
  }

  useEffect(() => {

    if (email_id == null) {
      navigate("/login")
    }

    axios
      .post("http://localhost:4000/food")
      .then((response) => {
        // console.log(response.data)
        setFood(response.data)
        setNewfood(response.data)
      })
      .catch((err) => { console.log(err); });
  }, []);


  const onBuy = (id) => {
    axios.post('http://localhost:4000/food/find/' + id)
      .then(res => {
        const order_to_be_placed = {
          itemname: res.data.itemname,
          price: res.data.price,
          food_id: res.data._id,
          vendor_id: res.data.vendor_id,
          user_id: user_id_local,
          quantity: quantity,
          rating: res.data.rating,
          addons: addons,
          current_status: "PLACED",
        };
        console.log(res.data);

        axios
          .post("http://localhost:4000/order/add", order_to_be_placed)
          .then(response => {
            console.log(response.data);
            alert(res.data);
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }



  const onDelete = (id) => {
    axios.delete('http://localhost:4000/food/find/' + id)
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

      <Grid container>

        {/* filter -> */}
        {/* <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid> */}

        {/* search at top.. */}
        <Grid item xs={12}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={fuzzySearch}
            />
          </List>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={Search}
            />
          </List>
        </Grid>

      </Grid>

      <Grid container>

        {/* the things on left side of printing  */}
        {/* <Grid item xs={12} md={3} lg={3}> */}
          {/* <List component="nav" aria-label="mailbox folders"> */}

            {/* show salary min and max .... */}
            {/* <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Salary
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </ListItem> */}

            {/* <Divider /> */}

            {/* select name at bottom has Autocomplete */}
            {/* <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={food}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Names"
                    variant="outlined"
                  />
                )}
              />

            </ListItem> */}

          {/* </List>
        </Grid> */}

        {/* main list printing */}
        <Grid item xs={12} >
          <Paper>
            <Table size="small">

              {/* heading */}
              <TableHead>

                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  {/* <TableCell>
                    {" "}
                    <Button onClick={sortChange}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Date
                  </TableCell> */}
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Veg</TableCell>
                  <TableCell>Add On</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Addons</TableCell>
                  <TableCell>Buy</TableCell>
                </TableRow>

              </TableHead>

              {/* body */}
              <TableBody>
                {newfood.map((food, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    {/* <TableCell>{food.createdAt.substring(0,10)}</TableCell> */}
                    <TableCell>{food.itemname}</TableCell>
                    <TableCell>{food.price}</TableCell>
                    <TableCell>{food.rating}</TableCell>
                    <TableCell>{String(food.type)}</TableCell>

                    <TableCell>{food.addons.map((current_object, i) => {
                      return (



                        <li key={i}>
                          addon:{current_object.addon}, price:{current_object.price}
                        </li>

                      )
                    })}</TableCell>

                    <TableCell>{food.tags.map((current_tag, i) => {
                      return <li key={i}>{current_tag}</li>
                    })}</TableCell>

                    <TableCell>
                      <TextField
                        label="Quantity"
                        variant="outlined"
                        size="small"
                        value={quantity}
                        onChange={onChangeQuantity}
                      />
                    </TableCell>

                    
                    <TableCell>
                      <Box sx={{ maxWidth: 500 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Addons</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addons}
                            label="Occupation"
                            onChange={onChangeAddons}
                          >
                            {food.addons.map((current_object, i) => {
                              return <MenuItem value={current_object} key={i}>{current_object.addon}</MenuItem>
                            })}

                          </Select>
                        </FormControl>
                      </Box>

                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => onBuy(food._id)}>
                        Buy
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </Paper>
        </Grid>

      </Grid>

    </div>
  );
};

export default Usermenu
