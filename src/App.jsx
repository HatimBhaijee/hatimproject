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

  //http://localhost:3000/test

  useEffect(() => {
    getData();
  }, []);

  async function postData() {
    const response = await axios.post("http://localhost:3000/api/users", {
      names: "HATIM",
      email: "hatimbshhjglfkgjdsa@gmail.com",
      phoneNumber: "0112233",
    });
    console.log(response.data);
    setStatus(response.data);
  }

  function getData() {
    console.log("Fetching data from the server...");
    axios
      .get("http://localhost:3000/test")
      .then((res) => {
        setName(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  async function modifyData() {
    const response = await axios.put("http://localhost:3000/api/users/5", {
      email: "hashim@gmail.com",
    });
    console.log(response.data);
    setStatus(response.data);
  }

  async function deleteData() {
    const response = await axios.delete("http://localhost:3000/api/users/5");
    console.log(response.data);
    setStatus(response.data);
  }

  async function getUserList() {
    const response = await axios.get("http://localhost:3000/api/showusers");
    console.log(response.data);
    setUserList(response.data);
  }

  async function postData() {
    const response = await axios.post("http://localhost:3000/api/payment", {
      paymentMethod: "Credit Card",
      amount: 200,
    });
    console.log(response.data);
    setStatus(response.data);
  }

  async function getPaymentList() {
    const response = await axios.get("http://localhost:3000/api/showpayment");
    console.log(response.data);
    setPaymentList(response.data);
  }


  return (
    <div id="name">
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
        <button className="payment" onClick={postData}>
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
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phoneNumber}</p>
          </div>
        ))}
      </div>
      <div>
        {paymentList.map((payment) => (
          <div key={payment.id}>
            <p>Payment Method: {payment.paymentMethod}</p>
            <p>Amount: {payment.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
