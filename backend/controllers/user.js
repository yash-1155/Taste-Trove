/* eslint-disable no-undef */
const Listing = require("../models/listing.js"); //require model listing
const mongoose = require("mongoose");
const asyncWrapper = require("../middlewares/async.js");
const { hashSync } = require("bcrypt");
const User = require("../models/user.js");
const { sendMail } = require("../nodeMailer/nodeMailer.js");
const { createResetPasswordToken } = require("./crypto.js");
const crypto = require("crypto");
const { isEmailValid } = require("../nodeMailer/emailValidator.js");
// const loginform=(req, res) => {
//     res.render("users/login.ejs");
// };
const login = async (req, res) => {
  // let { email, password } = req.body;
  // // const newUser = new User({ email, name,password });
  // let result = await User.find({ $and: [{ email: email }, { password: password }] });
  // console.log(result);
  // if (result.length == 0) {
  //     res.send("Enter the valid id and password!");
  // }
  // res.render("users/profile.ejs", { user: result[0] });
  console.log("hello user");
  console.log(req.user);
  if (req.isAuthenticated()) {
    const result = sendMail(req.user.email);
    console.log("email sent successfully " + result);
    res.redirect(
      "https://66e17dcbb78ea4f32c85c627--famous-licorice-a516fd.netlify.app"
    );
  } else {
    res.redirect(
      "https://66e17dcbb78ea4f32c85c627--famous-licorice-a516fd.netlify.app/login"
    );
  }
};
const signUpform = (req, res) => {
  res.render("users/signUp.ejs");
};
const signUp = asyncWrapper(async (req, res) => {
  // let { name, email, password, Cpassword } = req.body;
  const newUser = await User.findOne({
    email: req.body.email,
  });
  if (newUser) {
    return res.send("User already exist");
  }
  const { valid, reason, validators } = await isEmailValid(req.body.email);

  if (!valid) {
    console.log("fake hai re tu!!");
    return res.status(400).send({
      message: "Please provide a valid email address.",
      reason: validators[reason].reason,
    });
  }
  if (req.body.Cpassword === req.body.password) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      Contact: req.body.Contact,
      password: hashSync(req.body.password, 10),
    };
    const new_User = await User.create(data);
    sendMail({
      email: new_User.email,
      subject: "Success",
      text: `Welcome to Taste Trove! 🎉 Thank you for joining our vibrant community of food enthusiasts. Get ready to discover exciting flavors, connect with fellow foodies, and embark on delicious culinary adventures. Happy exploring!`,
    });
    console.log("successfully created");
    res.redirect(
      "https://66e17dcbb78ea4f32c85c627--famous-licorice-a516fd.netlify.app/login"
    );
  }
  // let result = await newUser.save();
});

const logout = asyncWrapper(async (req, res) => {
  console.log("logging out");
  req.logout();
  res.redirect(
    "https://66e17dcbb78ea4f32c85c627--famous-licorice-a516fd.netlify.app/login"
  );
});
const forgotPassword = asyncWrapper(async (req, res) => {
  const forgottedUser = await User.findOne({ email: req.body.email });
  if (!forgottedUser) {
    res.send("you dont exsist. Go back!!! ");
    return;
  }

  const tokenObject = createResetPasswordToken();

  forgottedUser.passwordResetToken = tokenObject.passwordResetToken;
  forgottedUser.passwordResetTokenExpires =
    tokenObject.passwordResetTokenExpires;
  await forgottedUser.save();

  const resetUrl = `${req.protocol}://${req.get("host")}/resetPassword/${
    tokenObject.resetToken
  }`;
  const message = `We have received a passwword reset request. Please use the below link to reset your password\n\n${resetUrl}\n\nAbove link will be expired in 10 minutes.`;
  try {
    await sendMail({
      email: forgottedUser.email,
      subject: "password change request received",
      text: message,
    });
    res.status(200).json({
      status: "success",
      message: "password reset link sendd to user email",
    });
  } catch (error) {
    forgottedUser.passwordResetToken = undefined;
    forgottedUser.passwordResetTokenExpires = undefined;
    forgottedUser.save();
    return error;
  }
});

const resetPassword = asyncWrapper(async (req, res) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    console.log("hello");
    res.json({ message: "token is invalid" });
    return;
  }
  if (req.body.Cpassword === req.body.password) {
    user.password = hashSync(req.body.password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.passwordChangedAt = Date.now();
    await user.save();
    let message = "password changed successfully";
    sendMail({
      email: user.email,
      subject: "password change Status",
      text: message,
    });
    console.log(user);
    res
      .status(200)
      .json({ status: "success", message: "password changed successfully" });
  } else {
    res.json({ message: "password wont match" });
    return;
  }
});
const passwordResetRedirect = async (req, res) => {
  const idToken = req.params;
  const token1 = crypto
    .createHash("sha256")
    .update(idToken.token)
    .digest("hex");
  const userR = await User.findOne({ passwordResetToken: token1 });
  if (userR.passwordResetTokenExpires < Date.now()) {
    userR.passwordResetToken = undefined;
    userR.passwordResetTokenExpires = undefined;
    userR.passwordChangedAt = undefined;

    return res
      .status(400)
      .redirect(
        "https://66e17dcbb78ea4f32c85c627--famous-licorice-a516fd.netlify.app/login"
      );
  }

  res.redirect(
    `https://66e17dcbb78ea4f32c85c627--famous-licorice-a516fd.netlify.app/login/resetPassword/${idToken.token}`
  );
};
module.exports = {
  signUpform,
  login,
  signUp,
  logout,
  forgotPassword,
  resetPassword,
  passwordResetRedirect,
};
