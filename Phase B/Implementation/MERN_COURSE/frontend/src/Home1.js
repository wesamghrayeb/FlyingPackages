import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Email, Phone } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  MenuItem,
  Menu,
  ListItemIcon,
  IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import zIndex from '@material-ui/core/styles/zIndex';



const useStyles = makeStyles((theme) => ({
  menuButton: {
    zIndex: 9999,
    marginRight: theme.spacing(0.5),
    color: 'red',
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
      '& .MuiListItemIcon-root': {
        color: theme.palette.primary.main,
      },
    },
  },
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
  cardContent: {
    flexGrow: 1,
  },
  button: {
    marginTop: theme.spacing(4),
  },
  courierGrid: {
    position: 'relative', // Add this line
  },
  icon: {
    color: 'rgb(10,248,255)',
  }
}));

function Home() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const open = Boolean(anchorEl);
  
  const handleAboutUsClick = () => {
    document.querySelector("#aboutUsSection").scrollIntoView({ behavior: 'smooth' });
    setAnchorEl(null);
  };
  
  const handleContactUsClick = () => {
    document.querySelector("#contactUsSection").scrollIntoView({ behavior: 'smooth' });
    setAnchorEl(null);
  };
  
  return (
    <div className={classes.root}>
      <IconButton
        aria-label="menu"
        aria-controls="menu"
        aria-haspopup="false"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => window.scrollTo(0, aboutRef.current.offsetTop)} color="inherit" variant="body2">
          About Us
        </MenuItem>
        <MenuItem onClick={() => window.scrollTo(0, contactRef.current.offsetTop)} color="inherit" variant="body2">
          Contact Us
        </MenuItem>
      </Menu>
  
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h3" align="center" gutterBottom>
              Welcome to the Fly Package Site
            </Typography>
            <Typography variant="subtitle1" align="center" paragraph>
              Here you can find the nearest available courier to take your orders to your customers.
            </Typography>
            <Button component={Link} to="/login" color="primary" variant="contained">
              LogIn or SignUp
            </Button>
          </Grid>
        </Grid>
  
        <Grid container spacing={1} className={classes.courierGrid}>
          <Grid item xs={50} sm={5} md={4}> 
            <Card className={classes.card}>
              <CardActionArea component={Link} to="/registrationForm" className={classes.cardContent}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://images.pexels.com/photos/4247766/pexels-photo-4247766.jpeg?auto=compress&cs=tinysrgb&w=400"
                  title="Courier Image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Supplier? Join Us
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    If you want to have an asset in the delivery of your items join us and register to have the best assistance in the delivery management.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
  
          <Grid item xs={50} sm={5} md={4}>
            <Card className={classes.card}>
              <CardActionArea component={Link} to="/registrationForm" className={classes.cardContent}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://images.pexels.com/photos/7363098/pexels-photo-7363098.jpeg?auto=compress&cs=tinysrgb&w=400"
                  title="Courier Image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Courier? Join Us
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    If you are a good courier join our shipping team to deliver the suppliers' items in flexible work.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        </Container>
        <section ref={aboutRef}>
          <div id="aboutUsSection" className={classes.root}>
            <Container maxWidth="lg">
              <Typography variant="h4" align="center" gutterBottom>
                About Us
              </Typography>
        <Typography variant="body1" align="justify" gutterBottom>
        Fly Package is an innovative and reliable shipping service that aims to provide efficient and cost-effective solutions for your delivery needs. Our platform connects you with a vast network of couriers and suppliers to ensure that your packages reach their destination on time and in perfect condition. Whether you are a supplier looking for a delivery partner or a courier seeking flexible work, Fly Package has got you covered.
        </Typography>
      </Container>
  </div>
</section>
<section ref={contactRef}>
    <div id="contactUsSection" className={classes.root}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" align="justify" gutterBottom>
          We would love to hear from you! If you have any questions, feedback, or concerns, please feel free to contact us at
          <a href="mailto:wesamghrayeeb1@gmail.com" target="_blank" rel="noopener noreferrer">wesamghrayeeb1@gmail.com</a>
          <Phone />
              <a href="tel:+972585291291">+972-585-291-291</a>
        </Typography>
</Container>
</div>
</section>

  </div>
);
}
export default Home;


