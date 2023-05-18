import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  // Styles...
}));

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/flyUsers/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const { token, user } = await response.json();
        console.log(token, user);
        localStorage.setItem("token", JSON.stringify(token));

        // Redirect the user based on their role
        if (user.role === "S") {
          localStorage.setItem("supplierUser", JSON.stringify(user));
          history.push("/supplierForm");
        } else if (user.role === "C") {
          localStorage.setItem("courierUser", JSON.stringify(user));
          history.push("/courierForm");
        } else if (user.role === "M") {
          localStorage.setItem("managerUser", JSON.stringify(user));
          history.push("/managerForm");
        }
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
    >
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color="primary" variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Button
          component={Link}
          to="/registrationForm"
          color="primary"
          variant="contained"
        >
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
