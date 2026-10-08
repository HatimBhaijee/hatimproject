import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

// Options for the crop and country models
const WEATHER_OPTIONS = [
  "cloudy",
  "dusty",
  "foggy",
  "hazy",
  "overcast",
  "partly cloudy",
  "rainy",
  "stormy",
  "sunny",
];

const CROP_OPTIONS = [
  "banana",
  "beans",
  "cassava",
  "cocoa",
  "coffee",
  "cotton",
  "dates",
  "groundnut",
  "maize",
  "millet",
  "olive",
  "rice",
  "sorghum",
  "sugarcane",
  "tea",
  "wheat",
];

// Options for the car, house and delivery models (exact spelling used in training)
const CAR_MODELS_BY_MAKE = {
  Ford: ["Ranger"],
  Honda: ["CR-V", "Fit"],
  Isuzu: ["D-Max"],
  Mazda: ["CX-5", "Demio"],
  "Mercedes-Benz": ["C-Class"],
  Mitsubishi: ["Outlander", "Pajero"],
  Nissan: ["Juke", "Note", "X-Trail"],
  Subaru: ["Forester"],
  Suzuki: ["Escudo", "Swift"],
  Toyota: [
    "Allion", "Alphard", "Corolla", "Crown", "Harrier", "Hilux", "IST",
    "Land Cruiser Prado", "Land Cruiser V8", "Noah", "Passo", "Premio", "RAV4", "Vitz",
  ],
};

const CAR_CONDITIONS = ["Poor", "Fair", "Good", "Excellent"];

const HOUSE_LOCATIONS_BY_CITY = {
  Arusha: ["Njiro", "Sakina"],
  "Dar es Salaam": [
    "Ilala", "Kariakoo", "Kigamboni", "Kimara", "Kinondoni", "Masaki", "Mbagala",
    "Mbezi Beach", "Mikocheni", "Oysterbay", "Sinza", "Tegeta", "Temeke", "Ubungo",
  ],
  Dodoma: ["Area D", "Njedengwa"],
  Mbeya: ["Iyunga"],
  Mwanza: ["Capri Point", "Nyamagana"],
  Zanzibar: ["Nungwi"],
};

const DELIVERY_TRAFFIC = ["Low", "Medium", "High", "Jam"];
const DELIVERY_WEATHER = ["Clear", "Cloudy", "Fog", "Rain", "Heavy Rain"];
const DELIVERY_VEHICLES = ["Motorcycle", "Scooter", "Car", "Bicycle"];

