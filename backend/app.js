/* eslint-disable no-undef */
//setup ffbfnbnf
const express = require("express");
const app = express();
const connectDB = require("./connect/connect.js");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cookieSession = require("cookie-session");
const passport = require("passport");
const expressSession = require("express-session");
const Listing = require("./models/listing"); //require model listing
const Admin = require("./models/admin"); //require model Admin
const User = require("./models/user"); //require model User

// const bcrypt = require('bcrypt');
const bcrypt = require("bcryptjs");

const Review = require("./models/reviews");
// const dish=require("./models/dish.js")
const route1 = require("./router/route.js");

const listing_route = require("./router/route.js");
// const dish_route = require("./router/dish_route.js");

const reviewRoute = require("./router/reviews.js");

const goo_auth_route = require("./router/goo_auth_route.js");

const ad_goo_auth_route = require("./router/ad_goo_auth_route.js");
const order_route = require("./router/order_route.js");

const loc_auth_route = require("./router/loc_auth_route.js");
const ad_loc_auth_route = require("./router/ad_loc_auth_route.js");
const profileroute = require("./router/profile_route.js");
const errorHandler = require("./middlewares/error-handler.js");
const notfound = require("./middlewares/notfound.js");
//for using ejs files this setup requires
const path = require("path");
require("./authentication/passport_set.js");
// require("./authentication/passport_set_admin.js")
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use(
  cors({
    origin: "https://eloquent-cannoli-5fbaf6.netlify.app",
    methods: "GET,PUT,POST,DELETE,PATCH",
    credentials: true,
  })
);
// for parsing data using res and request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//for method override i.e.Post put
const methodOverride = require("method-override");
const asyncWrapper = require("./middlewares/async.js");
app.use(methodOverride("_method"));
// initializingPassport(passport);
app.use(
  expressSession({
    secret: process.env.secret,
    saveUninitialized: true,
    resave: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 7 days
      // httpOnly: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
//http://localhost:3000/Owner/listings/:id
//http://localhost:3000/Owner/listings/${id}

app.put("/Owner/listings/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // console.log(req.params.id)
    // console.log(req.body);
    res.status(200).json(admin);
  } catch (error) {
    console.log(error);
  }
});

app.put("/User/listings/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // console.log(req.params.id)
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

//http://localhost:3000/Owner/listings/6613c75baa3d6577f855a881
app.get("/Owner/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listings = await Listing.find({ owner: id }).populate("reviews");
  res.send(listings);
});

app.get("/Owner/:id", async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let user = await Admin.findOne({ _id: id }).populate("listings");
  // console.log(user);
  res.send(user);
});
app.get("/User/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  // 661b74a176079a0b8ec9871e
  let user = await User.findOne({ _id: id });
  console.log(user);
  res.send(user);
});

// app.use('/listing',route1)
// app.use('/dish',dish_route)
// app.use('/listing/:id', reviewRoute)//for reviews route
app.use("/auth", goo_auth_route);
app.use("/", loc_auth_route);
app.use("/admin", ad_loc_auth_route);
app.use("/admin/auth", ad_goo_auth_route);
app.use("/profile", profileroute);
app.use("/order", order_route);

app.use("/listings", listing_route); // listings router required
app.use("/listing/:id/reviews", reviewRoute); //for reviews route

app.get(
  "/users",
  asyncWrapper(async (req, res) => {
    if (req.user) {
      console.log(req.user);
      res.status(200).send(req.user);
    } else {
      res.status(400).json({ message: "unAuthorized" });
    }
  })
);

app.get("/getreq", async (req, res) => {
  console.log(req.user);
  res.send(req.user);
});
app.use(notfound);
app.use(errorHandler);
// const port=process.env.PORT || 3000;
//connection to DB using mongo atlas
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log("server running at 3000");
    });
  } catch (error) {
    console.log(error);
  }
};
start();

// app.get('/listing/:id/reviews', async (req, res) => {
// //   console.log('get(/listing/:id/reviews)');
// //   console.log(req.user);
//   try {
//     const listing = await Listing.findById(req.params.id).populate('reviews')
//     // console.log(listing.reviews)
//     res.status(200).json(listing.reviews);
//   } catch (error) {
//     res.status(500).json({ "error": error })
//   }
// })

// app.post('/listing/:id/reviews', async (req, res) => {
//   console.log('post(/listing/:id/reviews)')
//   let { id } = req.params;
//   let listing = await Listing.findById(id);
//   let newreview = new Review(req.body);
//   listing.reviews.push(newreview);
//   await newreview.save();
// //   console.log(req.user);
//   await listing.save();
//   res.status(200).json(newreview);
// })

// app.delete('/listing/:id/:reviewId/reviews', async (req, res) => {
//     console.log('post(/listing/:id/reviews/listing)')
//   let { id, reviewId } = req.params;
//   await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });//remove review from reviews array whose id=reviewId
//   let review = await Review.findByIdAndDelete(reviewId);
//   console.log(review);
//   res.status(200).json(review);
// })

// app.get('/listings', asyncWrapper( async (req, res) => {

//     let User_id={
//         id:0
//     };
//     if(req.user){
//         User_id={
//             id:req.user.id
//         }
//     }
//     let result = await Listing.find({});
//     res.render("index.ejs", { result , User_id })
// }))
// app.get('/dishes',asyncWrapper(async(req,res)=>{
// let items=await dish.find();
// console.log(items)
// res.render("dish_show.ejs",{items})
// }))
// // to render new form
// app.get('/new', async (req, res) => {
// res.render("new.ejs");
// })
// to render new form
//see all data
