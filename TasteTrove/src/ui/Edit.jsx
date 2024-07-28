/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Edit.css";
import { useSelector } from "react-redux";

const Edit = () => {
  const userdata = useSelector((state) => state.userdata);
  console.log(userdata)
  const { bid } = useParams();
  const navigate = useNavigate();
  const [Listing, setListing] = useState({
    name: "",
    pricePerMeal: "",
    pricePerMonth: "",
    image: "",
    address: "",
    days: [],
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
      ...Listing,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/listings/${bid}`)
      .then((response) => {
        setListing({
          ...Listing,
          name: response.data.name,
          pricePerMeal: response.data.pricePerMeal,
          pricePerMonth: response.data.pricePerMonth,
          image: response.data.image,
          address: response.data.address,
          days: response.data.days,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          MorningStart: response.data.MorningStart,
          MorningEnd: response.data.MorningEnd,
          NightStart: response.data.NightStart,
          NightEnd: response.data.NightEnd,
          OpearationalDirectives: response.data.OpearationalDirectives,
        }); // Access response.data to get the actual data
      })
      .catch((error) => {
        // Changed to .catch to handle errors
        console.error(error);
      });
  }, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setListing({
      ...Listing,
      image: file, // Update image value with the selected file
    });
  };

  const handleformsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        ` http://localhost:3000/listings/${bid}`,
        Listing
      );
      console.log(response.data);
      // setListing({
      //     'name': '',
      //     'rating': '',
      //     'price': '',
      //     'image': '',
      //     'address': '',
      //     'imgg':''
      // })
      navigate(`/Adminprofile/${userdata[0]._id}`);
    //  http://localhost:5173/Adminprofile/6613c75baa3d6577f855a881
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="aaa" style={{ display: "flex" }}>
      {/* <div className="edit-image"> */}
      <br />
      <img className="edit-image" src={Listing.image.url} alt="Listing" />
      {/* </div> */}
      <div style={{ paddingLeft: "100px", width: "100%" }}>
        <form onSubmit={handleformsubmit} className="edit-form">
          <div className="edit-input">
            <label htmlFor="name">Mess Name:</label>
            <input
              type="text"
              name="name"
              value={Listing.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-input">
            <label htmlFor="pricePerMeal">Price Per Meal:</label>
            <input
              type="number"
              name="pricePerMeal"
              value={Listing.pricePerMeal}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-input">
            <label htmlFor="pricePerMonth">Price Per Month:</label>
            <input
              type="number"
              name="pricePerMonth"
              value={Listing.pricePerMonth}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-input">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              value={Listing.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-input">
            <label htmlFor="MorningStart">Morning Start:</label>
            <input
              type="text"
              name="MorningStart"
              value={Listing.MorningStart}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-input">
            <label htmlFor="MorningEnd">Morning End:</label>
            <input
              type="text"
              name="MorningEnd"
              value={Listing.MorningEnd}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-input">
            <label htmlFor="NightStart">Night Start:</label>
            <input
              type="text"
              name="NightStart"
              value={Listing.NightStart}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-input">
            <label htmlFor="NightEnd">Night End:</label>
            <input
              type="text"
              name="NightEnd"
              value={Listing.NightEnd}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-input">
            <label htmlFor="OpearationalDirectives">
              Operational Directives:
            </label>
            <input
              type="text"
              name="OpearationalDirectives"
              value={Listing.OpearationalDirectives}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="edit-input">
            <label htmlFor="image">Image:</label>
            <input type="file" name="image" onChange={handleImageChange} />
          </div> */}
          <button type="submit">Edit</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
