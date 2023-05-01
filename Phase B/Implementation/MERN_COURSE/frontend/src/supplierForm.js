
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrdersTable.css'; // Import CSS file for styling
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function SupplierForm() {
  let supplierObj;  
  const [orders, setOrders] = useState([]);
    let userObj;  
    let user = localStorage.getItem("user");
    if (user !== null) {
       userObj = JSON.parse(user); // to get the json syntax
    }

  useEffect(() => { // here we chain multiple requests 
    axios.get('http://localhost:3000/api/v1/Suppliers/get/'+userObj._id)//get the supplier
    .then((response)=>{
      localStorage.setItem("supplier", JSON.stringify(response.data[0]))
      return axios.get('http://localhost:3000/api/v1/flyOrders/get/'+response.data[0]._id) //get the orders
    })
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="supplier-form">
      <h1>Welcome, Supplier {userObj.userName}!</h1>
      <div className="orders-table">
        <h2>Last Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order Num</th>
              <th>Courier</th>
              <th>Destination</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.courier.user.userName}</td>
                <td>{order.destination.name}</td>
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
          New Order
        </Button>
        <Button
          component={Link}
          to="/supplierForm/editOrder"
          color="primary"
          variant="contained"
          style={{ marginBottom: '8px' }}
        >
          Edit Order
        </Button>
        <Button
          component={Link}
          to="/supplierForm/payments"
          color="primary"
          variant="contained"
          style={{ marginBottom: '16px' }}
        >
          Monthly Bill Payments
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

export default SupplierForm;
