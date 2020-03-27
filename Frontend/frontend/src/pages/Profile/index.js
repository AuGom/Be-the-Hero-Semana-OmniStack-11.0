import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import "./styles.css";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";
import { useState } from "react";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  const ngoName = localStorage.getItem("ngoName");
  const ngoId = localStorage.getItem("ngoId");

  useEffect(() => {
    api
      .get("profile", {
        headers: { Authorization: ngoId }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ngoId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete("incidents/" + id, {
        headers: {
          Authorization: ngoId
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert("Delete error, try again.");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Welcome, {ngoName}</span>
        <Link className="button" to="/incidents/new">
          New Incident
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Registered cases</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Incident:</strong>
            <p>{incident.title}</p>
            <strong>Description:</strong>
            <p>{incident.description}</p>
            <strong>Value:</strong>
            <p>
              {Intl.NumberFormat("us-EN", {
                style: "currency",
                currency: "USD"
              }).format(incident.value)}
            </p>
            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
