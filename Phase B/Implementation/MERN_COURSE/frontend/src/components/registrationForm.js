import React, {useState,setState} from 'react';
import './style.css'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';



function RegistrationForm() {
    
    const [idNum, setIdNum] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [phone, setPhone] = useState(null);
    const [role, setRole] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "idNum"){
          setIdNum(value);
        }
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }
        if(id === "phone"){
          setPhone(value);
        }
        if(id === "role"){
          setRole(value);
        }

    }

    const handleSubmit = async () => {
        let dataJson = {};
        if (!idNum || !firstName || !lastName || !email || !password || !confirmPassword || !phone || !role) {
          alert('Please fill in all fields.');
          return;
        }
        if (password !== confirmPassword) {
          alert('Passwords do not match.');
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          alert('Invalid email address.');
          return;
        }
        console.log("fetching")
        const response = await fetch('http://localhost:3000/api/v1/flyUsers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({    
          "id": idNum,
          "email": email,
          "userName": firstName,
          "password": password,
          "phone": phone,
          "isAdmin": "false",
          "role": role
        }),
        }).then(response => response.json())
        .then(json =>{
          dataJson = json
          const userRole= dataJson.role;
          localStorage.setItem("user", JSON.stringify(dataJson))
          alert('registration done press to continue')
        })
        .catch(function(error){
          alert('registration failed')
        })
    };

    return(
<div className="form">
  <h1>Registiration Form</h1>
<p>Fisrt fill the fields then hit the register button, after that hit supplier or courier</p>
  <div className="form-body">
  <div className="ID" style={{ marginBottom: '5px' }}>
      <label className="form__label" htmlFor="id">ID Number </label>
      <input className="form__input" type="text" value={idNum} onChange={(e) => handleInputChange(e)} id="idNum" placeholder="ID" />
    </div>
    <div className="username" style={{ marginBottom: '5px' }}>
      <label className="form__label" htmlFor="firstName">First Name </label>
      <input className="form__input" type="text" value={firstName} onChange={(e) => handleInputChange(e)} id="firstName" placeholder="First Name" />
    </div>
    <div className="lastname" style={{ marginBottom: '5px' }}>
      <label className="form__label" htmlFor="lastName">Last Name </label>
      <input type="text" name="" id="lastName" value={lastName} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="Last Name" />
    </div>
    <div className="email" style={{ marginBottom: '5px' }}>
      <label className="form__label" htmlFor="email">Email </label>
      <input type="email" id="email" className="form__input" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
    </div>
    <div className="password" style={{ marginBottom: '5px' }}>
      <label className="form__label" htmlFor="password">Password </label>
      <input className="form__input" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="Password" />
    </div>
    <div className="confirm-password" style={{ marginBottom: '5px' }}>
      <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
      <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => handleInputChange(e)} placeholder="Confirm Password" />
    </div>
    <div className="phone" style={{ marginBottom: '5px' }}>
      <label className="form__label" htmlFor="phone">Phone </label>
      <input type="text" name="" id="phone" value={phone} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="Phone" />
    </div>
    <div className="role" style={{ marginBottom: '5px' }}>
  <label className="form__label" htmlFor="role">Role:</label>
  <label className="form__label">
    <input type="checkbox" id="role" value="S" checked={role === 'S'} onChange={(e) => handleInputChange(e)} />
    S
  </label>
  <label className="form__label">
    <input type="checkbox" id="role" value="C" checked={role === 'C'} onChange={(e) => handleInputChange(e)} />
    C
  </label>
</div>

  </div>
  <div className="footer">
    <button onClick={() => handleSubmit()} type="submit" className="btn">Register</button>
  </div>
  <Button component={Link} to="/login" color="primary" variant="contained">
    Back to LogIn
  </Button>
  <Button component={Link} to="/supplierRegister" color="primary" variant="contained">
    S as a supplier
      </Button>
      <Button component={Link} to="/courierRegister" color="primary" variant="contained">
    C as a courier
      </Button>
</div>
    )
          
}

export default RegistrationForm