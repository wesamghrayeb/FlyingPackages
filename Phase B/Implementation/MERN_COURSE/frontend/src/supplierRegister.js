import React, {useState,setState} from 'react';
import './components/style.css'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';



function SupplierRegister() {
    
    const [company, setCompany] = useState(null);

    const [creditCard,setCreditCard] = useState(null);
    const [expirationDate,setExpirationDate] = useState(null);
    const [cvv, setCvv] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "company"){
            setCompany(value);
        }

        if(id === "creditCard"){
            setCreditCard(value);
        }
        if(id === "expirationDate"){
            setExpirationDate(value);
        }
        if(id === "cvv"){
            setCvv(value);
        }

    }


    const handleSubmit = async () => {
        let dataJson = {};
        let userObj;  
        let user = localStorage.getItem("user");
        if (user !== null) {
           userObj = JSON.parse(user); // to get the json syntax
        }
        console.log("fetching")
        const response = await fetch('http://localhost:3000/api/v1/Suppliers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({    
          "ordersNo": 0,
          "registirationDate": Date.now,
          "companyName": company,
          "user": userObj,
        }),
        }).then(response => response.json())
        .then(json=>{
            alert('supplier registration done')
        })
        .catch(function(error){
          alert('registration failed')
        })
    };

    const handleSubmit2 = async () => {
        let dataJson = {};
        console.log("fetching")
        const response = await fetch('http://localhost:3000/api/v1/creditCards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({    
          "creditCardNumber": creditCard,
          "creditCardExpDate": expirationDate,
          "creditCardCVV": cvv,
        }),
        }).then(response => response.json())
        .then(json=>{
            alert('credit card saved ')
        })
        .catch(function(error){
          alert('registration failed')
        })
    };

    return(
<div className="form">
  <h1>Continue Registiration</h1>
<p>Fisrt fill the fields then hit the register button, after that hit supplier or courier</p>
  <div className="form-body">
  <div className="company" style={{ marginBottom: '5px' }}>
      <label className="form__label" htmlFor="id">company </label>
      <input className="form__input" type="text" value={company} onChange={(e) => handleInputChange(e)} id="company" placeholder="company" />
    </div>
    <div className="creditCard" style={{ marginBottom: '5px' }}>
      <label className="form__label" htmlFor="creditCard">Credit Card </label>
      <input type="text" name="" id="creditCard" value={creditCard} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="creditCard" />
    </div>
    <div className="expirationDate" style={{ marginBottom: '5px' }}>
      <label className="form__label" htmlFor="expirationDate">RExpiration Date</label>
      <input type="text" id="expirationDate" className="form__input" value={expirationDate} onChange={(e) => handleInputChange(e)} placeholder="expirationDate" />
    </div>
    <div className="cvv" style={{ marginBottom: '5px' }}>
      <label className="form__label" htmlFor="cvv">CVV </label>
      <input type="text" id="cvv" className="form__input" value={cvv} onChange={(e) => handleInputChange(e)} placeholder="cvv" />
    </div>
  </div>
  <div className="footer">
    <button onClick={() => handleSubmit()} type="submit" className="btn">Register1</button>
    <button onClick={() => handleSubmit2()} type="submit" className="btn">Register2</button>
  </div>
</div>
    )
          
}

export default SupplierRegister