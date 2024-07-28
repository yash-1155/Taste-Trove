/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsStarFill, BsCursor, BsStarHalf } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  increaseCount,
  decreaseCount,
} from "./store/addTocart";

// import { useSelector } from "react-redux";
import "./MessItem.css";
import image1 from "./placeholder.png";

// import AllData from "./AllData";
const MessItem = (listing) => {
  // console.log(listing.listing);
  const {
    _id,
    name,
    rating,
    pricePerMeal,
    pricePerMonth,
    image,
    address,
    days,
    latitude,
    longitude,
    MorningStart,
    MorningEnd,
    NightStart,
    NightEnd,
    OpearationalDirectives,
  } = listing.listing;

  const userData = useSelector((state) => state.userdata);
  const navigate = useNavigate();

  const deleteListing = async (id) => {
    axios.delete(`http://localhost:3000/listings/${id}`);
    // getData()
  };
  const dispatch = useDispatch();
  const handleAddToCart = (e) => {
    e.preventDefault();
    console.log(listing.listing);
    dispatch(addItem(listing.listing));
    const userid = userData[0]._id;
    // console.log(userid)
    const url = `/cart/${_id}`;
    navigate(url);
  };

  return (
    <div className="card">
      <div
        className="p-2"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <div className="hover:scale-105 transition-transform duration-300">
          <a href={`listings/${_id}`}>
            <img
              className="image"
              src={image.url}
              alt="Description of the image"
            />
          </a>
        </div>
        <br></br>
        <div>
          <div className="menuk1 ml-4" style={{ padding: "9.5%" }}>
            <h1
              className="title"
              style={{ fontSize: "1.8rem", fontFamily: "cursive" }}
            >
              {name}
            </h1>
            <p></p>
            <div className="pt-3" style={{ display: "flex" }}>
              &#8377; {pricePerMeal}/Meal & <br /> &#8377; {pricePerMonth}
              /Month
            </div>
            <h4 className="mt-2 flex" style={{ padding: 2, fontSize: "1rem" }}>
              {" "}
              <img src={image1} alt="" className=" h-7 w-5" />
              &nbsp;
              {address}
            </h4>
            <div className="pt-2">
              <p>
                &#9788; &nbsp;
                {MorningStart}~{MorningEnd}
                <br />
                &#x1F319; &nbsp;
                {NightStart}~{NightStart}
              </p>
            </div>
            <div className="flex flex-row pt-3 pb-8">
              <BsStarFill className=" text-gold" />
              <BsStarFill className=" text-gold" />
              <BsStarFill className=" text-gold" />
              <BsStarFill className=" text-gold" />
              <BsStarHalf className=" text-gold" />
            </div>
            {/* <a href={`editListing/${_id}`}>Edit</a> &nbsp; &nbsp;
            <a href={"allListings"} onClick={() => deleteListing(_id)}>
              <button className="del-btn">Delete</button>
            </a> */}
            {
              userData && userData.length > 1 && userData[0].Type=='User' && <a href={"allListings"} onClick={handleAddToCart}>
                <button className="del-btn">Book Now</button>
              </a>
            }
            &nbsp; &nbsp;
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessItem;
