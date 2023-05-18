import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

let temp
function CourierForm() {
  let userObj;
  let courierObj;
  let thisCourier;
  let user = localStorage.getItem("courierUser");
  if (user !== null) {
    userObj = JSON.parse(user);
  }
  console.log(userObj);

  const [status, setStatus] = useState("");

  const [ordersCount, setOrdersCount] = useState(null); // initial value for example

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/Couriers/get/" + userObj._id)
      .then((response) => {
        localStorage.setItem("courier", JSON.stringify(response.data[0]));
        thisCourier = localStorage.getItem("courier");
        if (thisCourier !== null) {
          courierObj = JSON.parse(thisCourier);
          temp=courierObj;
        }
        console.log(courierObj);
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
  }, []);

  let handleChangeStatus = async (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/Couriers/updateStatus/" + temp._id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ availablityStatus: e.target.value }),
        }
      );
      console.log(response);
      alert("The changes have been saved successfully");
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

  const getCurrentLocation = () => {
    const key = process.env.REACT_APP_API_KEY;
    let courier = localStorage.getItem("courier");
    let thisCourier = JSON.parse(courier);
  
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          document.getElementById("latitude").textContent =
            "Latitude: " + latitude;
          document.getElementById("longitude").textContent =
            "Longitude: " + longitude;
  
          // Geocoding API call to get the name based on the coordinates
          axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}&language=en`
            )
            .then((response) => {
              const results = response.data.results;
              if (results.length > 0) {
                const name = results[0].formatted_address;
                console.log("Name:", name);
                // Use the retrieved name as needed (e.g., send it in the POST request)
                axios
                  .post(
                    "http://localhost:3000/api/v1/Locations",
                    {
                      latitude: latitude,
                      longitude: longitude,
                      name: name,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((response) => {
                    setTimeout(() => {
                      let Location = response.data
                      console.log(thisCourier._id + " " + Location._id )
                      axios
                        .put(
                          "http://localhost:3000/api/v1/Couriers/updateLocation/" +
                            thisCourier._id +
                            "/" +
                            Location.id
                        )
                        .then((response) => {
                          console.log(response.data);
                          alert("The location has been updated");
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }, 1000);
                  });
              } else {
                console.log("No results found");
              }
            })
            .catch((error) => {
              console.log("Error geocoding:", error);
            });
        },
        function (error) {
          console.log("Error getting location:", error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported");
    }
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
        {ordersCount > -1 && (
          <span>{ordersCount} Received Orders - My orders</span>
        )}
      </button>
      <select value={status} onChange={handleChangeStatus}>
        <option value="Available">Available</option>
        <option value="Busy">Busy</option>
      </select>
      <button onClick={handleGoBack}>LogOut</button>
      <p>Here you can update your Current Location</p>
      <button onClick={getCurrentLocation}>Get Location</button>
      <p id="latitude"></p>
      <p id="longitude"></p>
    </div>
  );
}

export default CourierForm;
