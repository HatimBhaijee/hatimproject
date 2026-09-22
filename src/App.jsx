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


//  const serverurl = "http://localhost:3000/api"
 const serverurl = "http://173.249.17.168:81/api"

  useEffect(() => {
    getData();
  }, []);

  async function postData() {
    const response = await axios.post(`${serverurl}/users`, {
      names: "HATIM",
      email: "hatimbshhjglfkgjdsah@gmail.com",
      phoneNumber: "0112233",
    });
    console.log(response.data);
    setStatus(response.data);
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
    const response = await axios.put(`${serverurl}/users/5`, {
      email: "hashim@gmail.com",
    });
    console.log(response.data);
    setStatus(response.data);
  }

  async function deleteData() {
    const response = await axios.delete(`${serverurl}/users/5`);
    console.log(response.data);
    setStatus(response.data);
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
