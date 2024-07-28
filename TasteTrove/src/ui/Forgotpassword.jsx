import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import "./Forgotpassword.css";


// const history = useHistory();

const SignInForm = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "", selectValue: "" });
  const [flag, setFlag] = useState(false);
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/forgotpassword", credentials).then((response) => {
      console.log(response);
      setFlag(true);
      window.open("http://localhost:5173/login","_self")

    //   alert('Password has been reset! Please check your inbox');
    }).catch((error)=>{
        console.log(error);
        alert('Error occurred while sending the mail. Please try again later')
    })
    // e.submit();
    // <Link to={"/login"}></Link>
  };

  return (
    <div className="login-container" id="container">
      
      <div className="form-container forgot-password">
        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit}>
          <h1>Forgot Password</h1>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={onchange}
            required
          />
          <button type="submit" >Reset Password</button>
        </form>
       
        


        
        
      </div>
      <div className="toggle-container">
       
      </div>
    </div>
  );
};

export default SignInForm;
