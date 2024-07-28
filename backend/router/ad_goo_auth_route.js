const express=require("express")
const router=express.Router()
const {logout,protected, redirect,sendUser,timepass}=require("../controllers/ad_goo_auth_controller.js")
const passport = require("passport")

// router.route("/login").get(login)
// router.route("/").get(timepass)
router.route("/logout").get(logout)
router.route('/google').get(passport.authenticate('google-admin',{
    scope:['profile','email']
}))
router.route('/google/redirect').get(passport.authenticate('google-admin'),redirect)
router.route("/protected").get(protected)
router.route("/user").get(sendUser)
module.exports=router