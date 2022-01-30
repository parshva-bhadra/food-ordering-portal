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
const Vendordashboard = (props) => {

    let navigate = useNavigate();
    const vendor_id_local = localStorage.getItem("id");

    const [order, setOrder] = useState([]);

    // const [users, setUsers] = useState([]);
    // const [sortedUsers, setSortedUsers] = useState([]);
    // const [sortName, setSortName] = useState(true);
    // const [searchText, setSearchText] = useState("");

    useEffect(() => {

        if (vendor_id_local == null) {
            navigate("/login");
        }

        const Vendor = {
            vendor_id: vendor_id_local,
        };

        axios
            .get("http://localhost:4000/order/vendor/" + vendor_id_local)

            .then((response) => {
                console.log(response.data);
                setOrder(response.data);
            })

            .catch((err) => { console.log(err); });
    }, []);

    const Stage = ["PLACED", "ACCEPTED", "COOKING", "READY FOR PICKUP", "COMPLETED", "REJECTED", "CANCELLED"];

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

    const moveToNextStage = (id, status) => {

        let i = 0;

        while (Stage[i] != status) {
            i++;
        }


        var orders_pending = 0;
        order.map(order => {
            if (order.current_status == "ACCEPTED" || order.current_status == "COOKING") {
                orders_pending += 1;
            }
        });

        if (Stage[i] == "PLACED" && orders_pending > 10) {
            alert("Ten orders pending! Try again after completing some orders!");
        }
        else {
            i++;
            console.log(i);

            const New_status = {
                status: Stage[i]
            }

            axios.post('http://localhost:4000/order/vendor/update/' + id, New_status);

            window.location.reload();
        }
    };

    const Reject = (id, status) => {
        if (status == "PLACED") {
            axios.post('http://localhost:4000/order/vendor/reject/' + id);
            window.location.reload();
        }
    };

    // return (
    // <div>
    {/* <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                            <h1>Filters</h1>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
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
                        // onChange={customFunction}
                        />
                    </List>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem>
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
                        </ListItem>
                        <Divider />
                        <ListItem divider>
                            <Autocomplete
                                id="combo-box-demo"
                                options={users}
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
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell> Sr No.</TableCell>
                                    <TableCell>
                                        {" "}
                                        <Button onClick={sortChange}>
                                            {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                        </Button>
                                        Date
                                    </TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{ind}</TableCell>
                                        <TableCell>{user.date}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid> */}
    {/* </div> */ }
    // );
    return (<div>

        <Grid item xs={12}>
            <Paper>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name of Item</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Add Ons</TableCell>
                            <TableCell>Ordered At</TableCell>
                            <TableCell>Stage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.map((order, ind) => (
                            <TableRow key={ind}>
                                <TableCell>{order.itemname}</TableCell>
                                <TableCell>{order.quantity}</TableCell>
                                <TableCell>{order.addons.map((current_object, i) => {
                                    return <li key={i}>{current_object.addon}, price:{current_object.price}</li>
                                })}</TableCell>
                                <TableCell>{order.createdAt}</TableCell>
                                <TableCell>{order.current_status}</TableCell>
                                <TableCell>
                                    {order.current_status != "REJECTED" && order.current_status != "CANCELLED" && order.current_status != "READY FOR PICKUP" && order.current_status != "COMPLETED" &&
                                        <Grid item xs={12}>
                                            <Button variant="outlined" onClick={() => { moveToNextStage(order._id, order.current_status) }}>
                                                Move to Next Stage
                                            </Button>
                                        </Grid>
                                    }</TableCell>
                                <TableCell>
                                    {order.current_status == "PLACED" &&
                                        <Grid item xs={12}>
                                            <Button variant="outlined" onClick={() => { Reject(order._id, order.current_status) }}>
                                                Reject
                                            </Button>
                                        </Grid>
                                    }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Grid>
    </div>
    );
};

export default Vendordashboard;
