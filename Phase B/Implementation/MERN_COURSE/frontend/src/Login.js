import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let success = false;
  const classes = useStyles();
  const history = useHistory();



  const handleLogin = async () => {// fetching a login post
    let dataJson = {};
    const result = fetch('http://localhost:3000/api/v1/flyUsers/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "email": email,
                             "password": password }),
      }).then(response => response.json())
      .then(json=>{
        dataJson = json
        const userRole= dataJson.role;
        localStorage.setItem("user", JSON.stringify(dataJson))
        userRole==='S'? history.push({pathname: '/supplierForm', state: dataJson}) : history.push({pathname: '/courierForm', state: dataJson})
      })
      .catch(function(error){
        alert('Login failed!');
      });
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button color="primary" variant="contained" onClick={handleLogin}>Login</Button>
          <Button component={Link} to="/registrationForm" color="primary" variant="contained">
            SignUp
          </Button>
          <Button component={Link} to="/" color="primary" variant="contained">
            Home Page
          </Button>
        </form>
      </div>
    );
  }

export default Login;