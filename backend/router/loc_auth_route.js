/* eslint-disable no-undef */
const express=require("express")
const router=express.Router()
const passport=require("passport")
const { login, signUpform, signUp, logout,forgotPassword,resetPassword,passwordResetRedirect}=require("../controllers/user.js")

router.route("/register").get(signUpform)
router.route("/register").post(signUp)
// router.route("/login").get(loginform)
router.route("/login").post(passport.authenticate("local-user"),login)
router.route("/logout").get(logout)
router.route("/forgotPassword").post(forgotPassword)
router.route("/resetPassword/:token").get(passwordResetRedirect)
router.route("/resetPassword/:token").patch(resetPassword)
module.exports=router