import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreateUser = async () => {
    try {
        const response = await axios.post(`http://localhost:8080/cinemaProject/api/utilisateur/create?username=${username}&password=${password}`);
        if (response.status === 201) {
            setMessage(response.data);  
        }
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data); 
        } else {
            setMessage("An unexpected error occurred");
        }
    }
};

  return (
    <div
      style={{
        width: "300px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Create User</h2>
      <div>
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="username"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
            required
          />
        </div>
        <button
         onClick={handleCreateUser}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a7a5",
            color: "black;",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Create User
        </button>
      </div>
      {message && (
        <p
          style={{
            marginTop: "10px",
            color: isSuccess ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateUser;
