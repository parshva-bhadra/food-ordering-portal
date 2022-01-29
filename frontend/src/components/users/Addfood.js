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

const Addfood = (props) => {

    const vendor_id_local = localStorage.getItem("id");

    const [itemname, setItemname] = useState("");
    const [price, setPrice] = useState("");
    const [vendor_id, setVendor_id] = useState("");
    const [rating, setRating] = useState("");
    const [no_of_users, setNo_of_users] = useState("");
    const [type, setType] = useState("");
    const [temp1, setTemp1] = useState("");
    const [temp2, setTemp2] = useState("");
    const [temp3, setTemp3] = useState("");

    const [addons, setAddons] = useState([]);
    const [tags, setTags] = useState([]);

    const onChangeItemname = (event) => {
        setItemname(event.target.value);
    };

    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };;

    const onChangeType = (event) => {
        setType(event.target.value);
    };

    const onChangeAddons = (event) => {
        setAddons(event.target.value);
    };

    const onChangeTemp1 = (event) => {
        setTemp1(event.target.value);
    };

    const onChangeTemp2 = (event) => {
        setTemp2(event.target.value);
    };

    const onChangeTemp3 = (event) => {
        setTemp3(event.target.value);
    };

    const addAddon = () => {
        const temp = {
            addon: temp2,
            price: temp3
        }
        addons.push(temp);
        setTemp2("");
        setTemp3("");
    }

    const addTags = () => {
        tags.push(temp1);
        setTemp1("");
    };

    const resetInputs = () => {
        setItemname("");
        setPrice("");
        setType("");
        setTemp1("");
        setTemp2("");
        setTemp3("");
        setTags("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newFood = {
            itemname: itemname,
            price: price,
            vendor_id: vendor_id_local,
            type: type,
            addons: addons,
            tags: tags,
        };

        console.log(newFood)

        axios
            .post("http://localhost:4000/food/add", newFood)
            .then((response) => {
                alert(response.data)
                console.log(response.data);
            });

        resetInputs();
    };

    return (
        <div>
            <br />
            <br />
            <Grid container align={"center"} spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Item Name"
                        variant="outlined"
                        value={itemname}
                        onChange={onChangeItemname}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Price"
                        variant="outlined"
                        value={price}
                        onChange={onChangePrice}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl size="large" style={{ width: 235, align: 'center' }}>
                        <InputLabel id="select-Batch" >Type</InputLabel>
                        <Select
                            labelId="select-Batch"
                            id="Batch-simple-select"
                            value={type}
                            label="Batch"
                            onChange={onChangeType}
                            xs={12}
                        >
                            <MenuItem value={true}>Veg</MenuItem>
                            <MenuItem value={false}>Non-Veg</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Tags"
                        variant="outlined"
                        value={temp1}
                        onChange={onChangeTemp1}
                    /></Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={addTags}>
                        Add Tag
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Add on"
                        variant="outlined"
                        value={temp2}
                        onChange={onChangeTemp2}
                    /></Grid>
                <Grid item xs={12} >
                    <TextField
                        label="Add on Price"
                        variant="outlined"
                        value={temp3}
                        onChange={onChangeTemp3}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={addAddon}>
                        Update Add on
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmit}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Addfood;
