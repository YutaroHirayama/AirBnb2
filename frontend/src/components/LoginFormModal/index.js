// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Link } from 'react-router-dom'

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const login = await dispatch(sessionActions.login({ credential, password }))
    if(login) {
      if(login.errors) {
        setErrors(login.errors);
      } else {
        closeModal();
      }
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
      .then(closeModal);

  };

  return (
    <div className='modal-container'>
      <h1>Log In</h1>
      {errors.credential && (
          <p className='errors'>{errors.credential}</p>
        )}
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button disabled={credential.length < 4 || password.length < 6} className={(credential.length < 4 || password.length < 6) ? 'disabled login-button' : 'enabled login-button'} type="submit">Log In</button>

        <Link >
          <div className='demo-user' onClick={demoUser}>Demo User</div>
        </Link>
      </form>
    </div>
  );
}

export default LoginFormModal;
