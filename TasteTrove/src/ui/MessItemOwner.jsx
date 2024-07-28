/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsStarFill, BsCursor, BsStarHalf } from "react-icons/bs";

import { useSelector } from "react-redux";
import "./MessItem.css";
// import AllData from "./AllData";
const MessItemOwner = (listing) => {
    // console.log(listing.listing);
    const userdata = useSelector((state) => state.userdata);
    console.log(userdata)

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


    const deleteListing = async (id) => {
        axios.delete(`http://localhost:3000/listings/${id}`);
        // getData()
    };

    return (
        <div className="card">
            <div
                className="p-2"
                style={{ display: "flex", justifyContent: "space-evenly" }}
            >
                <div className="hover:scale-105 transition-transform duration-300">
                    <a href={`/listings/Owner/${_id}`}>
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
                        <h1 className="title" style={{ fontSize: "1.8rem" }}>
                            {name}
                        </h1>
                        <p></p>
                        <div className="pt-3" style={{ display: "flex" }}>
                            &#8377; {pricePerMeal}/Meal & <br /> &#8377; {pricePerMonth}
                            /Month
                        </div>
                        <h4 className="mt-2" style={{ padding: 2, fontSize: "1rem" }}>
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

                        {/* <a href={`/editListing/${_id}`}>Edit</a> &nbsp; &nbsp; */}
                        {/* <a href={`/Adminprofile/${userdata[0]._id}`} onClick={() => deleteListing(_id)}>
                            <button className="del-btn">Delete</button>
                        </a> */}
                        &nbsp; &nbsp;
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessItemOwner;
