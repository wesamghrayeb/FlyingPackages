
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrdersTable.css'; // Import CSS file for styling
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function ManagerForm() {
  let supplierObj;  
  const [orders, setOrders] = useState([]);
    let userObj;  
    let user = localStorage.getItem("user");
    if (user !== null) {
       userObj = JSON.parse(user); // to get the json syntax
    }

  useEffect(() => { // here we chain multiple requests 
    axios.get('http://localhost:3000/api/v1/flyOrders/get/allOrders')//get all the orders history to show to the manager
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="manager-form">
      <h1>Welcome, Manager {userObj.userName}!</h1>
      <div className="orders-table">
        <h2>Last Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order Num</th>
              <th>Suppleir</th>
              <th>Courier</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.courier.user.userName}</td>
                <td>{order.supplier.user.userName}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="buttons-section">
        <Button
          component={Link}
          to="/supplierForm/newOrder"
          color="primary"
          variant="contained"
          style={{ marginBottom: '8px' }}
        >
          Manage Couriers
        </Button>
        <Button
          component={Link}
          to="/supplierForm/editOrder"
          color="primary"
          variant="contained"
          style={{ marginBottom: '8px' }}
        >
          Registration Requests
        </Button>
        <Button
          component={Link}
          to="/supplierForm/payments"
          color="primary"
          variant="contained"
          style={{ marginBottom: '16px' }}
        >
          Payments Reports
        </Button>
        <div style={{ textAlign: 'right' }}>
          <Button
            component={Link}
            to="/"
            color="primary"
            variant="contained"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}



export default ManagerForm;
