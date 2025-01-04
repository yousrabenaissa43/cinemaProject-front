import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UtilisateurLogin = () => {
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isAddingBalance, setIsAddingBalance] = useState(false);
  const [newBalance, setNewBalance] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/cinemaProject/api/utilisateur/init?username=${username}&password=${password}`
      );
      setUserId(response.data.userId);
      setIsLoggedIn(true);
      setErrorMessage("");
      setSuccessMessage("Login successful.");
      fetchUserDetails();
    } catch (error) {
      setErrorMessage(error.response?.data || "Login failed.");
      setSuccessMessage("");
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cinemaProject/api/utilisateur/compte");
      setUserDetails(response.data);
      setErrorMessage("");
      setSuccessMessage("");
    } catch (error) {
      setErrorMessage("Failed to fetch user details.");
    }
  };

  const handleAddBalance = async () => {
    if (newBalance && parseFloat(newBalance) > 0) {
      try {
        await axios.put(
          `http://localhost:8080/cinemaProject/api/utilisateur/solde?amount=${newBalance}`
        );
        setSuccessMessage(`Added ${newBalance} to balance successfully.`);
        setErrorMessage("");
        fetchUserDetails();
        setIsAddingBalance(false);
        setNewBalance("");
      } catch (error) {
        setErrorMessage("Failed to add balance.");
        setSuccessMessage("");
      }
    } else {
      setErrorMessage("Invalid amount.");
    }
  };

  const handleUpdateDetails = async () => {
    try {
      await axios.put(
        `http://localhost:8080/cinemaProject/api/utilisateur/update?newUsername=${newUsername}&newPassword=${newPassword}`
      );
      setSuccessMessage("User details updated successfully.");
      setErrorMessage("");
      fetchUserDetails();
      setIsUpdating(false);
    } catch (error) {
      setErrorMessage("Failed to update user details.");
      setSuccessMessage("");
    }
  };

  const handleToggleUpdateForm = () => {
    setIsUpdating(!isUpdating);
    setNewUsername(userDetails?.name || "");
    setNewPassword("");
  };

  const handleToggleAddBalanceForm = () => {
    setIsAddingBalance(!isAddingBalance);
    setNewBalance("");
  };

  const handleReserveSeat = () => {
    navigate(`/seance/reserve-seat?userId=${userId}`);
  };

  return (
    <>
      {!isLoggedIn ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
      ) : (
        <div style={styles.container}>
          <h1 style={styles.header}>User Details</h1>
          {userDetails ? (
            <div style={styles.details}>
              <p>
                <strong>ID:</strong> {userDetails.id}
              </p>
              <p>
                <strong>Name:</strong> {userDetails.name}
              </p>
              <p>
                <strong>Password:</strong> {userDetails.password}
              </p>
              <p>
                <strong>Balance:</strong> {userDetails.solde} Dinars
              </p>
            </div>
          ) : (
            <p>Loading user details...</p>
          )}
          {errorMessage && <p style={styles.error}>{errorMessage}</p>}
          {successMessage && <p style={styles.success}>{successMessage}</p>}
          <div style={styles.buttons}>
            <button onClick={fetchUserDetails} style={styles.button}>
              Refresh Details
            </button>
            <button onClick={handleToggleAddBalanceForm} style={styles.button}>
              Add Balance
            </button>
            {isAddingBalance && (
            <div style={styles.updateForm}>
              <h2>Add Balance</h2>
              <label htmlFor="newBalance">Amount:</label>
              <input
                type="number"
                id="newBalance"
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
              />
              <button onClick={handleAddBalance} style={styles.button}>
                Add
              </button>
              <button onClick={handleToggleAddBalanceForm} style={styles.button}>
                Cancel
              </button>
            </div>
          )}
            <button onClick={handleToggleUpdateForm} style={styles.button}>
              Update Details
            </button>
            
            {isUpdating && (
            <div style={styles.updateForm}>
              <h2>Update User Details</h2>
              <label htmlFor="newUsername">New Username:</label>
              <input
                type="text"
                id="newUsername"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button onClick={handleUpdateDetails} style={styles.button}>
                Save Changes
              </button>
              <button onClick={handleToggleUpdateForm} style={styles.button}>
                Cancel
              </button>
            </div>
          )}
            <button onClick={handleReserveSeat} style={styles.button}>
              Reserve Seat
            </button>
          </div>

        </div>
      )}
    </>
  );
};

const styles = {
  form: {
    maxWidth: "400px",
    margin: "20px auto",
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  container: {
    margin: "20px auto",
    padding: "20px",
    maxWidth: "400px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  header: {
    marginBottom: "20px",
  },
  details: {
    textAlign: "left",
    marginBottom: "20px",
    fontSize: "16px",
  },
  error: {
    color: "red",
  },
  success: {
    color: "green",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px",
  },
  button: {
    marginRight: "20px",
    marginLeft: "20px",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  updateForm: {
    padding: "20px",
    backgroundColor: "#e9e9e9",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
};

export default UtilisateurLogin;
