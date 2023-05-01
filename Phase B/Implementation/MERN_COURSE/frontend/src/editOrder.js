import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrdersTable.css'; // Import CSS file for styling
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function EditOrder() {
  let supplierObj;
  const [orders, setOrders] = useState([]);
  let userObj;
  let user = localStorage.getItem("user");
  if (user !== null) {
    userObj = JSON.parse(user); // to get the json syntax
  }

  useEffect(() => { // here we chain multiple requests 
    axios.get('http://localhost:3000/api/v1/Suppliers/get/' + userObj._id)//get the supplier
      .then((response) => {
        return axios.get('http://localhost:3000/api/v1/flyOrders/get/' + response.data[0]._id) //get the orders
      })
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleHourChange = (event, orderId) => {
    const newOrders = orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          submitHour: event.target.value
        };
      }
      return order;
    });
    setOrders(newOrders);
  };

  const handleDateChange = (event, orderId) => {
    const newOrders = orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          submitDate: event.target.value
        };
      }
      return order;
    });
    setOrders(newOrders);
  };

  const handleEdit = (orderId) => {
    const orderToUpdate = orders.find(order => order.id === orderId);
    axios.put(`http://localhost:3000/api/v1/flyOrders/update/${orderId}`, orderToUpdate)
      .then(response => {
        console.log(response);
        alert("the changes saved successfully")
      })
      .catch(error => {
        console.log(error);
        alert(error)
      });
  };

  return (
    <div className="supplier-form">
      <div className="orders-table">
        <h1>Welcome, Supplier {userObj.userName} ! </h1>
        <h2>Last Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order Num</th>
              <th>Hour</th>
              <th>Date</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td><input type="text" value={order.submitHour} onChange={(event) => handleHourChange(event, order.id)} /></td>
                <td><input type="text" value={order.submitDate} onChange={(event) => handleDateChange(event, order.id)} /></td>
                <td>{order.status}</td>
                <td><Button onClick={() => handleEdit(order.id)}>Click to save</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="buttons-section">
      <Button component={Link} to="/supplierForm" color="primary" variant="contained">
          Back
          </Button>
      </div>
    </div>
  );
}

export default EditOrder;
