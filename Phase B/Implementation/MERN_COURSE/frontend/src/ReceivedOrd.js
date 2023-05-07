import React, { useState, useEffect } from "react";
import axios from 'axios';

function ReceivedOrders() {
  const [orders, setOrders] = useState([]);
  let courierObj;
  let thisCourier = localStorage.getItem("courier");
  if (thisCourier !== null) {
    courierObj = JSON.parse(thisCourier)
  }
  useEffect(() => {
    // Fetch the received orders data
    axios.get("http://localhost:3000/api/v1/flyOrders/get/courierOrders/"+ courierObj._id)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Received Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order Num</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderNumber}>
              <td>{order.orderNumber}</td>
              <td>{order.origin.name}</td>
              <td>{order.destination.name}</td>
              <td>{order.submitDate +' '+order.submitHour}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReceivedOrders;