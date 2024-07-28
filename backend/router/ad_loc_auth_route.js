const express=require("express")
const router=express.Router()
const passport=require("passport")
const {loginform, login, signUp, logout,forgotPassword,resetPassword}=require("../controllers/admin.js")

// router.route("/register").get(signUpform)
router.route("/register").post(signUp)
router.route("/login").get(loginform)
router.route("/login").post(passport.authenticate("local-admin"),login)
router.route("/logout").get(logout)
router.route("/forgotPassword").post(forgotPassword)
router.route("/resetPassword/:token").patch(resetPassword)
module.exports=router