import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatar: {
    backgroundColor: blue[500],
    margin: '0 auto',
    marginBottom: theme.spacing(2),
  },
}));
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);
  const classes = useStyles();
  let supplierObj;
  const [list, setList] = useState([]);
  let userObj;
  let user = localStorage.getItem("supplierUser");
  if (user !== null) {
    userObj = JSON.parse(user); // to get the json syntax
  }

  useEffect(() => { // here we chain multiple requests 
    axios.get('http://localhost:3000/api/v1/Suppliers/get/' + userObj._id)//get the supplier
      .then((response) => {

        return axios.get('http://localhost:3000/api/v1/bills/get/' + response.data[0]._id + '/' +selectedMonth) //get the bill of the selected month
      })
      .then(response => {
        setList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [selectedMonth]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <div>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <p>You selected {selectedMonth}.</p>
            </div>
          </Paper>
        </Grid>
  
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>O</Avatar>
            <Typography variant="h6">Orders Done</Typography>
            {list.length > 0 && (
              <Typography variant="h4">{list[0].ordersPerMonth}</Typography>
            )}
          </Paper>
        </Grid>
  
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>P</Avatar>
            <Typography variant="h6">Price Per Order</Typography>
            <Typography variant="h4">20 ILS</Typography>
          </Paper>
        </Grid>
  
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>T</Avatar>
            <Typography variant="h6">Total Price</Typography>
            {list.length > 0 && (
              <Typography variant="h4">{list[0].ordersPerMonth * 20 + ' ILS'}</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
