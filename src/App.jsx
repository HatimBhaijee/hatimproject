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

  const serverurl = "http://localhost:3000/api";
  //  const serverurl = "http://173.249.17.168:81/api"

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

  async function modifyData() {
    const idToModify = prompt("Enter the User ID to modify:");
    if (!idToModify) return;

    const newEmail = prompt("Enter the new email address:")
    if (!newEmail) return;

    try{
    const response = await axios.put(`${serverurl}/users/${idToModify}`, {
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

  async function deleteData() {
    const idToDelete = prompt("Enter the User ID you want to delete:")

    if (!idToDelete) return;

    const response = await axios.delete(`${serverurl}/users/${idToDelete}`);
    console.log(response.data);
    setStatus(response.data);
    getUserList();
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
        <button className="modify" onClick={modifyData}>
          {" "}
          modify
        </button>
        <button className="delete" onClick={deleteData}>
          {" "}
          delete
        </button>
        <button className="list" onClick={getUserList}>
          {" "}
          List Users
        </button>
      </div>
      <div className="mybtn2">
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
      <div>
        {userList.map((user) => (
          <div key={user.id} style={{ marginBottom: "20px"}}>
            <p>User ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phoneNumber}</p>
          </div>
        ))}
      </div>
      <div>
        {paymentList.map((payment) => (
          <div key={payment.id} style={{ marginBottom: "20px"}}>
            <p>Payment ID: {payment.id}</p>
            <p>Payment Method: {payment.paymentMethod}</p>
            <p>Amount: {payment.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
