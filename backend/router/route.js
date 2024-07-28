/* eslint-disable no-undef */
// const express=require('express')
// const router=express.Router();

// const {createNewData,editData,editDataForm,getOneData,deleteOneData}=require('../controllers/controllers.js')

// router.route('/').post(createNewData)
// router.route('/:id').put(editData).get(getOneData).delete(deleteOneData)
// router.route('/:id/edit').get(editDataForm)
// module.exports=router

const express = require('express')
const router = express.Router();
const Listing = require("../models/listing.js"); //require model listing

// parsing file image to upload folder
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const Admin = require('../models/admin.js');
const upload = multer({ storage });//remotely store at folder



// const {createNewData,editData,editDataForm,getOneData,deleteOneData}=require('../controllers/controllers.js')

// router.route('/').post(upload.single('listing[image]'),createNewData)
// router.route('/:id').put(upload.single('listing[image]'),editData).get(getOneData).delete(deleteOneData)
// router.route('/:id/edit').get(editDataForm)
// module.exports=router
// axios.get(`http://localhost:3000/listing/${bid}/reviews`)

router.get('/', async (req, res) => {
  console.log(req.user);
  try {
    const listings = await Listing.find().populate('reviews')
    res.status(200).json(listings)
  } catch (error) {
    res.status(500).json({ "error": error })
  }
})


//POST
router.post('/', upload.single('image'), async (req, res) => {

  let url = req.file.path;
  let filename = req.file.filename;

  try {
    const newlisting = new Listing(req.body)
    newlisting.image = { url, filename };
    if (req.user) {
      console.log("user is loged in!");
      newlisting.owner = req.user._id;
    }

    // let newreview = new Review(req.body);
    // listing.reviews.push(newreview);
    await newlisting.save()
    console.log(req.user._id);
    const admin = await Admin.findOne({_id:req.user._id });
    console.log("here is admin");
    console.log(admin);
    console.log(newlisting);
    await newlisting.save();
    if (admin) {
      admin.listings.push(newlisting);
    }
    await admin.save();
    console.log(admin);
    res.json(newlisting)
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:id/dish/:day/:type/:name', async (req, res) => {
  const { id, day, type, name } = req.params;
  try {
    // Find the listing by ID
    const listing = await Listing.findById(id);
    const temp = listing.days[day];
    const dishIndex = listing.days[day][type].findIndex(d => d === name);
    if (dishIndex === -1) {
      return res.status(404).json({ error: 'Dish not found in the specified type of meal' });
    }
    await listing.days[day][type].splice(dishIndex, 1);
    await listing.save();
    res.status(200).json({ message: 'Dish removed successfully' });
  } catch (error) {
    console.error('Error removing dish:', error);
    res.status(500).json({ error: 'sidd server error' });
  }

});


//GET SINGLE LISTING
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("owner")
    console.log(listing);
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ "error": error })
  }
})


router.put('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(listing);
  } catch (error) {
    console.log(error);
  }
})
router.delete('/:id', async (req, res) => {
  try {
    const listings = await Listing.findByIdAndDelete(req.params.id);
    console.log(listings);
    await Admin.findByIdAndUpdate(listings.owner._id, { $pull: { listings: req.params.id } })
    res.status(200).json(listings);
  } catch (error) {
    console.error(error)
  }
})

router.post('/:id/weeklymenu', async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  const dayName = req.body.dayname; // Assuming dayname is sent in the request body

  // Access the particular day using the dayName
  const day = listing.days[dayName];
  const type = req.body.type;
  await day[type].push(req.body.dishname);
  console.log(listing.days);
  // day.save();
  // listing.days.save();

  listing.save();
  res.json(listing.days);
})

module.exports = router