/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import AllData from "./AllData";
import MessItem from "./MessItem";
import Footer from "./Footer";
const Index = () => {
  const userdata = useSelector((state) => state.userdata);
  const searchData = useSelector((state) => state.searchValue.value);

  const navigate = useNavigate();

  const [listings, setlistings] = useState([]);
  const [parentlistings, setparentlistings] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterListings();
  }, [searchData]);

  const getData = async () => {
    axios
      .get("http://localhost:3000/listings")
      .then((response) => {
        setlistings(response.data); // Access response.data to get the actual data
        setparentlistings(response.data)

      })
      .catch((error) => {
        // Changed to .catch to handle errors
        console.error(error);
      });
  };
  const filterListings = () => {
   
    const value=parentlistings
    
    // console.log(listings)
    const filteredListings = value.filter(listing => 
      listing.name.toLowerCase().includes(searchData.toLowerCase()) 
    );
    setlistings(filteredListings);
  
};
  // const deleteListing = async (id) => {
  //     axios.delete(`http://localhost:3000/listings/${id}`)
  //     getData()

  // }

  return (
    <div>
      {/* <h3>All Mess</h3> */}
      {/* <a href={`/new`}>Add Listing</a> */}
      {/* {userdata && userdata.length > 0 && userdata[0].Type=='Admin' && <a href={`/new`}>Add Listing</a>} */}
      <div className="flex justify-ceter">
        <div>
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 px-2 py-2 gap-5 pr-2.5rem"
            style={{ justifyContent: "space-between" }}
          >
            {listings.map((listing) => (
              <MessItem listing={listing} key={listing.id} />
            ))}
            
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Index;























{
  /* <MessItem Mess={listing} key={listing.id} /> */
}

{
  /* <div key={listing._id}> 
                
                    <a href={`listings/${listing._id}`}>
                        {listing.image && listing.image.url && <img src={listing.image.url} alt="Description of the image" />}
                        <br />
                        <b>Name: </b> {listing.name} &nbsp;  &nbsp;
                        <b>Price: </b>&#8377; {listing.pricePerMeal}/Meal AND &#8377; {listing.pricePerMonth}/Month   &nbsp;   &nbsp;
                        <b>Address: </b> {listing.address}  &nbsp;  &nbsp;
                        <b>&#9788; Time:</b>{listing.MorningStart} TO {listing.MorningEnd}  &nbsp;   &nbsp;
                        <b>&#x1F319; Time:</b>{listing.NightStart} TO {listing.NightStart}  &nbsp;   &nbsp;
                        <a href={`editListing/${listing._id}`}>Edit</a>  &nbsp;  &nbsp;
                        <a href={'allListings'} onClick={() => deleteListing(listing._id)}>Delete</a>&nbsp;  &nbsp;
                        <br />
                    </a>
                </div>  */
}

{
  /* {listings.map((listing) => ( // Added unique key prop and fixed mapping function
                < >
                <a href={`listings/${listing._id}`}>
                <img src={listing.image.url} alt="Description of the image" />
                
                <br></br>
                    <b>Name: </b> {listing.name} &nbsp;  &nbsp;
                    <b>Price: </b>&#8377; {listing.pricePerMeal}/Meal AND &#8377; {listing.pricePerMonth}/Month   &nbsp;   &nbsp;
                    <b>Address: </b> {listing.address}  &nbsp;  &nbsp;
                    <b>&#9788; Time:</b>{listing.MorningStart} TO {listing.MorningEnd}  &nbsp;   &nbsp;
                    <b>&#x1F319; Time:</b>{listing.NightStart} TO {listing.NightStart}  &nbsp;   &nbsp;
                    <a href={`editListing/${listing._id}`}>Edit</a>  &nbsp;  &nbsp;
                    <a href={'allListings'}  onClick={ ()=>deleteListing(listing._id) }  >Delete</a>&nbsp;  &nbsp;
                    
                    <br></br>
                </a>
                </>
            ))} */
}
