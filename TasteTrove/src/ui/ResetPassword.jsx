import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

import { Link, Navigate,useParams } from "react-router-dom";
import axios from 'axios';
import "./ResetPassword.css";


// const history = useHistory();

// const { bid } = useParams();

const Resetpassword = () => {
    const { token } = useParams();

  const [credentials, setCredentials] = useState({  password: "", Cpassword: "" });
  const [flag, setFlag] = useState(false);
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(token)
    axios.patch(`http://localhost:3000/resetpassword/${token}`, credentials,{withCredentials:true}).then((res) => {
      if(res.status==200){
        alert("Your Password is Successfully Updated")
      }
            window.open("http://localhost:5173/login","_self")
    }).catch((error)=>{
      console.log(error)
    })
    // axios.post("http://localhost:3000/forgotpassword", credentials).then((response) => {
    //   console.log(response);
    //   setFlag(true);
    //   window.open("http://localhost:5173/login","_self")

    // //   alert('Password has been reset! Please check your inbox');
    // }).catch((error)=>{
    //     console.log(error);
    //     alert('Error occurred while sending the mail. Please try again later')
    // })
    // e.submit();
    // <Link to={"/login"}></Link>
  };

  return (
    <div className="login-container" id="container">
      
      <div className="form-container forgot-password">
        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <input
                required
                className="input"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={credentials.password}
                onChange={onchange}
              />
              <br />
              <input
                required
                className="input"
                type="password"
                name="Cpassword"
                id="cpassword"
                placeholder="Confirm Password"
                value={credentials.Cpassword}
                onChange={onchange}
              />
          <button type="submit" >Reset Password</button>
        </form>
       {/* { flag ? <Link to="/login"/> : <Link to="/login/forgotpassword"/>} */}
       {/* <Link to="/login"></Link> */}
        


        
        
      </div>
      <div className="toggle-container">
        {/* Toggle Buttons */}
        {/* Existing Code */}
      </div>
    </div>
  );
};

export default Resetpassword;
