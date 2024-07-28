// /* eslint-disable no-undef */
// const dish = require('../models/dish.js')
// const listing = require('../models/listing.js')
// const mongoose = require('mongoose')
// var mess_id;
// var messid;
// const asyncWrapper = require('../middlewares/async.js')

// const createNewForm = asyncWrapper(async (req, res) => {
//     messid = req.params.id
//     mess_id = new mongoose.Types.ObjectId(messid);
//     res.status(200).render("dish_newform.ejs")
// })

// const createNewDish = asyncWrapper(async (req, res) => {

//     console.log(mess_id)

//     let obj = {
//         name: req.body.name,
//         rating: req.body.rating,
//         price: req.body.price,
//         description: req.body.description,
//         listing: new mongoose.Types.ObjectId(mess_id)
//     }
//     // console.log(obj.listing)
//     const dish1 = await dish.create(obj)
//     console.log("i am adding to list")
//     let add_to_list = await listing.findByIdAndUpdate(mess_id, { $push: { dishes: dish1.id } }, { new: true })
//     console.log(add_to_list)

//     res.redirect("/dishes")
// })

// const showDishes = asyncWrapper(async (req, res) => {
   
//     let id = req.params.id;
//     id = new mongoose.Types.ObjectId(id);
//     const list2 = await listing.findById(id)
//     var items = [];
//     let listing_arr = list2.dishes
//     for (let i = 0; i < listing_arr.length; i++) {
//         let val = listing_arr[i]
//         items.push(await dish.findById(val))
//     }
//     console.log("see all dishes")
//     res.status(200).render("dish_show.ejs", { items })
// })

// const updateOneForm = asyncWrapper(async (req, res) => {
//     console.log("Reached updateOneForm route");
//     let id = req.params
//     id = new mongoose.Types.ObjectId(id)
//     console.log(id)
//     let dishes = await dish.findById(id)
//     console.log(dishes);

//     res.render("dish_edit.ejs", { dishes })

// })

// const updateOne = asyncWrapper(async (req, res) => {
//     let id = req.params.id
//     let update_data = req.body
//     const dish3 = await dish.findByIdAndUpdate(id, update_data, {
//         returnOriginal: false
//     })
//     res.redirect("/listings")
// })

// const deleteOne = asyncWrapper(async (req, res) => {
//     let id = req.params.id

//     const dish4 = await dish.findByIdAndDelete(id)
//     let id_list = dish4.listing
//     console.log("updating the list");
//     for (let i = 0; i < id_list.length; i++) {
//         const listingId = id_list[i];

//         const updatedListing = await listing.findByIdAndUpdate(
//             listingId,
//             { $pull: { dishes: id } },
//             { new: true }
//         );

//         console.log('Updated listing:', updatedListing);
//     }
//     console.log("list updated succesfull !!");

//     console.log("deleted succesfully")
//     res.redirect("/dishes")
// })

// module.exports = { createNewDish, updateOne, deleteOne, createNewForm, updateOneForm, showDishes }