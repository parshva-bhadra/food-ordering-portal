import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Userdashboard = (props) => {

    let navigate = useNavigate();
    const user_id_local = localStorage.getItem("id");

    const [order, setOrder] = useState([]);
    const [temp, setTemp] = useState("");
    const [name, setName] = useState("");

    const onChangeTemp = (event) => {
        setTemp(event.target.value);
    };
    // const [rating_value, setRating_value] = useState("");

    // const [users, setUsers] = useState([]);
    // const [sortedUsers, setSortedUsers] = useState([]);
    // const [sortName, setSortName] = useState(true);
    // const [searchText, setSearchText] = useState("");

    useEffect(() => {

        if (user_id_local == null) {
            navigate("/login");
        }

        const User = {
            user_id: user_id_local,
        };

        axios
            .get("http://localhost:4000/order/user/" + user_id_local)

            .then((response) => {
                console.log(response.data);
                setOrder(response.data);
            })

            .catch((err) => { console.log(err); });
    }, []);

    // const Stage = ["PLACED", "ACCEPTED", "COOKING", "READY FOR PICKUP", "COMPLETED", "REJECTED", "CANCELLED"];

    // const sortChange = () => {
    //     let usersTemp = users;
    //     const flag = sortName;
    //     usersTemp.sort((a, b) => {
    //         if (a.date != undefined && b.date != undefined) {
    //             return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
    //         } else {
    //             return 1;
    //         }
    //     });
    //     setUsers(usersTemp);
    //     setSortName(!sortName);
    // };

    // const Reject = (id, status) => {
    //     if (status == "PLACED") {
    //         axios.post('http://localhost:4000/order/vendor/reject/' + id);
    //         window.location.reload();
    //     }
    // };

    // var rating_variable = "INCOMPLETE"
    const Pickup = (id, status) => {
        if (status == "READY FOR PICKUP") {

            const New_status = {
                status: "COMPLETED"
            }

            axios.post('http://localhost:4000/order/user/pickup/' + id, New_status);
            window.location.reload();
        }
    };

    const Cancel = (id) => {
        axios.post('http://localhost:4000/order/user/cancel/' + id);
        // rating_variable = "COMPLETE";
        window.location.reload();
    };

    const Rate = (id) => {

        const rating_json = {
            rating: temp
        }
        console.log(temp);
        axios.post('http://localhost:4000/order/user/rate/' + id, rating_json)
            .then(res => { alert(res.data); });
        // window.location.reload();
    }

    return (<div>

        <Grid item xs={12}>
            <Paper>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ordered At</TableCell>
                            <TableCell>Vendor Name</TableCell>
                            <TableCell>Name of Item</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.map((order, ind) => (
                            <TableRow key={ind}>
                                <TableCell>{String(order.createdAt).substring(0, 10)} {String(order.createdAt).substring(11, 19)}</TableCell>
                                <TableCell>{order.vendor_name}</TableCell>
                                <TableCell>{order.itemname}</TableCell>
                                <TableCell>{order.quantity}</TableCell>
                                <TableCell>{order.current_status}</TableCell>
                                <TableCell>{order.total_price}</TableCell>
                                <TableCell>
                                    {order.current_status == "PLACED" &&
                                        <div>
                                            <Button variant="outlined" onClick={() => { Cancel(order._id) }}>
                                                Cancel
                                            </Button>
                                        </div>
                                    }
                                </TableCell>
                                <TableCell>
                                    {order.current_status == "READY FOR PICKUP" &&
                                        <div>
                                            <Button variant="outlined" onClick={() => { Pickup(order._id, order.current_status) }}>
                                                Picked Up
                                            </Button>
                                        </div>
                                    }
                                </TableCell>
                                <TableCell>
                                    {order.current_status == "COMPLETED" &&
                                        <div>
                                            <FormControl size="large" style={{ width: 235, align: 'center' }}>
                                                <InputLabel id="select-Batch" >Rating</InputLabel>
                                                <Select
                                                    labelId="select-Batch"
                                                    id="Batch-simple-select"
                                                    value={temp}
                                                    label="Batch"
                                                    onChange={onChangeTemp}
                                                    xs={12}
                                                >
                                                    <MenuItem value={1}>1</MenuItem>
                                                    <MenuItem value={2}>2</MenuItem>
                                                    <MenuItem value={3}>3</MenuItem>
                                                    <MenuItem value={4}>4</MenuItem>
                                                    <MenuItem value={5}>5</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    }
                                </TableCell>
                                <TableCell>
                                {order.current_status == "COMPLETED" &&
                                    <div>
                                        <Button variant="contained" onClick={() => { Rate(order._id, temp) }}>
                                            Submit Rating
                                        </Button>
                                    </div>
                                    }
                                    </TableCell>
                                {/* <TableCell>{order.addons.map((current_object, i) => {
                                    return <li key={i}>{current_object.addon}, price:{current_object.price}</li>
                                })}</TableCell> */}
                                {/* <TableCell>
                                    {order.current_status != "REJECTED" && order.current_status != "CANCELLED" && order.current_status != "READY FOR PICKUP" && order.current_status != "COMPLETED" &&
                                        <Grid item xs={12}>
                                            <Button variant="outlined" onClick={() => { moveToNextStage(order._id, order.current_status) }}>
                                                Move to Next Stage
                                            </Button>
                                        </Grid>
                                    }</TableCell>*/}


                                {/* {
                                    order.current_status == "COMPLETED" &&
                                    <div>
                                        abc
                                    </div>
                                } */}

                                {/* <TableCell>
                                    {order.current_status == "COMPLETED" &&
                                        <Grid item xs={12}>
                                            <Button variant="contained" onClick={() => { Rate(order._id, temp) }}>
                                                Submit Rating
                                            </Button>
                                        </Grid>
                                    }
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Grid>
    </div>
    );
};

export default Userdashboard;
