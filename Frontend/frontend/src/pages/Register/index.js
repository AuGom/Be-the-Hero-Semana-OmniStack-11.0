import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [fs, setFs] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = { name, email, phone, city, fs };

    try {
      const response = await api.post("ngos", data);
      const id = response.data.id;
      alert("Your access ID: " + id);
      history.push("/");
    } catch (err) {
      alert("Something wrong happened. Try again, please.");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Register</h1>
          <p>Register, login and make easy for people to find your NGO.</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Already registered?
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="NGO"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="FS"
              style={{ width: 80 }}
              value={fs}
              onChange={e => setFs(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
