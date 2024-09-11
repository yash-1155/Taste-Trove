/* eslint-disable no-undef */
const listing = require("../models/listing");
const mongoose = require("mongoose");
const user = require("../models/user");
const admin = require("../models/admin");
const order = require("../models/order");
const { sendMessage } = require("./whatsapp/sendMessage");
const createOrder = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const userPhno = req.body.phone;
      const amount = req.body.totalAmount;
      const listingId = req.params.listingid;
      const listingData = await listing.findById(listingId);
      const userId = req.user.id;
      const userData = await user.findById(userId);
      const adid = listingData.owner;
      const aduser = await admin.findById(adid);
      const adphone = String(aduser.Contact);

      const orderData = {
        amount: amount,
        listings: listingId,
        user: userId,
        messContact: adphone,
        userContact: userPhno,
      };

      const createdOrder = await order.create(orderData);

      listingData.orders.push({ orderId: createdOrder._id, userid: userId });
      userData.orders.push({ orderId: createdOrder._id, listingid: listingId });

      await listingData.save();
      await userData.save();

      sendMessage(adphone, createdOrder._id);
      sendMessage(userPhno, createdOrder._id);

      res.json({ message: "Order filed successfully" });
      console.log("Order filed successfully");
    } else {
      console.log("Login kar bhai");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrder = async (req, res) => {
  console.log("hello" + req.isAuthenticated());
  if (req.isAuthenticated()) {
    const userPhno = req.body.phone;

    const userid = req.params.userid;

    const User = await user.findById(userid);
    const listingidvalue = User.orders;
    const Messname1 = await listing.findById(listingidvalue);
    // const idvalue="6589ad9b99905df3c8e80bee"
    console.log(User);
    const adid = Messname1.owner;
    // const did=new mongoose.Types.ObjectId(adid);
    // console.log(did);
    Messname1.orders.pop();
    User.orders.pop();
    await Messname1.save();
    await User.save();
    const aduser = await admin.findById(adid);
    console.log(aduser);
    // const adphone=aduser.Contact
    // sendMessage(adphone,userPhno)
    res.json({ message: "order filed successfull" });
    console.log("order filed successfull");
  } else {
    console.log("login in kar bhai");
  }
};
const getOrder = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const userId = req.params.userid;

      const userData = await user.findById(userId);

      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }

      const ordersData = userData.orders;

      let orderList = [];

      for (let order1 of ordersData) {
        const listingData = await listing.findById(order1.listingid);
        const orderDataValue = await order.findById(order1.orderId);
        orderList.push({ order: orderDataValue, listing: listingData });
      }

      console.log(orderList);
      res.json(orderList);
    } else {
      res.redirect("https://eloquent-cannoli-5fbaf6.netlify.app/login");
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getOrdersForAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminid;
    const adminData = await admin.findById(adminId);

    if (!adminData) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const listingId = adminData.listings;
    var orderList = [];
    for (let listingsdata of listingId) {
      const listingData = await listing.findById(listingsdata);
      console.log(listingData);
      if (!listingData) {
        // return res.status(404).json({ message: "Listing not found" });
        continue;
      }
      const ordersData = listingData.orders;

      for (let order1 of ordersData) {
        const userData = await user.findById(order1.userid);
        const orderDataValue = await order.findById(order1.orderId);
        orderList.push({ order: orderDataValue, user: userData });
      }
    }

    console.log(orderList);
    res.json(orderList);
  } catch (error) {
    console.error("Error fetching orders for admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const getOrdersForAdmin = async (req, res) => {
//     try {
//         const adminId = req.params.adminid;
//         const adminData = await admin.findById(adminId);

//         if (!adminData) {
//             return res.status(404).json({ message: "Admin not found" });
//         }

//         const listingId = adminData.listings;

//         const listingData = await listing.findById(listingId);

//         for (let listingid of listingId) {
//             const listingData = await listing.findById(listingid);
//         }
//         if (!listingData) {
//             return res.status(404).json({ message: "Listing not found" });
//         }

//         const ordersData = listingData.orders;

//         let orderList = [];

//         for (let order1 of ordersData) {
//             const userData = await user.findById(order1.userid);
//             const orderDataValue = await order.findById(order1.orderId);
//             orderList.push({ order: orderDataValue, user: userData });
//         }

//         console.log(orderList)
//         res.json(orderList);
//     } catch (error) {
//         console.error("Error fetching orders for admin:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }

module.exports = { createOrder, updateOrder, getOrder, getOrdersForAdmin };
