import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SignInForm.css";
import img1 from "../SignInForm/google-icon.png";

const SignInForm = () => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    name:"",
    Contact:"",
    password: "",
    Cpassword: "",
    selectValue: "",
  });

  // Function to handle Google sign-in
  const handleGoogleSignIn = () => {
    // Implement the logic for Google Sign-In here
    window.open("http://localhost:3000/auth/google", "_self");
    console.log("Google Sign-In clicked");
  };
  const handleAdminGoogleSignIn = () => {
    // Implement the logic for Google Sign-In here
    window.open("http://localhost:3000/admin/auth/google", "_self");
    console.log("Google Admin Sign-In clicked");
  };
  // useEffect(() => {
  //   // Initialize the Google Sign-In API
  //   window.gapi.load("auth2", () => {
  //     window.gapi.auth2.init({
  //       client_id:
  //         "1058587229640-l8l88469liuouqr6sndpvqr4infk5h21.apps.googleusercontent.com", // Replace with your Google Client ID
  //     });
  //   });
  // }, []);

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted");
  };

  return (
    <div className="container mt-4 max-w-screen-sm">
      <div className="heading">Sign Up</div>
      <select
        name="selectValue"
        id=""
        value={credentials.selectValue}
        title="Select the login type"
        onChange={onchange}
      >
        <option value="Select">--Select--</option>
        <option value="MessOwner">Mess Owner</option>
        <option value="Customer">Customer</option>
      </select>
      {credentials.selectValue == "Customer" ? (
        <>
          <form
            action="http://localhost:3000/register"
            method="post"
            className="form"
          >
            <input
              required
              className="input"
              type="name"
              name="name"
              id="name"
              placeholder="Enter Name"
              value={credentials.name}
              onChange={onchange}
            />
            <input
              required
              className="input"
              type="Number"
              name="Contact"
              id="number"
              placeholder="Enter Number"
              value={credentials.Contact}
              onChange={onchange}
            />
            <input
              required
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="Enter E-mail"
              value={credentials.email}
              onChange={onchange}
            />
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
            <input
              required
              className="input"
              type="password"
              name="Cpassword"
              id="password"
              placeholder="Confirm Password"
              value={credentials.Cpassword}
              onChange={onchange}
            />
            {/* <input type="checkbox" id="admin" name="admin" value={"admin"} />
              <label htmlFor="">Admin</label> */}
            {/* <br /> */}
            {/* <input type="checkbox" id="user" name="user" value={"user"} />
              <label htmlFor="">User</label> */}
            <span className="forgot-password">
              <Link to="/login/forgotpassword">Forgot Password ?</Link>
            </span>
            <input className="login-button" type="submit" value="Sign Up" />
          </form>
          <div className="social-account-container">
            <span className="title">Or Sign Up with</span>
            <div className="social-accounts">
              {/* Add Google Sign-In button with Google symbol */}
              {/* <Link to="http://localhost:3000/auth/google"> */}
              <button className="" onClick={handleGoogleSignIn}>
                <img src={img1} alt="google-icon" />
              </button>
              {/* </Link> */}
            </div>
            <div className="mt-3 ml-56 font-serif">
              Already have an account ?<br />
              <Link to="/login">
                {" "}
                <span className="ml-11 ml-12 text-red-400"> Sign In </span>
              </Link>
            </div>
          </div>
        </>
      ) : credentials.selectValue == "MessOwner" ? (
        <>
          <form
            action="http://localhost:3000/admin/register"
            method="post"
            className="form"
          >
            <input
              required
              className="input"
              type="name"
              name="name"
              id="name"
              placeholder="Enter Name"
              value={credentials.name}
              onChange={onchange}
            />
            <input
              required
              className="input"
              type="Number"
              name="Contact"
              id="number"
              placeholder="Enter Number"
              value={credentials.Contact}
              onChange={onchange}
            />
            <input
              required
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="Enter E-mail"
              value={credentials.email}
              onChange={onchange}
            />
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
            <input
              required
              className="input"
              type="password"
              name="Cpassword"
              id="password"
              placeholder="Confirm Password"
              value={credentials.Cpassword}
              onChange={onchange}
            />
            {/* <input type="checkbox" id="admin" name="admin" value={"admin"} />
              <label htmlFor="">Admin</label> */}
            {/* <br /> */}
            {/* <input type="checkbox" id="user" name="user" value={"user"} />
              <label htmlFor="">User</label> */}
            <span className="forgot-password">
              <Link to="#">Forgot Password ?</Link>
            </span>
            <input className="login-button" type="submit" value="Sign Up" />
          </form>
          <div className="social-account-container">
            <span className="title">Or Sign Up with</span>
            <div className="social-accounts">
              {/* Add Google Sign-In button with Google symbol */}
              {/* <Link to="http://localhost:3000/auth/google"> */}
              <button className="" onClick={handleAdminGoogleSignIn}>
                <img src={img1} />
              </button>
              {/* </Link> */}
            </div>
            <div className="mt-3 ml-56 font-serif">
              Already have an account ?
              <br />
              <Link to="/login">
                {" "}
                <span className="ml-11 ml-12 text-red-400"> Sign In </span>
              </Link>
            </div>
          </div>
        </>
      ) : (
        " "
      )}
      <span className="agreement">
        <Link to="#">Learn user license agreement</Link>
      </span>
    </div>
  );
};

export default SignInForm;
