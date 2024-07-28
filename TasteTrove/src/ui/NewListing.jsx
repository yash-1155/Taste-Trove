/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { Box } from "@mui/material";

import "./NewListing.css";

const TOKEN =
  "pk.eyJ1Ijoic2lkZGhhcnRoMDAwMjciLCJhIjoiY2xxNHF3dHQ3MGI4ZzJwbGhidm4xcXpxNyJ9.HRP80FyJvTuJrvCagzw8Aw";
import "mapbox-gl/dist/mapbox-gl.css";

import ReactMapGl, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import Footer from "./Footer";
const NewListing = () => {
  // const [newplace, setNewplace] = useState(null);
  const { id } = useParams();
  const [viewport, setViewPort] = useState({
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 8,
  });
  // function handleClick(e) {
  //   console.log("newplace");

  //   function handleClick(e) {
  //     const latitude = e.lngLat.lat;
  //     console.log('e.lngLat.lat');
  //     console.log(e.lngLat.lat);
  //     const longitude = e.lngLat.lng;

  //     if (!isNaN(latitude) && !isNaN(longitude)) { // Check if latitude and longitude are valid numbers
  //       setNewplace({
  //         lat: latitude,
  //         long: longitude
  //       });
  //       console.log({ newplace });
  //     } else {
  //       console.error('Invalid latitude or longitude:', latitude, longitude);
  //     }
  //     console.log(newplace);
  //     console.log('e.lngLat.lat');
  //   }

  // }
  const navigate = useNavigate();
  const [listing, setListing] = useState({
    name: "",
    rating: 3,
    pricePerMeal: "",
    pricePerMonth: "",
    image: "", // Removed image from initial state
    address: "",
    latitude: "",
    longitude: "",
    MorningStart: "",
    MorningEnd: "",
    NightStart: "",
    NightEnd: "",
    OpearationalDirectives: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setListing({
      ...listing,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setListing({
      ...listing,
      image: file, // Update image value with the selected file
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", listing.name);
      formData.append("rating", listing.rating);
      formData.append("pricePerMeal", listing.pricePerMeal);
      formData.append("pricePerMonth", listing.pricePerMonth);
      formData.append("address", listing.address);
      formData.append("latitude", listing.latitude);
      formData.append("longitude", listing.longitude);
      formData.append("MorningEnd", listing.MorningEnd);
      formData.append("NightStart", listing.NightStart);
      formData.append("NightEnd", listing.NightEnd);
      formData.append("MorningStart", listing.MorningStart);
      formData.append("OpearationalDirectives", listing.OpearationalDirectives);

      formData.append("image", listing.image); // Append image file to FormData
      const response = await axios.post(
        "http://localhost:3000/listings",
        formData, { withCredentials: true }
      );
      console.log(response.data);
      setListing({
        name: "",
        rating: 3,
        image: "",
        address: "",
        pricePerMeal: "",
        pricePerMonth: "",
        latitude: "",
        longitude: "",
        MorningStart: "",
        MorningEnd: "",
        NightStart: "",
        NightEnd: "",
        OpearationalDirectives: "",
      });
      navigate(`/Adminprofile/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1
        style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" }}
      >
        Add New Mess
      </h1>
      <br />
      <div style={{ display: "flex" }}>
        <div className="edit-container" style={{ padding: "50px" }}>
          <form onSubmit={handleFormSubmit} className="edit-form">
            <div className="edit-input">
              <input
                placeholder="Mess Name"
                type="text"
                name="name"
                value={listing.name}
                onChange={handleInputChange}
              />
              {/* <label htmlFor="name" className="input-label">
                Mess Name
              </label> */}
              <span className="input-highlight"></span>
            </div>
            <div className="edit-input">
              <input
                placeholder="Price Per Meal"
                type="number"
                name="pricePerMeal"
                value={listing.pricePerMeal}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-input">
              {/* <label htmlFor="pricePerMonth">Price Per Month:</label> */}
              <input
                placeholder="Price Per Month"
                type="number"
                name="pricePerMonth"
                value={listing.pricePerMonth}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-input">
              <input
                placeholder="Address"
                type="text"
                name="address"
                value={listing.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-input">
              <input
                placeholder="Morning Start"
                type="text"
                name="MorningStart"
                value={listing.MorningStart}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-input">
              <input
                placeholder="Morning End"
                type="text"
                name="MorningEnd"
                value={listing.MorningEnd}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-input">
              <input
                placeholder="Night Start"
                type="text"
                name="NightStart"
                value={listing.NightStart}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-input">
              <input
                placeholder="Night End"
                type="text"
                name="NightEnd"
                value={listing.NightEnd}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-input">
              <input
                placeholder="Operational Directives"
                type="text"
                name="OpearationalDirectives"
                value={listing.OpearationalDirectives}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-input">
              {/* <label htmlFor="image">Image:</label> */}
              <input
                placeholder="Image"
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </div>
            <button className="rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500 ml-11">
              <span className="text-gray-200 font-semibold ml-8 transform group-hover:translate-x-30 transition-all duration-300">
                Add Item
              </span>
              <span className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                <svg
                  className="svg w-8 text-white"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="12" x2="12" y1="5" y2="19"></line>
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                </svg>
              </span>
            </button>
          </form>
        </div>
        <div style={{ width: "40vw", height: "50vh", zIndex: 999 }}>
          <Box
            sx={{
              height: 700,
              position: "relative",
            }}
          >
            <ReactMapGl
              mapboxAccessToken="pk.eyJ1Ijoic2lkZGhhcnRoMDAwMjciLCJhIjoiY2xxNHF3dHQ3MGI4ZzJwbGhidm4xcXpxNyJ9.HRP80FyJvTuJrvCagzw8Aw"
              initialViewState={{
                longitude: viewport.latitude,
                latitude: viewport.latitude,
                zoom: 2,
              }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
            >
              <Marker
                latitude={viewport.latitude}
                longitude={viewport.longitude}
                draggable
                // onDragEnd={(e) => dispatch({ type: 'UPDATE-LOCATION', payload: { lat: e.lngLat.lat, long: e.lngLat.lng } })}
                onDragEnd={(e) => (
                  (viewport.latitude = e.lngLat.lat),
                  (viewport.longitude = e.lngLat.lng),
                  (listing.latitude = e.lngLat.lat),
                  (listing.longitude = e.lngLat.lng),
                  console.log("latitude" + viewport.latitude),
                  console.log("longitude" + viewport.longitude)
                )}
              />

              <NavigationControl position="bottom-right" />
              <GeolocateControl
                position="top-left"
                trackUserLocation
                onGeolocate={(e) => (
                  console.log(e.coords.latitude + " " + e.coords.longitude),
                  (viewport.latitude = e.coords.latitude),
                  (viewport.longitude = e.coords.longitude)
                )}
              />
            </ReactMapGl>
          </Box>
        </div>
      </div>
      <Footer></Footer>
     
    </>
  );
};

export default NewListing;
