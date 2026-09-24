import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [name, setName] = useState("HATIM");
  const [greeting, setGreeting] = useState("");
  const [status, setStatus] = useState("");
  const [userList, setUserList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [billingList, setBillingList] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("");

  // user table
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  // payment table
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  // billing table
  
  const [billingName, setBillingName] = useState("");
  const [billingPhone, setBillingPhone] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [billingAccountNumber, setBillingAccountNumber] = useState("");
  const [billingAmount, setBillingAmount] = useState("");
  const [billingChannel, setBillingChannel] = useState("");

  //history table
  const [chatPrompt, setChatPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [latestBotReply, setLatestBotReply] = useState("");
  
  
  
  const serverurl = "http://localhost:3000/api";
  // const serverurl = "http://173.249.17.168:81/api";

  useEffect(() => {
    getData();
  }, []);

  async function postData() {
    try {
      const response = await axios.post(`${serverurl}/users`, {
        names: inputName,
        email: inputEmail,
        phoneNumber: inputPhone,
      });
      console.log(response.data);
      setStatus(response.data);

      setInputName("");
      setInputEmail("");
      setInputPhone("");

    } catch (error) {
      console.error("Error creating user:", error);
      setStatus("Failed to create user");
    }
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
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

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

  // --- Payment Functions ---
  async function postPayment() {
    try {
      const response = await axios.post(`${serverurl}/payment`, {
        paymentMethod: paymentMethod,
        amount: parseFloat(paymentAmount) || 0,
      });
      console.log(response.data);
      setStatus(response.data);

      setPaymentMethod("");
      setPaymentAmount("");

    } catch (error) {
      console.error("Error creating payment:", error);
      setStatus("Failed to add payment");
    }
  }

  async function getPaymentList() {
    const response = await axios.get(`${serverurl}/showpayment`);
    console.log(response.data);
    setPaymentList(response.data);
  }

  async function modifyPayment(id) {
    const newMethod = prompt("Enter the new payment method (Cash, Credit Card, Debit Card, M-pesa):");
    if (!newMethod) return;
    const newAmount = prompt("Enter the new amount:");
    if (!newAmount) return;

    try {
      const response = await axios.put(`${serverurl}/payment/${id}`, {
        paymentMethod: newMethod,
        amount: parseFloat(newAmount),
      });
      console.log(response.data);
      setStatus(response.data);
      getPaymentList();
    } catch (error) {
      console.error("Error modifying payment:", error);
      setStatus("Failed to modify payment");
    }
  }

  async function deletePayment(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this payment record?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${serverurl}/payment/${id}`);
      console.log(response.data);
      setStatus(response.data);
      getPaymentList();
    } catch (error) {
      console.error("Error deleting payment:", error);
      setStatus("Failed to delete payment");
    }
  }



  // --- Billing Functions ---
  async function postBilling() {
    try {
      const response = await axios.post(`${serverurl}/billing`, {
        name: billingName,
        phone: billingPhone,
        email: billingEmail,
        account_number: billingAccountNumber,
        amount: parseFloat(billingAmount) || 0,
        channel: billingChannel,
      });

      console.log(response.data);
      setStatus(response.data.message);

      setBillingName("");
      setBillingPhone("");
      setBillingEmail("");
      setBillingAccountNumber("");
      setBillingAmount("");
      setBillingChannel("");

    } catch (error) {
      console.error("Error creating billing:", error);
      setStatus("Failed to add billing data");
    }
  }

  async function getBillingList() {
  try {
    const response = await axios.get(`${serverurl}/showbilling`);

    console.log(response.data);
    setBillingList(response.data);

  } catch (error) {
    console.error("Error fetching billing data:", error);
    setStatus("Failed to fetch billing data");
  }
}



  //Chatbot functions
  async function sendChatMessage() {
  if (!chatPrompt.trim()) return;

  try {
    const response = await axios.post(`${serverurl}/chat`, {
      prompt: chatPrompt,
    });
    setLatestBotReply(response.data.reply);
    setChatPrompt("");
  } catch (error) {
    console.error("Error sending message:", error);
    setStatus("Failed to communicate with bot");
  }
}

  async function getChatHistory() {
  try {
    const response = await axios.get(`${serverurl}/history`);
    setChatHistory(response.data);
  } catch (error) {
    console.error("Error loading chat history:", error);
  }
}

  return (
    <div id="name">
      <div className="layout-columns">
        {/* LEFT COLUMN: User Section */}
        <div className="column">
          <h3>User Management</h3>
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
            <input
              type="text"
              className="user-input"
              placeholder="Phone"
              value={inputPhone}
              onChange={(e) => setInputPhone(e.target.value)}
            />
          </div>

          <div className="mybtn">
            <button className="submit" onClick={postData}>
              Submit
            </button>
            <button className="list" onClick={getUserList}>
              List Users
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Payment Section */}
        <div className="column">
          <h3>Payment Management</h3>
          <div className="input-container">
            <select
              className="user-input select-input"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="" disabled>
                Select Payment Method
              </option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="M-pesa">M-pesa</option>
            </select>

            <input
              type="number"
              className="user-input no-spinner"
              placeholder="Amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </div>

          <div className="mybtn">
            <button className="payment" onClick={postPayment}>
              Payment
            </button>
            <button className="showpayment" onClick={getPaymentList}>
              Payment data
            </button>
          </div>
        </div>
      </div>

      {/* BILLING SECTION */}
      <div className="layout-columns">
        <div className="column">
          <h3>Billing Management</h3>

          <div className="input-container">
            <input
              type="text"
              className="user-input"
              placeholder="Full Name"
              value={billingName}
              onChange={(e) => setBillingName(e.target.value)}
            />

            <input
              type="text"
              className="user-input"
              placeholder="Phone Number"
              value={billingPhone}
              onChange={(e) => setBillingPhone(e.target.value)}
            />
          </div>

          <div className="input-container">
            <input
              type="email"
              className="user-input"
              placeholder="Email"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
            />

            <input
              type="text"
              className="user-input"
              placeholder="Account Number"
              value={billingAccountNumber}
              onChange={(e) => setBillingAccountNumber(e.target.value)}
            />
          </div>

          <div className="input-container">
            <input
              type="number"
              className="user-input no-spinner"
              placeholder="Amount"
              value={billingAmount}
              onChange={(e) => setBillingAmount(e.target.value)}
            />

            <select
              className="user-input select-input"
              value={billingChannel}
              onChange={(e) => setBillingChannel(e.target.value)}
            >
              <option value="" disabled>
                Select Channel
              </option>
              <option value="AIRTEL">AIRTEL</option>
              <option value="MPESA">MPESA</option>
              <option value="TIGO">TIGO</option>
            </select>
          </div>

          <div className="mybtn">
            <button className="submit" onClick={postBilling}>
              Submit Billing
            </button>

            <button className="showpayment" onClick={getBillingList}>
              Show Billing Data
            </button>
          </div>
        </div>
      </div>

      <div className="status-container">
        {status && <div className="created">{status}</div>}
      </div>

      {/* Chat & History Section */}
      <div className="layout-columns" style={{ marginTop: "30px" }}>
        <div className="column">
          <h3>Chat Assistant</h3>
          <div className="input-container">
            <input
              type="text"
              className="user-input"
              placeholder="Type 'hello', 'payment', 'help'..."
              value={chatPrompt}
              onChange={(e) => setChatPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
            />
          </div>

          <div className="mybtn">
            <button className="submit" onClick={sendChatMessage}>
              Send
            </button>
            <button className="list" onClick={getChatHistory}>
              Load History
            </button>
          </div>

          {latestBotReply && (
            <div
              style={{
                marginTop: "12px",
                fontStyle: "italic",
                color: "#1e293b",
              }}
            >
              <strong>Bot:</strong> {latestBotReply}
            </div>
          )}

          {/* Chat History Table */}
          {chatHistory.length > 0 && (
            <table className="custom-table" style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User Input</th>
                  <th>Bot Response</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {chatHistory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.userPrompt}</td>
                    <td>{item.botReply}</td>
                    <td>{new Date(item.createdAt).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Tables Section */}
      <div className="layout-columns">
        {/* Users Table */}
        <div className="column">
          {userList.length > 0 && (
            <div style={{ width: "100%" }}>
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
        </div>

        {/* Billing Table */}
        <div className="column">
          {billingList.length > 0 && (
            <div style={{ width: "100%" }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Account Number</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Channel</th>
                  </tr>
                </thead>

                <tbody>
                  {billingList.map((billing) => (
                    <tr key={billing.id}>
                      <td>{billing.id}</td>
                      <td>{billing.name}</td>
                      <td>{billing.phone}</td>
                      <td>{billing.email}</td>
                      <td>{billing.account_number}</td>
                      <td>{billing.amount}</td>
                      <td>{billing.payment_status}</td>
                      <td>{billing.channel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Payments Table */}
        <div className="column">
          {paymentList.length > 0 && (
            <div style={{ width: "100%" }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Payment Method</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentList.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.id}</td>
                      <td>{payment.paymentMethod}</td>
                      <td>{payment.amount}</td>
                      <td>
                        <button
                          className="action-btn action-modify"
                          onClick={() => modifyPayment(payment.id)}
                        >
                          Modify
                        </button>
                        <button
                          className="action-btn action-delete"
                          onClick={() => deletePayment(payment.id)}
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
        </div>
      </div>
    </div>
  );
}