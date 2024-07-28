/* eslint-disable no-undef */
const Listing = require("../models/listing.js")//require model listing
const mongoose=require('mongoose')
const asyncWrapper=require('../middlewares/async.js')
// const getAllData=async(req,res)=>{
//     let result = await Listing.find({});
//     console.log("/listings");
//     console.log(result);
//     res.render("index.ejs", { result })
// }
const createNewData=asyncWrapper(async (req, res) => {
    let listing = req.body.listing;
    const newlisting = new Listing(listing)
    await newlisting.save()
    res.redirect("/listings");
})

const editData= asyncWrapper( async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");
})

const editDataForm=asyncWrapper( async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    // console.log(listing);
    res.render("edit.ejs", { listing });
})
const getOneData=asyncWrapper( async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    // console.log(listing);
    res.render("show.ejs", { listing });
})
const deleteOneData=asyncWrapper( async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    // console.log(listing);
    res.redirect("/listings");
})
module.exports={createNewData,editData,editDataForm,getOneData,deleteOneData}