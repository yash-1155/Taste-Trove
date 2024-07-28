const express=require("express")
const router=express.Router()
const {logout,protected, redirect,sendUser,timepass}=require("../controllers/goo_auth_controllers.js")
const passport = require("passport")

// router.route("/login").get(login)
// router.route("/").get(timepass)
router.route("/logout").get(logout)
router.route('/google').get(passport.authenticate('google-user',{
    scope:['profile','email']
}))
router.route('/google/redirect').get(passport.authenticate('google-user'),redirect)
router.route("/protected").get(protected)
router.route("/user").get(sendUser)
module.exports=router