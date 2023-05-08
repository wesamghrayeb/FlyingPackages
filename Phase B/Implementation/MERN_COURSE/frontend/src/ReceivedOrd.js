import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ReceivedOrders() {
  const [orders, setOrders] = useState([]);
  const [ordersPend, setOrdersPend] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  let courierObj;
  let thisCourier = localStorage.getItem("courier");
  if (thisCourier !== null) {
    courierObj = JSON.parse(thisCourier);
  }
  console.log("new")
  useEffect(() => {
    // Fetch the received orders data (pending orders for this courier)
    axios
      .get(
        "http://localhost:3000/api/v1/flyOrders/get/courierOrders/all/" +
          courierObj._id
      )
      .then((response) => {
        setOrders(response.data);
        console.log(orders)
        // Check if the courier is currently taking an order
        const takingOrder = response.data.find(
          (order) =>
            order.status === "IN DELIVERY" &&
            order.courier._id === courierObj._id
        );
        if (takingOrder) {
          setCurrentOrder(takingOrder);
        }
        axios
        .get(
          "http://localhost:3000/api/v1/flyOrders/get/courierOrders/" +
            courierObj._id
        )
        .then((response) => {
          setOrdersPend(response.data);
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleTakeOrder = async (orderId) => {
    // Handle taking an order here
    console.log("Taking order:", orderId);
    await axios
      .put(
        "http://localhost:3000/api/v1/flyOrders/updateStatus/IN DELIVERY/" +
          orderId
      )
      .then((response) => {
        console.log(response.data);
        alert("You are taking the order: " + orderId);
        window.location.reload(); // Reload the page after showing the alert

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRejectOrder = async (orderId) => {
    // Handle rejecting an order here
    console.log("Rejecting order:", orderId);
    await axios
      .put(
        "http://localhost:3000/api/v1/flyOrders/updateStatus/REJECTED/" +
          orderId
      )
      .then((response) => {
        console.log(response.data);
        alert(
          "Rejected the notification sent to the supplier, Order: " + orderId
        );
        window.location.reload(); // Reload the page after showing the alert

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCompleteDelivery = async (orderId) => {
    // Handle completing the delivery of the current order here
    console.log("Completing delivery of order:", orderId);
    await axios
      .put(
        "http://localhost:3000/api/v1/flyOrders/updateStatus/DELIVERED/" +
          orderId
      )
      .then((response) => {
        console.log(response.data);
        alert("Order " + orderId + " has been delivered!");
        setCurrentOrder(null); // Set the current order to null to indicate that it has been completed
        window.location.reload(); // Reload the page after showing the alert

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const history = useHistory();

  const handleGoBack = () => {
    history.push("/courierForm");
  };

  return (
    <div>
      <h1>Received Orders</h1>
      {currentOrder && (
        <div>
          <p>
            You are currently delivering order {currentOrder.orderNumber}.
            Please complete the delivery before taking another order.
          </p>
          <button onClick={() => handleCompleteDelivery(currentOrder._id)}>Complete Delivery</button>
        </div>
      )}
      <button onClick={handleGoBack}>Go Back</button>
      <table>
        <thead>
          <tr>
            <th>Order Num</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Time</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ordersPend.map((order) => (
            <tr key={order.orderNumber}>
              <td>{order.orderNumber}</td>
              <td>{order.origin.name}</td>
              <td>{order.destination.name}</td>
              <td>{order.submitDate + " " + order.submitHour}</td>
              <td>
                <button
                  onClick={() => handleTakeOrder(order._id)}
                  disabled={currentOrder !== null}
                >
                  Take
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleRejectOrder(order._id)}
                  disabled={currentOrder !== null}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReceivedOrders;
