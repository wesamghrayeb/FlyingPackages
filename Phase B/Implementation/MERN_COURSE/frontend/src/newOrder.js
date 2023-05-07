import React, { useState, setState, useEffect } from "react";
import "./components/style.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import "./OrdersTable.css"; // Import CSS file for styling
//require('dotenv/config');

export default function NewOrder() {
  const [courier, setCourier] = useState(null);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState(null);
  const [destination, setDestination] = useState(null);
  const [submitHour, setSubmitHour] = useState(null);
  const [submitDate, setSubmitDate] = useState(null);
  let longitudeGo = 0;
  let latitudeGo = 0;
  const courierDistances = [];
  const [couriers, setCouriers] = useState([]);
  let supplierObj = localStorage.getItem("supplier");
  let thisSupplier = JSON.parse(supplierObj);
  console.log(thisSupplier);
  const supplierLocation = {
    latitude: thisSupplier.location.latitude,
    longitude: thisSupplier.location.longitude,
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    console.log(courier);
    const key = process.env.API_KEY;
    const address = destination;
    let finalLocation;
    //The destination that typed by the supplier converted to latitude and longitude using the google cloud API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=AIzaSyDryedOvaoU_t3QfKLO2kRdXlvXdhZlwRo`;
    console.log(url)
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const location = data.results[0].geometry.location;
        latitudeGo = location.lat;
        longitudeGo = location.lng;
        axios.post('http://localhost:3000/api/v1/Locations', {
          latitude: latitudeGo,
          longitude: longitudeGo,
          name: destination,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          finalLocation = response.data;
          console.log(finalLocation);
          let thisCourier = couriers.find((c) => c.user.userName === courier);
          // Create a new order object
          const newOrder = {
            supplier: thisSupplier._id,
            courier: thisCourier._id,
            customerPhoneNumber: customerPhoneNumber,
            destination: finalLocation.id,
            submitHour: submitHour,
            submitDate: submitDate,
            orderNumber: Math.floor(Math.random() * 100000) + 5,
            origin: thisSupplier.location._id,
            completedDate: "15/06/2023",
          };
          // Send a POST request to the server to add the new order to the database
          axios
            .post("http://localhost:3000/api/v1/flyOrders/", newOrder)
            .then((response) => {
              console.log(response.data);
              alert("The order created, wait for approve from " + courier);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });


      })
      .catch((error) => console.log(error));

    console.log(latitudeGo);
    console.log(longitudeGo);


  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "courier") {
      setCourier(value);
    }
    if (id === "customerPhoneNumber") {
      setCustomerPhoneNumber(value);
    }
    if (id === "destination") {
      setDestination(value);
    }
    if (id === "submitHour") {
      setSubmitHour(value);
    }
    if (id === "submitDate") {
      setSubmitDate(value);
    }
  };

  useEffect(() => {
    // here we chain multiple requests
    let dataJson = {};

    let supplierObj;
    let userObj;
    let user = localStorage.getItem("user");
    if (user !== null) {
      userObj = JSON.parse(user); // to get the json syntax
    }
    axios
      .get("http://localhost:3000/api/v1/Couriers") //get the couriers
      .then((response) => {
        setCouriers(response.data); // update the state with the fetched data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(couriers[0].location.latitude)
  // Loop through each courier and calculate the distance using the Haversine formula
  couriers.forEach((courier) => {
    const { latitude: lat1, longitude: lon1 } = supplierLocation;
    if (courier.location.latitude && courier.location.longitude) {
      const lat2 = courier.location.latitude;
      const lon2 = courier.location.longitude;
      const R = 6371e3; // Earth's radius in meters
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = (R * c) / 1000; // Distance in km
      courierDistances.push({
        courier,
        distance,
      });
    }
  });
  console.log(couriers);

  // Sort the courierDistances array by distance in ascending order
  courierDistances.sort((a, b) => a.distance - b.distance);
  console.log(courierDistances);

  return (
    <div className="form">
      <h1>New Order</h1>
      <p>
        First fill the fields, then choose which courier you want to take the
        delivery
      </p>
      <div className="form-body">
        <div className="destination" style={{ marginBottom: "5px" }}>
          <label className="form__label" htmlFor="id">
            Destination
          </label>
          <input
            className="form__input"
            type="text"
            value={destination}
            onChange={(e) => handleInputChange(e)}
            id="destination"
            placeholder="destination"
          />
        </div>
        <div className="submitDate" style={{ marginBottom: "5px" }}>
          <label className="form__label" htmlFor="submitDate">
            Date
          </label>
          <input
            className="form__input"
            type="text"
            value={submitDate}
            onChange={(e) => handleInputChange(e)}
            id="submitDate"
            placeholder="submitDate"
          />
        </div>
        <div className="submitHour" style={{ marginBottom: "5px" }}>
          <label className="form__label" htmlFor="submitHour">
            Hour
          </label>
          <input
            type="text"
            name=""
            id="submitHour"
            value={submitHour}
            className="form__input"
            onChange={(e) => handleInputChange(e)}
            placeholder="submitHour"
          />
        </div>
        <div className="customerPhoneNumber" style={{ marginBottom: "5px" }}>
          <label className="form__label" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="text"
            name=""
            id="customerPhoneNumber"
            value={customerPhoneNumber}
            className="form__input"
            onChange={(e) => handleInputChange(e)}
            placeholder="customerPhoneNumber"
          />
        </div>

        <div className="couriers-dropdown" style={{ marginBottom: "5px" }}>
          <label className="form__label" htmlFor="courier-dropdown">
            Courier
          </label>
          <select
            id="courier-dropdown"
            className="form__input"
            value={courier}
            onChange={(e) => setCourier(e.target.value)}
          >
            {courierDistances.map((courierDistance) => (
              <option
                key={courierDistance.courier.user.userName}
                value={courierDistance.courier.user.userName}
              >
                {courierDistance.courier.user.userName}
              </option>
            ))}
          </select>
        </div>

        <div className="couriers-table">
          <h2>Pick Courier</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Distance</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {courierDistances.map((courierDistance) => (
                <tr key={courierDistance.courier.user.userName}>
                  <td>{courierDistance.courier.user.userName}</td>
                  <td>{courierDistance.distance}</td>
                  <td>{courierDistance.courier.user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="buttons-section">
        <Button
          component={Link}
          to="/supplierForm"
          color="primary"
          variant="contained"
          style={{ marginRight: "16px" }}
        >
          Back to Main Page
        </Button>
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
