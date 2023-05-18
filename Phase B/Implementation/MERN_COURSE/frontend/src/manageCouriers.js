import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrdersTable.css"; // Import CSS file for styling
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function ManageCouriers() {
  const [couriers, setCouriers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [modifiedCouriers, setModifiedCouriers] = useState([]);
  let userObj;
  let user = localStorage.getItem("user");
  if (user !== null) {
    userObj = JSON.parse(user); // to get the json syntax
  }
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/Couriers") //get the couriers
      .then((response) => {
        setCouriers(response.data); // update the state with the fetched data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleStatusChange = (courierId, newStatus) => {
    const updatedCouriers = couriers.map((courier) => {
      if (courier.user.id === courierId) {
        return {
          ...courier,
          status: newStatus,
        };
      }
      return courier;
    });
  
    setCouriers(updatedCouriers);
    setModifiedCouriers(updatedCouriers); // Update modifiedCouriers
  };

  const handleSaveChanges = () => {
    const requests = modifiedCouriers.map((modifiedCourier) => {
      const { id, status } = modifiedCourier;
      return axios.put(
        `http://localhost:3000/api/v1/Couriers/updateStatusOfTheCourier/${id}`,
        { status }
      );
    });
  
    axios
      .all(requests)
      .then((responses) => {
        console.log(responses); // handle the responses as needed
        setModifiedCouriers([]); // reset the modified couriers state
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //              <th>Last month efficiency</th>

  return (
    <div className="manage-Couriers-form">
      <h1>Couriers Management</h1>
      <div className="Couriers-info-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {couriers.map((courier) => (
              <tr key={courier.user.id}>
                <td>{courier.user.id}</td>
                <td>{courier.user.userName}</td>
                <td>
                  <select
                    value={
                      modifiedCouriers.find(
                        (modifiedCourier) =>
                          modifiedCourier.user.id === courier.user.id
                      )?.status || courier.status
                    }
                    onChange={(e) =>
                      handleStatusChange(courier.user.id, e.target.value)
                    }
                  >
                    <option value="OK">OK</option>
                    <option value="Warning">Warning</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="buttons-section">
        <div style={{ textAlign: "left" }}>
          <Button
            component={Link}
            to="/ManagerForm"
            color="primary"
            variant="contained"
            disabled={modifiedCouriers.length === 0}
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
          <Button
          component={Link}
            to="/ManagerForm/manageCouriers/addNewCourier"
            color="primary"
            variant="contained"
            >
                Add new courier
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ManageCouriers;
