import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function CourierForm() {
  let userObj;
  let courierObj
  let thisCourier;
  let user = localStorage.getItem("user");
  if (user !== null) {
    userObj = JSON.parse(user); // to get the json syntax
  }
  console.log(userObj)

  const [status, setStatus] = useState(" ");

  const [ordersCount, setOrdersCount] = useState(3); // initial value for example
  axios
  .get("http://localhost:3000/api/v1/Couriers/get/" + userObj._id)
  .then((response) => {

    localStorage.setItem("courier", JSON.stringify(response.data[0]));
    thisCourier = localStorage.getItem("courier");
    if (thisCourier !== null) {
      courierObj = JSON.parse(thisCourier)
    }
    console.log(courierObj)
    setStatus(courierObj.availablityStatus);
    return axios.get(
      "http://localhost:3000/api/v1/flyOrders/get/countThePending/" +
        response.data[0]._id
    );
  })
  .then((response) => {
    setOrdersCount(response.data.orderCount);
  })
  .catch((error) => {
    console.log(error);
  });


  let handleChangeStatus = async (e) => {
    console.log(e.target.value)
    setStatus(e.target.value);
    try {
      const response = await fetch('http://localhost:3000/api/v1/Couriers/updateStatus/'+courierObj._id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "availablityStatus": e.target.value}),
      });
      console.log(response);
      alert("the changes saved successfully");
      const updatedCourier = await response.json();
      localStorage.setItem("courier", JSON.stringify(updatedCourier));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const handleReceivedOrders = () => {
    // handle received orders button click here
    window.location.href = "/courierForm/ReceivedOrders";

  };

  const history = useHistory();

  const handleGoBack = () => {
    history.push("/login");
  };

  return (
    <div>
      <h1>
        Welcome to the Courier Page, {userObj.userName}!
        <br />
        STATUS: {status}
      </h1>
      <p>We're glad you're here.</p>
      <button onClick={handleReceivedOrders}>
        <i className="fa fa-bell" />
        {ordersCount > -1 && <span>{ordersCount} Received Orders - My orders</span>}
      </button>
      <select value={status} onChange={handleChangeStatus}>
        <option value="Available">Available</option>
        <option value="Busy">Busy</option>
      </select>
      <button onClick={handleGoBack}>LogOut</button>

    </div>
  );
}

export default CourierForm;