export default function App() {
  const [name, setName] = useState("HATIM");
  const [greeting, setGreeting] = useState("");
  const [status, setStatus] = useState("");
  const [statusKey, setStatusKey] = useState(0);
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

  //AI model
  const [predictionInput, setPredictionInput] = useState({
    age: "",
    sex: "",
    bmi: "",
    children: "0",
    smoker: "",
    region: "",
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [predictionError, setPredictionError] = useState("");

  //Crop, Country AI model
  const [cropInput, setCropInput] = useState({
    rainfall: "",
    temperature: "",
    soil_ph: "",
    weather: "",
    suitability: "",
  });

  const [countryInput, setCountryInput] = useState({
    crop: "",
    rainfall: "",
    temperature: "",
    soil_ph: "",
    weather: "",
  });

  const [countryResult, setCountryResult] = useState(null);
  const [countryLoading, setCountryLoading] = useState(false);
  const [countryError, setCountryError] = useState("");

  const [cropResult, setCropResult] = useState(null);
  const [cropLoading, setCropLoading] = useState(false);
  const [cropError, setCropError] = useState("");

  //Car, house and delivery models
    //Used car price model
  const [carInput, setCarInput] = useState({
    make: "",
    model: "",
    years_since_manufacture: "",
    mileage: "",
    condition: "",
  });

  const [carResult, setCarResult] = useState(null);
  const [carLoading, setCarLoading] = useState(false);
  const [carError, setCarError] = useState("");

  //House price model
  const [houseInput, setHouseInput] = useState({
    city: "",
    location: "",
    size: "",
    bedrooms: "",
    years_since_built: "",
  });

  const [houseResult, setHouseResult] = useState(null);
  const [houseLoading, setHouseLoading] = useState(false);
  const [houseError, setHouseError] = useState("");

  //Delivery time model
  const [deliveryInput, setDeliveryInput] = useState({
    distance: "",
    traffic: "",
    weather: "",
    vehicle: "",
    courier_age: "",
    courier_rating: "",
    courier_experience: "",
  });

  const [deliveryResult, setDeliveryResult] = useState(null);
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [deliveryError, setDeliveryError] = useState("");

  //history table
  const [chatPrompt, setChatPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [latestBotReply, setLatestBotReply] = useState("");

  // Products API
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // const serverurl = "http://localhost:3000/api";
  const serverurl = "http://173.249.17.168:81/api";

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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );
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
    const newMethod = prompt(
      "Enter the new payment method (Cash, Credit Card, Debit Card, M-pesa):",
    );
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment record?",
    );
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
      setStatus(response.data.message);
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

  async function editBilling(
    id,
    currentAccountNumber,
    currentAmount,
    paymentStatus,
  ) {
    const normalizedStatus = paymentStatus?.toLowerCase();

    if (normalizedStatus === "completed") {
      window.alert("This payment cannot be edited after completion.");
      return;
    }

    if (normalizedStatus !== "pending" && normalizedStatus !== "failed") {
      window.alert("Only pending or failed payments can be edited.");
      return;
    }

    const newAccountNumber = window.prompt(
      "Enter the new account number:",
      currentAccountNumber,
    );

    if (newAccountNumber === null || !newAccountNumber.trim()) {
      return;
    }

    const newAmount = window.prompt("Enter the new amount:", currentAmount);

    if (newAmount === null || !newAmount.trim()) {
      return;
    }

    const parsedAmount = Number(newAmount);

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      window.alert("Please enter a valid amount greater than zero.");
      return;
    }

    try {
      const response = await axios.put(`${serverurl}/billing/${id}`, {
        account_number: newAccountNumber.trim(),
        amount: parsedAmount,
      });

      setStatusKey((prev) => prev + 1);
      setStatus(response.data.message);

      await getBillingList();
    } catch (error) {
      console.error("Error editing billing record:", error);

      setStatusKey((prev) => prev + 1);
      setStatus(
        error.response?.data?.message || "Failed to edit billing record",
      );
    }
  }

  async function deleteBilling(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this billing record?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(`${serverurl}/billing/${id}`);

      setStatusKey((prev) => prev + 1);
      setStatus(response.data.message);

      await getBillingList();
    } catch (error) {
      console.error("Error deleting billing record:", error);

      setStatusKey((prev) => prev + 1);
      setStatus(
        error.response?.data?.message || "Failed to delete billing record",
      );
    }
  }

  async function retryBillingPayment(id) {
    try {
      const response = await axios.post(`${serverurl}/billing/${id}/retry`);

      setStatusKey((prev) => prev + 1);
      setStatus(response.data.message);

      await getBillingList();
    } catch (error) {
      console.error("Error retrying billing payment:", error);

      setStatusKey((prev) => prev + 1);
      setStatus(error.response?.data?.message || "Failed to retry payment");
    }
  }

  // --- Products API ---
  async function getProducts() {
    setProductsLoading(true);
    setProductsError("");

    try {
      const response = await axios.get("https://dummyjson.com/products");

      console.log(response.data);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductsError("Failed to fetch products");
    } finally {
      setProductsLoading(false);
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

  // Send insurance details to the AI model
  async function predictInsuranceCost(e) {
    e.preventDefault();

    setPredictionResult(null);
    setPredictionError("");

    const payload = {
      age: Number(predictionInput.age),
      sex: predictionInput.sex.trim().toLowerCase(),
      bmi: Number(predictionInput.bmi),
      children: Number(predictionInput.children),
      smoker: predictionInput.smoker.trim().toLowerCase(),
      region: predictionInput.region.trim().toLowerCase(),
    };

    if (
      !predictionInput.age ||
      !predictionInput.sex ||
      !predictionInput.bmi ||
      predictionInput.children === "" ||
      !predictionInput.smoker ||
      !predictionInput.region
    ) {
      setPredictionError("Please complete all fields.");
      return;
    }

    setPredictionLoading(true);

    try {
      const response = await axios.post(`${serverurl}/predict`, payload);

      setPredictionResult(response.data);
    } catch (error) {
      console.error("Insurance prediction error:", error);

      setPredictionError(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          "Unable to get a prediction. Please try again.",
      );
    } finally {
      setPredictionLoading(false);
    }
  }

  // Send field conditions to the crop recommender model
  async function predictCrop(e) {
    e.preventDefault();

    setCropResult(null);
    setCropError("");

    if (
      cropInput.rainfall === "" ||
      cropInput.temperature === "" ||
      cropInput.soil_ph === "" ||
      !cropInput.weather ||
      cropInput.suitability === ""
    ) {
      setCropError("Please complete all fields.");
      return;
    }

    const payload = {
      rainfall: Number(cropInput.rainfall),
      temperature: Number(cropInput.temperature),
      soil_ph: Number(cropInput.soil_ph),
      weather: cropInput.weather,
      suitability: Number(cropInput.suitability),
    };

    setCropLoading(true);

    try {
      const response = await axios.post(`${serverurl}/predict-crop`, payload);

      setCropResult(response.data);
    } catch (error) {
      console.error("Crop prediction error:", error);

      setCropError(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          "Unable to get a prediction. Please try again.",
      );
    } finally {
      setCropLoading(false);
    }
  }

  // Send a crop and its conditions to the country predictor model
  async function predictCountry(e) {
    e.preventDefault();

    setCountryResult(null);
    setCountryError("");

    if (
      !countryInput.crop ||
      countryInput.rainfall === "" ||
      countryInput.temperature === "" ||
      countryInput.soil_ph === "" ||
      !countryInput.weather
    ) {
      setCountryError("Please complete all fields.");
      return;
    }

    const payload = {
      crop: countryInput.crop,
      rainfall: Number(countryInput.rainfall),
      temperature: Number(countryInput.temperature),
      soil_ph: Number(countryInput.soil_ph),
      weather: countryInput.weather,
    };

    setCountryLoading(true);

    try {
      const response = await axios.post(
        `${serverurl}/predict-country`,
        payload,
      );

      setCountryResult(response.data);
    } catch (error) {
      console.error("Country prediction error:", error);

      setCountryError(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          "Unable to get a prediction. Please try again.",
      );
    } finally {
      setCountryLoading(false);
    }
  }

    // Send car details to the used car price model
  async function predictCarPrice(e) {
    e.preventDefault();

    setCarResult(null);
    setCarError("");

    if (Object.values(carInput).some((value) => value === "")) {
      setCarError("Please complete all fields.");
      return;
    }

    const payload = {
      make: carInput.make,
      model: carInput.model,
      years_since_manufacture: Number(carInput.years_since_manufacture),
      mileage: Number(carInput.mileage),
      condition: carInput.condition,
    };

    setCarLoading(true);

    try {
      const response = await axios.post(`${serverurl}/predict-car`, payload);

      setCarResult(response.data);
    } catch (error) {
      console.error("Car prediction error:", error);

      setCarError(
        error.response?.data?.detail ||
        error.response?.data?.error ||
        "Unable to get a prediction. Please try again."
      );
    } finally {
      setCarLoading(false);
    }
  }

  // Send house details to the house price model
  async function predictHousePrice(e) {
    e.preventDefault();

    setHouseResult(null);
    setHouseError("");

    if (Object.values(houseInput).some((value) => value === "")) {
      setHouseError("Please complete all fields.");
      return;
    }

    const payload = {
      city: houseInput.city,
      location: houseInput.location,
      size: Number(houseInput.size),
      bedrooms: Number(houseInput.bedrooms),
      years_since_built: Number(houseInput.years_since_built),
    };

    setHouseLoading(true);

    try {
      const response = await axios.post(`${serverurl}/predict-house`, payload);

      setHouseResult(response.data);
    } catch (error) {
      console.error("House prediction error:", error);

      setHouseError(
        error.response?.data?.detail ||
        error.response?.data?.error ||
        "Unable to get a prediction. Please try again."
      );
    } finally {
      setHouseLoading(false);
    }
  }

  // Send order details to the delivery time model
  async function predictDeliveryTime(e) {
    e.preventDefault();

    setDeliveryResult(null);
    setDeliveryError("");

    if (Object.values(deliveryInput).some((value) => value === "")) {
      setDeliveryError("Please complete all fields.");
      return;
    }

    const payload = {
      distance: Number(deliveryInput.distance),
      traffic: deliveryInput.traffic,
      weather: deliveryInput.weather,
      vehicle: deliveryInput.vehicle,
      courier_age: Number(deliveryInput.courier_age),
      courier_rating: Number(deliveryInput.courier_rating),
      courier_experience: Number(deliveryInput.courier_experience),
    };

    setDeliveryLoading(true);

    try {
      const response = await axios.post(`${serverurl}/predict-delivery`, payload);

      setDeliveryResult(response.data);
    } catch (error) {
      console.error("Delivery prediction error:", error);

      setDeliveryError(
        error.response?.data?.detail ||
        error.response?.data?.error ||
        "Unable to get a prediction. Please try again."
      );
    } finally {
      setDeliveryLoading(false);
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
        {status && (
          <div key={statusKey} className="created">
            {status}
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
                  <th>Actions</th>
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
                    <td>
                      <button
                        className="action-btn action-modify"
                        onClick={() =>
                          editBilling(
                            billing.id,
                            billing.account_number,
                            billing.amount,
                            billing.payment_status,
                          )
                        }
                      >
                        Modify
                      </button>

                      <button
                        className="action-btn action-delete"
                        onClick={() => deleteBilling(billing.id)}
                      >
                        Delete
                      </button>

                      {billing.payment_status?.toLowerCase() === "pending" && (
                        <button
                          className="action-btn action-modify"
                          onClick={() => retryBillingPayment(billing.id)}
                        >
                          Retry Payment
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Products Section */}
        <div className="column">
          <h3>Products API</h3>

          <button className="list" onClick={getProducts}>
            Load Products
          </button>

          {productsLoading && <p>Loading products...</p>}

          {productsError && <p>{productsError}</p>}

          {products.length > 0 && (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Rating</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.slice(0, 5).map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.rating}</td>
                    <td>
                      <button
                        className="action-btn action-view"
                        onClick={() => setSelectedProduct(product)}
                      >
                        View{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {selectedProduct && (
            <div className="column product-details">
              <h3>Product Details</h3>
              <img
                src={selectedProduct.thumbnail}
                alt={selectedProduct.title}
                className="product-image"
              />
              <p>
                <strong>ID:</strong> {selectedProduct.id}
              </p>
              <p>
                <strong>Title:</strong> {selectedProduct.title}
              </p>
              <p>
                <strong>Description:</strong> {selectedProduct.description}
              </p>
              <p>
                <strong>Category:</strong> {selectedProduct.category}
              </p>
              <p>
                <strong>Price:</strong> ${selectedProduct.price}
              </p>
              <p>
                <strong>Discount:</strong> {selectedProduct.discountPercentage}%
              </p>
              <p>
                <strong>Rating:</strong> {selectedProduct.rating}
              </p>
              <p>
                <strong>Stock:</strong> {selectedProduct.stock}
              </p>
              <p>
                <strong>Brand:</strong> {selectedProduct.brand}
              </p>
              <p>
                <strong>Weight:</strong> {selectedProduct.weight}
              </p>
              <p>
                <strong>Warranty:</strong> {selectedProduct.warrantyInformation}
              </p>
              <p>
                <strong>Shipping:</strong> {selectedProduct.shippingInformation}
              </p>
              <p>
                <strong>Availability:</strong>{" "}
                {selectedProduct.availabilityStatus}
              </p>
              <p>
                <strong>Return Policy:</strong> {selectedProduct.returnPolicy}
              </p>

              <button
                className="action-btn"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Insurance Cost Prediction AI Section*/}
        <section className="prediction-section">
          <h3>Insurance Cost Prediction</h3>

          <form className="prediction-form" onSubmit={predictInsuranceCost}>
            <div className="prediction-grid">
              <label className="prediction-field">
                Age
                <input
                  type="number"
                  min="18"
                  max="70"
                  step="1"
                  required
                  value={predictionInput.age}
                  onChange={(e) =>
                    setPredictionInput({
                      ...predictionInput,
                      age: e.target.value,
                    })
                  }
                  placeholder="Enter your age"
                />
              </label>

              <label className="prediction-field">
                Sex
                <select
                  required
                  value={predictionInput.sex}
                  onChange={(e) =>
                    setPredictionInput({
                      ...predictionInput,
                      sex: e.target.value,
                    })
                  }
                >
                  <option value="">Select sex</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>

              <label className="prediction-field">
                BMI
                <input
                  type="number"
                  min="10"
                  max="60"
                  step="any"
                  required
                  value={predictionInput.bmi}
                  onChange={(e) =>
                    setPredictionInput({
                      ...predictionInput,
                      bmi: e.target.value,
                    })
                  }
                  placeholder="Enter your BMI"
                />
              </label>

              <label className="prediction-field">
                Number of Children
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="1"
                  required
                  value={predictionInput.children}
                  onChange={(e) =>
                    setPredictionInput({
                      ...predictionInput,
                      children: e.target.value,
                    })
                  }
                />
              </label>

              <label className="prediction-field">
                Smoker
                <select
                  required
                  value={predictionInput.smoker}
                  onChange={(e) =>
                    setPredictionInput({
                      ...predictionInput,
                      smoker: e.target.value,
                    })
                  }
                >
                  <option value="">Select option</option>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </label>

              <label className="prediction-field">
                Region
                <select
                  required
                  value={predictionInput.region}
                  onChange={(e) =>
                    setPredictionInput({
                      ...predictionInput,
                      region: e.target.value,
                    })
                  }
                >
                  <option value="">Select region</option>
                  <option value="northwest">Northwest</option>
                  <option value="southeast">Southeast</option>
                  <option value="southwest">Southwest</option>
                </select>
              </label>
            </div>

            <button
              className="prediction-submit"
              type="submit"
              disabled={predictionLoading}
            >
              {predictionLoading ? "Calculating..." : "Predict Insurance Cost"}
            </button>
          </form>

          {predictionError && (
            <div className="prediction-error" role="alert">
              {predictionError}
            </div>
          )}

          {predictionResult && (
            <div className="prediction-result" aria-live="polite">
              <h4>Prediction Result</h4>

              <p className="prediction-cost">
                {Number(predictionResult.predicted_cost).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  },
                )}
              </p>

              <p>Estimated insurance cost based on your submitted details.</p>
            </div>
          )}
        </section>

        {/* Crop Recommendation AI Section */}
        <section className="prediction-section">
          <h3>Crop Recommendation</h3>
          <p className="prediction-description">
            Enter your field conditions to see the three crops that suit them
            best.
          </p>

          <form className="prediction-form" onSubmit={predictCrop}>
            <div className="prediction-grid">
              <label className="prediction-field">
                Rainfall (mm)
                <input
                  type="number"
                  min="20"
                  max="3500"
                  step="any"
                  required
                  value={cropInput.rainfall}
                  onChange={(e) =>
                    setCropInput({ ...cropInput, rainfall: e.target.value })
                  }
                  placeholder="20 - 3500"
                />
              </label>

              <label className="prediction-field">
                Temperature (°C)
                <input
                  type="number"
                  min="10"
                  max="38"
                  step="any"
                  required
                  value={cropInput.temperature}
                  onChange={(e) =>
                    setCropInput({ ...cropInput, temperature: e.target.value })
                  }
                  placeholder="10 - 38"
                />
              </label>

              <label className="prediction-field">
                Soil pH
                <input
                  type="number"
                  min="4"
                  max="9"
                  step="any"
                  required
                  value={cropInput.soil_ph}
                  onChange={(e) =>
                    setCropInput({ ...cropInput, soil_ph: e.target.value })
                  }
                  placeholder="4 - 9"
                />
              </label>

              <label className="prediction-field">
                Weather
                <select
                  required
                  value={cropInput.weather}
                  onChange={(e) =>
                    setCropInput({ ...cropInput, weather: e.target.value })
                  }
                >
                  <option value="">Select weather</option>
                  {WEATHER_OPTIONS.map((weather) => (
                    <option key={weather} value={weather}>
                      {weather.charAt(0).toUpperCase() + weather.slice(1)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="prediction-field">
                Suitability Score
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="any"
                  required
                  value={cropInput.suitability}
                  onChange={(e) =>
                    setCropInput({ ...cropInput, suitability: e.target.value })
                  }
                  placeholder="0 - 100"
                />
              </label>
            </div>

            <button
              className="prediction-submit"
              type="submit"
              disabled={cropLoading}
            >
              {cropLoading ? "Calculating..." : "Recommend Crop"}
            </button>
          </form>

          {cropError && (
            <div className="prediction-error" role="alert">
              {cropError}
            </div>
          )}

          {cropResult && (
            <div className="prediction-result" aria-live="polite">
              <h4>Recommended Crop</h4>

              <p className="prediction-cost">{cropResult.recommended_crop}</p>

              <ul className="prediction-options">
                {cropResult.top_3.map((item) => (
                  <li key={item.crop}>
                    <span>{item.crop}</span>
                    <span>{item.probability}%</span>
                  </li>
                ))}
              </ul>

              <p>Top 3 crops for the conditions you entered.</p>
            </div>
          )}
        </section>

        {/* Country Prediction AI Section */}
        <section className="prediction-section">
          <h3>Country Prediction</h3>
          <p className="prediction-description">
            Enter a crop and its growing conditions to see the five countries
            most likely to match.
          </p>

          <form className="prediction-form" onSubmit={predictCountry}>
            <div className="prediction-grid">
              <label className="prediction-field">
                Crop
                <select
                  required
                  value={countryInput.crop}
                  onChange={(e) =>
                    setCountryInput({ ...countryInput, crop: e.target.value })
                  }
                >
                  <option value="">Select crop</option>
                  {CROP_OPTIONS.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop.charAt(0).toUpperCase() + crop.slice(1)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="prediction-field">
                Weather
                <select
                  required
                  value={countryInput.weather}
                  onChange={(e) =>
                    setCountryInput({
                      ...countryInput,
                      weather: e.target.value,
                    })
                  }
                >
                  <option value="">Select weather</option>
                  {WEATHER_OPTIONS.map((weather) => (
                    <option key={weather} value={weather}>
                      {weather.charAt(0).toUpperCase() + weather.slice(1)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="prediction-field">
                Rainfall (mm)
                <input
                  type="number"
                  min="20"
                  max="3500"
                  step="any"
                  required
                  value={countryInput.rainfall}
                  onChange={(e) =>
                    setCountryInput({
                      ...countryInput,
                      rainfall: e.target.value,
                    })
                  }
                  placeholder="20 - 3500"
                />
              </label>

              <label className="prediction-field">
                Temperature (°C)
                <input
                  type="number"
                  min="10"
                  max="38"
                  step="any"
                  required
                  value={countryInput.temperature}
                  onChange={(e) =>
                    setCountryInput({
                      ...countryInput,
                      temperature: e.target.value,
                    })
                  }
                  placeholder="10 - 38"
                />
              </label>

              <label className="prediction-field">
                Soil pH
                <input
                  type="number"
                  min="4"
                  max="9"
                  step="any"
                  required
                  value={countryInput.soil_ph}
                  onChange={(e) =>
                    setCountryInput({
                      ...countryInput,
                      soil_ph: e.target.value,
                    })
                  }
                  placeholder="4 - 9"
                />
              </label>
            </div>

            <button
              className="prediction-submit"
              type="submit"
              disabled={countryLoading}
            >
              {countryLoading ? "Calculating..." : "Predict Country"}
            </button>
          </form>

          {countryError && (
            <div className="prediction-error" role="alert">
              {countryError}
            </div>
          )}

          {countryResult && (
            <div className="prediction-result" aria-live="polite">
              <h4>Most Likely Country</h4>

              <p className="prediction-cost">
                {countryResult.most_likely_country}
              </p>

              <ul className="prediction-options">
                {countryResult.top_5.map((item) => (
                  <li key={item.country}>
                    <span>{item.country}</span>
                    <span>{item.probability}%</span>
                  </li>
                ))}
              </ul>

              <p>Top 5 countries for the crop and conditions you entered.</p>
            </div>
          )}
        </section>

              {/* Used Car Price Prediction AI Section */}
      <section className="prediction-section">
        <h3>Used Car Price Prediction</h3>
        <p className="prediction-description">
          Pick the make and model, then enter its age, mileage and condition.
        </p>

        <form className="prediction-form" onSubmit={predictCarPrice}>
          <div className="prediction-grid">
            <label className="prediction-field">
              Make
              <select
                required
                value={carInput.make}
                onChange={(e) =>
                  setCarInput({ ...carInput, make: e.target.value, model: "" })
                }
              >
                <option value="">Select make</option>
                {Object.keys(CAR_MODELS_BY_MAKE).map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </label>

            <label className="prediction-field">
              Model
              <select
                required
                disabled={!carInput.make}
                value={carInput.model}
                onChange={(e) =>
                  setCarInput({ ...carInput, model: e.target.value })
                }
              >
                <option value="">
                  {carInput.make ? "Select model" : "Select a make first"}
                </option>
                {(CAR_MODELS_BY_MAKE[carInput.make] || []).map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </label>

            <label className="prediction-field">
              Years Since Manufacture
              <input
                type="number"
                min="1"
                max="25"
                step="1"
                required
                value={carInput.years_since_manufacture}
                onChange={(e) =>
                  setCarInput({ ...carInput, years_since_manufacture: e.target.value })
                }
                placeholder="e.g. made in 2016 = 10"
              />
            </label>

            <label className="prediction-field">
              Mileage (km)
              <input
                type="number"
                min="1000"
                max="600000"
                step="any"
                required
                value={carInput.mileage}
                onChange={(e) =>
                  setCarInput({ ...carInput, mileage: e.target.value })
                }
                placeholder="1000 - 600000"
              />
            </label>

            <label className="prediction-field">
              Condition
              <select
                required
                value={carInput.condition}
                onChange={(e) =>
                  setCarInput({ ...carInput, condition: e.target.value })
                }
              >
                <option value="">Select condition</option>
                {CAR_CONDITIONS.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            className="prediction-submit"
            type="submit"
            disabled={carLoading}
          >
            {carLoading ? "Calculating..." : "Predict Car Price"}
          </button>
        </form>

        {carError && (
          <div className="prediction-error" role="alert">
            {carError}
          </div>
        )}

        {carResult && (
          <div className="prediction-result" aria-live="polite">
            <h4>Estimated Price</h4>

            <p className="prediction-cost">
              TZS {Number(carResult.predicted_price).toLocaleString()}
            </p>

            <p>
              Estimate for a {carResult.input.make} {carResult.input.model} in{" "}
              {carResult.input.condition.toLowerCase()} condition.
            </p>
          </div>
        )}
      </section>

      {/* House Price Prediction AI Section */}
      <section className="prediction-section">
        <h3>House Price Prediction</h3>
        <p className="prediction-description">
          Pick the city and area, then enter the size, bedrooms and age of the house.
        </p>

        <form className="prediction-form" onSubmit={predictHousePrice}>
          <div className="prediction-grid">
            <label className="prediction-field">
              City
              <select
                required
                value={houseInput.city}
                onChange={(e) =>
                  setHouseInput({ ...houseInput, city: e.target.value, location: "" })
                }
              >
                <option value="">Select city</option>
                {Object.keys(HOUSE_LOCATIONS_BY_CITY).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            <label className="prediction-field">
              Location
              <select
                required
                disabled={!houseInput.city}
                value={houseInput.location}
                onChange={(e) =>
                  setHouseInput({ ...houseInput, location: e.target.value })
                }
              >
                <option value="">
                  {houseInput.city ? "Select location" : "Select a city first"}
                </option>
                {(HOUSE_LOCATIONS_BY_CITY[houseInput.city] || []).map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </label>

            <label className="prediction-field">
              Size (sqm)
              <input
                type="number"
                min="30"
                max="800"
                step="any"
                required
                value={houseInput.size}
                onChange={(e) =>
                  setHouseInput({ ...houseInput, size: e.target.value })
                }
                placeholder="30 - 800"
              />
            </label>

            <label className="prediction-field">
              Bedrooms
              <input
                type="number"
                min="1"
                max="8"
                step="1"
                required
                value={houseInput.bedrooms}
                onChange={(e) =>
                  setHouseInput({ ...houseInput, bedrooms: e.target.value })
                }
                placeholder="1 - 8"
              />
            </label>

            <label className="prediction-field">
              Years Since Built
              <input
                type="number"
                min="0"
                max="70"
                step="1"
                required
                value={houseInput.years_since_built}
                onChange={(e) =>
                  setHouseInput({ ...houseInput, years_since_built: e.target.value })
                }
                placeholder="e.g. built in 2016 = 10"
              />
            </label>
          </div>

          <button
            className="prediction-submit"
            type="submit"
            disabled={houseLoading}
          >
            {houseLoading ? "Calculating..." : "Predict House Price"}
          </button>
        </form>

        {houseError && (
          <div className="prediction-error" role="alert">
            {houseError}
          </div>
        )}

        {houseResult && (
          <div className="prediction-result" aria-live="polite">
            <h4>Estimated Price</h4>

            <p className="prediction-cost">
              TZS {Number(houseResult.predicted_price).toLocaleString()}
            </p>

            <p>
              Estimate for a {houseResult.input.bedrooms}-bedroom house in{" "}
              {houseResult.input.location}, {houseResult.input.city}.
            </p>
          </div>
        )}
      </section>

      {/* Delivery Time Prediction AI Section */}
      <section className="prediction-section">
        <h3>Delivery Time Prediction</h3>
        <p className="prediction-description">
          Enter the distance, conditions and courier details to estimate the delivery time.
        </p>

        <form className="prediction-form" onSubmit={predictDeliveryTime}>
          <div className="prediction-grid">
            <label className="prediction-field">
              Distance (km)
              <input
                type="number"
                min="0.4"
                max="20"
                step="any"
                required
                value={deliveryInput.distance}
                onChange={(e) =>
                  setDeliveryInput({ ...deliveryInput, distance: e.target.value })
                }
                placeholder="Restaurant to customer, 0.4 - 20"
              />
            </label>

            <label className="prediction-field">
              Traffic
              <select
                required
                value={deliveryInput.traffic}
                onChange={(e) =>
                  setDeliveryInput({ ...deliveryInput, traffic: e.target.value })
                }
              >
                <option value="">Select traffic</option>
                {DELIVERY_TRAFFIC.map((traffic) => (
                  <option key={traffic} value={traffic}>
                    {traffic}
                  </option>
                ))}
              </select>
            </label>

            <label className="prediction-field">
              Weather
              <select
                required
                value={deliveryInput.weather}
                onChange={(e) =>
                  setDeliveryInput({ ...deliveryInput, weather: e.target.value })
                }
              >
                <option value="">Select weather</option>
                {DELIVERY_WEATHER.map((weather) => (
                  <option key={weather} value={weather}>
                    {weather}
                  </option>
                ))}
              </select>
            </label>

            <label className="prediction-field">
              Courier Vehicle
              <select
                required
                value={deliveryInput.vehicle}
                onChange={(e) =>
                  setDeliveryInput({ ...deliveryInput, vehicle: e.target.value })
                }
              >
                <option value="">Select vehicle</option>
                {DELIVERY_VEHICLES.map((vehicle) => (
                  <option key={vehicle} value={vehicle}>
                    {vehicle}
                  </option>
                ))}
              </select>
            </label>

            <label className="prediction-field">
              Courier Age
              <input
                type="number"
                min="18"
                max="55"
                step="1"
                required
                value={deliveryInput.courier_age}
                onChange={(e) =>
                  setDeliveryInput({ ...deliveryInput, courier_age: e.target.value })
                }
                placeholder="18 - 55"
              />
            </label>

            <label className="prediction-field">
              Courier Rating
              <input
                type="number"
                min="3"
                max="5"
                step="0.1"
                required
                value={deliveryInput.courier_rating}
                onChange={(e) =>
                  setDeliveryInput({ ...deliveryInput, courier_rating: e.target.value })
                }
                placeholder="3.0 - 5.0"
              />
            </label>

            <label className="prediction-field">
              Courier Experience (months)
              <input
                type="number"
                min="1"
                max="120"
                step="1"
                required
                value={deliveryInput.courier_experience}
                onChange={(e) =>
                  setDeliveryInput({ ...deliveryInput, courier_experience: e.target.value })
                }
                placeholder="1 - 120"
              />
            </label>
          </div>

          <button
            className="prediction-submit"
            type="submit"
            disabled={deliveryLoading}
          >
            {deliveryLoading ? "Calculating..." : "Predict Delivery Time"}
          </button>
        </form>

        {deliveryError && (
          <div className="prediction-error" role="alert">
            {deliveryError}
          </div>
        )}

        {deliveryResult && (
          <div className="prediction-result" aria-live="polite">
            <h4>Estimated Delivery Time</h4>

            <p className="prediction-cost">
              {deliveryResult.predicted_minutes} minutes
            </p>

            <p>
              {deliveryResult.input.distance} km by {deliveryResult.input.vehicle.toLowerCase()} in{" "}
              {deliveryResult.input.traffic.toLowerCase()} traffic and {deliveryResult.input.weather.toLowerCase()} weather.
            </p>
          </div>
        )}
      </section>

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
