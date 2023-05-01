import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';

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

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>A</Avatar>
            <Typography variant="h6">Active Users</Typography>
            <Typography variant="h4">124,867</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>O</Avatar>
            <Typography variant="h6">Online Users</Typography>
            <Typography variant="h4">12,345</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>P</Avatar>
            <Typography variant="h6">Page Views</Typography>
            <Typography variant="h4">458,702</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>S</Avatar>
            <Typography variant="h6">Sessions</Typography>
            <Typography variant="h4">6,789</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>C</Avatar>
            <Typography variant="h6">Conversions</Typography>
            <Typography variant="h4">123</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
