import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [name, setName] = useState("HATIM");
  const [greeting, setGreeting] = useState("");
  const [status, setStatus] = useState("");
  const [userList, setUserList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("");

  //input states
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  // const serverurl = "http://localhost:3000/api";
   const serverurl = "http://173.249.17.168:81/api"

  useEffect(() => {
    getData();
  }, []);

  async function postData() {
    const response = await axios.post(`${serverurl}/users`, {
      names: inputName,
      email: inputEmail,
      phoneNumber: "0112233",
    });
    console.log(response.data);
    setStatus(response.data);
    getUserList();
  }

  function getData() {
    console.log("Fetching data from the server...");
    axios
      .get(`${serverurl}/test`)
      .then((res) => {
        setName(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  async function modifyData(id) {
    const newEmail = prompt("Enter the new email address:");
    if (!newEmail) return;

    try {
      const response = await axios.put(`${serverurl}/users/${id}`, {
        email: newEmail,
      });
      console.log(response.data);
      setStatus(response.data);
      getUserList();
    } catch (error) {
      console.error("Error modifying user:", error);
      setStatus("Failed to modify user");
    }
  }

  async function deleteData(id) {
    try {
      const response = await axios.delete(`${serverurl}/users/${id}`);
      console.log(response.data);
      setStatus(response.data);
      getUserList();
    } catch (error) {
      console.error("Error deleting user:", error);
      setStatus("Failed to delete user");
    }
  }

  async function getUserList() {
    const response = await axios.get(`${serverurl}/showusers`);
    console.log(response.data);
    setUserList(response.data);
  }

  async function postPayment() {
    const response = await axios.post(`${serverurl}/payment`, {
      paymentMethod: "Credit Card",
      amount: 200,
    });
    console.log(response.data);
    setStatus(response.data);
  }

  async function getPaymentList() {
    const response = await axios.get(`${serverurl}/showpayment`);
    console.log(response.data);
    setPaymentList(response.data);
  }

  return (
    <div id="name">
      {/* User input fields */}
      <div className="input-container">
        <input
          type="text"
          className="user-input"
          placeholder="Name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <input
          type="text"
          className="user-input"
          placeholder="Email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
        />
      </div>

      <div className="mybtn">
        <button className="submit" onClick={postData}>
          {" "}
          submit{" "}
        </button>
        {/* <button className="cancel">cancel</button> */}
        <button className="list" onClick={getUserList}>
          {" "}
          List Users
        </button>
        <button className="payment" onClick={postPayment}>
          {" "}
          Payment{" "}
        </button>
        <button className="showpayment" onClick={getPaymentList}>
          {" "}
          Payment data
        </button>
      </div>

      <div className="created">{status}</div>
      {/* Users Table */}
      {userList.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>User List</h3>
          <table className="custom-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <button
                      className="action-btn action-modify"
                      onClick={() => modifyData(user.id)}
                    >
                      Modify
                    </button>
                    <button
                      className="action-btn action-delete"
                      onClick={() => deleteData(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment Table */}
      {paymentList.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Payment Data</h3>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Payment Method</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {paymentList.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>${payment.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
