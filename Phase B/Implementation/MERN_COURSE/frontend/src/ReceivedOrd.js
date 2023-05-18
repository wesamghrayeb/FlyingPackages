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
  console.log("new");
  useEffect(() => {
    // Fetch the received orders data (pending orders for this courier)
    axios
      .get(
        "http://localhost:3000/api/v1/flyOrders/get/courierOrders/all/" +
          courierObj._id
      )
      .then((response) => {
        setOrders(response.data);
        console.log(orders);
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
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleTakeOrder = async (order) => {
    // Handle taking an order here
    console.log("Taking order:", order._id);
    await axios
      .put(
        "http://localhost:3000/api/v1/flyOrders/updateStatus/IN DELIVERY/" +
          order._id
      )
      .then((response) => {
        console.log(response.data);
        alert("You are taking the order: " + order._id);
        // axios
        // .put("http://localhost:3000/api/v1/Couriers/updateStatus/" + order.courier,{
        //   availablityStatus: "Busy"
        // })
        //   .then((response) => {
        //     // Handle the response
        //     console.log(response.data);
        //   })
        //   .catch((error) => {
        //     // Handle the error
        //     console.error(error);
        //   });
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

  const handleCompleteDelivery = async (order) => {
    // Handle completing the delivery of the current order here
    const dateString = order.submitDate;
    const dateParts = dateString.split("/");
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    const date = new Date(year, month - 1, day);
    const monthName = date.toLocaleString("en-US", { month: "long" });
    console.log("Completing delivery of order:", order._id);
    await axios
      .put(
        "http://localhost:3000/api/v1/flyOrders/updateStatus/DELIVERED/" +
          order._id
      )
      .then((response) => {
        console.log(response.data);
        alert("Order " + order._id + " has been delivered!");
        setCurrentOrder(null); // Set the current order to null to indicate that it has been completed
        axios
          .post("http://localhost:3000/api/v1/bills", {
            supplier: order.supplier,
            month: monthName,
          })
          .then((response) => {
            // Handle the response
            console.log(response.data);
          })
          .catch((error) => {
            // Handle the error
            console.error(error);
          });
          // axios
          // .put("http://localhost:3000/api/v1/Couriers/updateStatus/" + order.courier,{
          //   availablityStatus: "Available"

          // })
          // .then((response) => {
          //   // Handle the response
          //   console.log(response.data);
          // })
          // .catch((error) => {
          //   // Handle the error
          //   console.error(error);
          // });
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
          <button onClick={() => handleCompleteDelivery(currentOrder)}>
            Complete Delivery
          </button>
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
                  onClick={() => handleTakeOrder(order)}
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
