/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import "./Main.css";
const TOKEN =
  "pk.eyJ1Ijoic2lkZGhhcnRoMDAwMjciLCJhIjoiY2xxNHF3dHQ3MGI4ZzJwbGhidm4xcXpxNyJ9.HRP80FyJvTuJrvCagzw8Aw";
import "mapbox-gl/dist/mapbox-gl.css";

import ReactMapGl, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";

const Mainn = () => {
  const userdata = useSelector((state) => state.userdata);
  console.log(userdata)

  const [newplace, setNewplace] = useState(null);
  const navigate = useNavigate();
  const { bid } = useParams();
  const [Reviews, setReviews] = useState([]);
  const [Review, setReview] = useState({
    comment: "",
    rating: "",
  });

  const [info, setInfo] = useState({
    dishname: "",
    dayname: "", // Change dayname to an empty string
    type: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("info.dishname");
      console.log(info.dishname);
      console.log(info);
      const response = await axios.post(
        `http://localhost:3000/listings/${bid}/weeklymenu`,
        info, { withCredentials: true }
      );
      setInfo({
        dishname: "",
        dayname: "",
        type: "",
      });
      console.log(response.data); // Log response data if needed
      // navigate(`/listings/${bid}`)
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...Review,
      [name]: value,
    });
  };

  const deleteListing = async (id) => {
    axios.delete(`http://localhost:3000/listings/${id}`, { withCredentials: true });
  };

  const deleteReview = async (id) => {
    // axios.delete(`http://localhost:3000/listings/${bid}/${id}/reviews`,{withCredentials: true});
    axios.delete(`http://localhost:3000/listing/${bid}/reviews/${id}`, {
      withCredentials: true,
    })
  };

  useEffect(() => {
    getData();
    getDataR();
  }, [bid]);

  const getData = async () => {
    axios
      .get(`http://localhost:3000/listings/${bid}`, { withCredentials: true })
      .then((response) => {
        setListing(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDataR = async () => {
    axios
      .get(`http://localhost:3000/listing/${bid}/reviews`, { withCredentials: true })
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Review);
    const response = await axios.post(
      `http://localhost:3000/listing/${bid}/reviews`,
      Review , { withCredentials: true }
    );
    console.log("hello");
    setReview({
      comment: "",
      rating: "",
    });
    window.location.reload(); // Refresh the page
  };

  const [Listing, setListing] = useState({
    name: "",
    rating: 3,
    price: "",
    image: "",
    address: "",
    days: [],
    latitude: "",
    longitude: "",
    zoom: 8,
    owner: '',
  });

  const [showDays, setShowDays] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [dayMenu, setDayMenu] = useState({
    breakFast: [],
    lunch: [],
    dinner: [],
  });

  const handleToggleDays = () => {
    setShowDays(!showDays);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setDayMenu(Listing.days[day]);
  };

  const deletemenu = async (day, type, name) => {
    console.log("hello");
    axios.delete(
      `http://localhost:3000/listings/${bid}/dish/${day}/${type}/${name}`
      , { withCredentials: true });
    window.location.reload(); // Refresh the page
  };
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  const handleGeolocate = (e) => {
    setViewport({
      ...viewport,
      latitude: e.coords.latitude,
      longitude: e.coords.longitude,
    });
  };

  return (
    <div>
      <div className="img-detail">
        <div className="img">
          <img src={Listing.image.url} alt="Listing" />
        </div>
        <div className="messdetails">
          <li>
            Name: <i>{Listing.name}</i> 
          </li>
          <li>
            Rating: <i>{Listing.rating}</i>
          </li>
          <li>
            {" "}
            Mess Plans: &#8377; <i>{Listing.pricePerMeal}</i> /Meal <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &#8377; <i>{Listing.pricePerMonth}</i> /MONTH
          </li>

          <li>
            Address: <i>{Listing.address}</i>
          </li>
          <li>
            &#9788;
            <i>
              {Listing.MorningStart} ~ {Listing.MorningEnd}
            </i>
          </li>
          <li>
            &#x1F319;
            <i>
              {Listing.NightStart} ~ {Listing.NightEnd}
            </i>
          </li>
        </div>
      </div>
      <h3>
        <button className="menu-toggle" onClick={handleToggleDays}>
          {showDays ? "Hide" : "Show"} Menu
        </button>
      </h3>
      <div className="days">
        {showDays && (
          <>
            <h3>Weekly Menu</h3>
            <div className="menu-days">
              {Object.keys(Listing.days).map((day, index) => (
                // <button key={index} onClick={() => handleDayClick(day)}>
                //   {day}
                // </button>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  key={index}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </>
        )}
        {selectedDay && (
          <>
            <h3>{selectedDay} Menu</h3>
            <br />
            {dayMenu.breakFast && (
              <div className="menu-item">
                <h4>Breakfast:</h4>
                <ul>
                  {dayMenu.breakFast.map((item, index) => (
                    <li key={index}>
                      {item}{" "}
                      <button
                        onClick={() =>
                          deletemenu(selectedDay, "breakFast", item)
                        }
                      >
                        -
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {dayMenu.lunch && (
              <div className="menu-item">
                <h4>Lunch:</h4>
                <ul>
                  {dayMenu.lunch.map((item, index) => (
                    <li key={index}>
                      {item}{" "}
                      <button
                        onClick={() => deletemenu(selectedDay, "lunch", item)}
                      >
                        -
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {dayMenu.dinner && (
              <div className="menu-item">
                <h4>Dinner:</h4>
                <ul>
                  {dayMenu.dinner.map((item, index) => (
                    <li key={index}>
                      {item}{" "}
                      <button
                        onClick={() => deletemenu(selectedDay, "dinner", item)}
                      >
                        -
                      </button>{" "}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
      <div className="inputinfo">
        <div className="menu-form">
          {/* <label htmlFor="dishname">Dish Name:</label> */}
          <input
            type="text"
            id="dishname"
            name="dishname"
            placeholder="Enter dish name"
            value={info.dishname}
            onChange={handleInputChange}
          />

          {/* <label htmlFor="dayname">Day Name:</label> */}
          <select
            id="dayname"
            name="dayname"
            value={info.dayname}
            onChange={handleInputChange}
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>

          {/* <label htmlFor="type">Type:</label> */}
          <select
            id="type"
            name="type"
            value={info.type}
            onChange={handleInputChange}
          >
            <option value="">Select Type of meal</option>
            <option value="breakFast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          <br />
          <button type="button" onClick={handleFormSubmit}>
            Add Menu
          </button>
        </div>
      </div>
      {/* {userdata.length > 1 && (
        <div>
          <form className="review-form" onSubmit={handleSubmit}>
            <h3>Add Review</h3>
            <div className="rating">
              <input
                type="radio"
                id="star5"
                min={1}
                max={5}
                name="rating"
                defaultValue={3}
                value={Review.rating}
                onChange={handleChange}
              />
              <label title="Excellent!">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                </svg>
              </label>
              <input value="4" name="rate" id="star4" type="radio" />
              <label title="Great!">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                </svg>
              </label>
              <input value="3" name="rate" id="star3" type="radio" />
              <label title="Good">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                </svg>
              </label>
              <input value="2" name="rate" id="star2" type="radio" />
              <label title="Okay">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                </svg>
              </label>
              <input value="1" name="rate" id="star1" type="radio" />
              <label title="Bad">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                </svg>
              </label>
            </div>

            <br></br>
            <div className="rev-msg">
             
              <textarea
                name="comment"
                value={Review.comment}
                onChange={handleChange}
                placeholder="Share your thoughts and help others with your review... 🌟"
              ></textarea>
            </div>
            <br></br>
            <a href={`/listings/${bid}`} onClick={handleSubmit}>
              Submit
            </a>
          </form>

        </div>
      )
      } */}

      {
        Reviews && <div> <div className="review-container">
          {Reviews.map((review, index) => (
            <div className="review" key={index}>
              {review.Author && (
                <p>User: {review.Author.name}</p>
              )}
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
              {userdata.length > 1 && review.Author._id == userdata[0]._id &&
                <a
                  href={`/listings/${bid}`}
                  onClick={() => deleteReview(review._id)}
                >
                  Delete
                </a>
              }
            </div>
          ))}
        </div></div>
      }

      <Box
        className="Box"
        sx={{
          width: "65vw",
          height: "65vh",
          zIndex: 999,
          position: "relative",
          marginLeft: "15%",
        }}
      >
        <ReactMapGl
          mapboxAccessToken="pk.eyJ1Ijoic2lkZGhhcnRoMDAwMjciLCJhIjoiY2xxNHF3dHQ3MGI4ZzJwbGhidm4xcXpxNyJ9.HRP80FyJvTuJrvCagzw8Aw"
          initialViewState={{
            longitude: Listing.longitude,
            latitude: Listing.latitude,
            zoom: 2,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker latitude={Listing.latitude} longitude={Listing.longitude} />
          <Popup
            latitude={Listing.latitude}
            longitude={Listing.longitude}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
          >
            <div>
              <h4>{Listing.name}</h4>
            </div>
          </Popup>

          <NavigationControl position="bottom-right" />


          <GeolocateControl
            position="top-left"
            trackUserLocation
            onGeolocate={handleGeolocate}
          />
        </ReactMapGl>
      </Box>
      <br />
      {
        Listing.owner && userdata.length > 1  && <div className="button-container">
        <a href={`/editListing/${bid}`} className="button">
          Edit
        </a>
           <a href={`/Adminprofile/${userdata[0]._id}`} onClick={() => deleteListing(bid)}>
                            <button className="del-btn">Delete</button>
                        </a>
        {/* <a
          href="/allListings"
          onClick="deleteListing(bid)"
          className="button delete"
        >
        Delete
        </a> */}
      </div>
      }
    </div>
  );
};

export default Mainn;
{/* <GeolocateControl
            position="top-left"
            trackUserLocation
            onGeolocate={(e) => (
              // Listing.latitude = e.coords.latitude,
              // Listing.longitude = e.coords.longitude
              (Listing.latitude = 100), (Listing.longitude = 100)
            )}
          /> */}
{/* <a href={`/listings/${bid}/AllDishes`} className="button">
          All Dish
        </a> */}
{/* <a href={`/listings/${bid}/newdish`} className="button">
          Add Dish
        </a>
        <a href={`/listings/${bid}/addnewmenu`} className="button">
          Add Weekly Menu
        </a> */}
{/* <form className="review-form" onSubmit={handleSubmit}>
        <h3>Add Review</h3>
        <div className="rating">
          <input
            type="radio"
            id="star5"
            min={1}
            max={5}
            name="rating"
            defaultValue={3}
            value={Review.rating}
            onChange={handleChange}
          />
          <label title="Excellent!">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
            </svg>
          </label>
          <input value="4" name="rate" id="star4" type="radio" />
          <label title="Great!">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
            </svg>
          </label>
          <input value="3" name="rate" id="star3" type="radio" />
          <label title="Good">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
            </svg>
          </label>
          <input value="2" name="rate" id="star2" type="radio" />
          <label title="Okay">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
            </svg>
          </label>
          <input value="1" name="rate" id="star1" type="radio" />
          <label title="Bad">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
            </svg>
          </label>
        </div>

        <br></br>
        <div className="rev-msg">
         
          <textarea
            name="comment"
            value={Review.comment}
            onChange={handleChange}
            placeholder="Share your thoughts and help others with your review... 🌟"
          ></textarea>
        </div>
        <br></br>
        <a href={`/listings/${bid}`} onClick={handleSubmit}>
          Submit
        </a>
      </form> */}
