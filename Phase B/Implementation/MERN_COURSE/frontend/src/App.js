import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home1';
import snwnw from './snwnw';
import Header from './components/header';
import RegistrationForm from './components/registrationForm'
import supplierForm from './supplierForm';
import courierForm from './courierForm';
import supplierRegister from './supplierRegister'
import courierRegister from './courierRegister'
import editOrder from './editOrder';
import newOrder from './newOrder'
import payments from './payments'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/snwnw" component={snwnw} />
        <Route exact path="/header" component={Header} />
        <Route exact path="/registrationForm" component={RegistrationForm} />
        <Route exact path="/supplierRegister" component={supplierRegister} />
        <Route exact path="/courierRegister" component={courierRegister} />
        <Route exact path="/supplierForm" component={supplierForm} />
        <Route exact path="/supplierForm/editOrder" component={editOrder} />
        <Route exact path="/supplierForm/newOrder" component={newOrder} />
        <Route exact path="/supplierForm/payments" component={payments} />
        <Route exact path="/courierForm" component={courierForm} />

      </Switch>
    </Router>
  );
}

export default App;







// import React, { useEffect, useState } from "react";
// import Axios from "axios";


// const App = () => {
//   const [data, setData] = useState();

//   const getData = ()=> {
//     console.log("sanawnaw");
//     Axios.get("http://localhost:3000/api/v1/users/get/count").then(response => {
//       console.log(response);
//       return (JSON.parse(response.data))
//     }).then(jsonRes=>{
//       setData(jsonRes.userCount);
//     }).catch(error=>{
//       console.log(error);
//     })
//   }

//   useEffect(() => {
//     getData()
//   }, []);

//   return (
//   <div>{data}</div>
//   )
// }


// export default App;