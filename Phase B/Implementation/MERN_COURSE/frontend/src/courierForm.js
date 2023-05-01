import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';


function CourierForm() {

  let userObj;  
  let user = localStorage.getItem("user");
  if (user !== null) {
     userObj = JSON.parse(user); // to get the json syntax
  }



  return (
    <div>
      <h1>Welcome to the Courier Page, {userObj.userName}!</h1>
      <p>
        We're glad you're here. 
      </p>
    </div>
  );

}

export default CourierForm;
