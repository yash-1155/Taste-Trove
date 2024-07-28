
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MessItemOwner from "./MessItemOwner";
import { useSelector } from "react-redux";
import "./MessItem.css";


const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        Type: '',
        Contact: '',
        city: '',
        state: '',
        messName: '',
        messAddress: '',
    });
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getUserData();
        getOrders();
    }, []);

    const getUserData = async () => {
        try {

            const response = await axios.get(`http://localhost:3000/User/${id}`, { withCredentials: true });
            // const response = useSelector((state)=>state.userdata);
            console.log(response.data);
            // const userData = response.data;
            // console.log(userData);
            setProfile(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const getOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/order/${id}`, { withCredentials: true });
            console.log(response.data)
            const filteredOrders = response.data.filter(orderEntry => {
                const orderTime = new Date(orderEntry.order.time);
                console.log(orderTime)
                return orderTime > Date.now();
            });
            setOrders(filteredOrders);
        } catch (error) {
            console.error(error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/User/listings/${id}`, profile);
            console.log(response.data);
            // navigate(`/profile/${id}`);
            // navigate(`profile/${id}`);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <div>
                UserName: {profile.name}
                Email: {profile.email}
            </div>
            <div className="aaa" style={{ display: "flex" }}>
                <div style={{ paddingLeft: "100px", width: "100%" }}>
                    <form onSubmit={handleFormSubmit} className="edit-form">
                        <div className="edit-input">
                            <label htmlFor="name">User Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                               
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="state">state:</label>
                            <input
                                type="text"
                                name="state"
                                value={profile.state}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="city">city:</label>
                            <input
                                type="text"
                                name="city"
                                value={profile.city}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="Contact">Contact:</label>
                            <input
                                type="text"
                                name="Contact"
                                value={profile.Contact}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Edit</button>
                    </form>
                    <h1>Orders</h1>
                    
                    


                    <ul style={{display:"flex"}}>
  {orders.map((orderEntry) => (
        <div key={orderEntry.order._id} className="card" style={{width:"50%",display:"flex"}}>
        <div
          className="p-2"
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <div className="hover:scale-105 transition-transform duration-300">
            <a>
              <img
                className="image"
                src={orderEntry.listing.image.url}
                alt="Description of the image"
              />
            </a>
          </div>
          <br></br>
          <div>
            <div className="menuk1 ml-4" style={{ padding: "5%" }}>
              <h1 className="title" style={{ fontSize: "1.8rem" }}>
                {orderEntry.listing.name}
              </h1>
              <p></p>
              {/* <div className="pt-3" style={{ display: "flex" }}>
                &#8377; {pricePerMeal}/Meal & <br /> &#8377; {pricePerMonth}
                /Month
              </div> */}
              {/* <h4 className="mt-2" style={{ padding: 2, fontSize: "1rem" }}>
                {address}
              </h4> */}
              {/* <div className="pt-2">
                <p>
                  &#9788; &nbsp;
                  {MorningStart}~{MorningEnd}
                  <br />
                  &#x1F319; &nbsp;
                  {NightStart}~{NightStart}
                </p>
              </div> */}
              {/* <div className="flex flex-row pt-3 pb-8">
                <BsStarFill className=" text-gold" />
                <BsStarFill className=" text-gold" />
                <BsStarFill className=" text-gold" />
                <BsStarFill className=" text-gold" />
                <BsStarHalf className=" text-gold" />
              </div> */}
             
              {/* <a href={`editListing/${_id}`}>Edit</a> &nbsp; &nbsp;
              <a href={"allListings"} onClick={() => deleteListing(_id)}>
                <button className="del-btn">Delete</button>
              </a> */}
              {/* <a href={"allListings"} onClick={handleAddToCart}>
                <button className="del-btn">Add to Cart</button>
                {/* <CartOverview /> */}
              {/* </a> */} 
              &nbsp; &nbsp;
              <br></br>
            </div>
          </div>
        </div>
      </div>






    // <li key={orderEntry.order._id}>
    //   <div>
    //     <h3>Order ID: {orderEntry.order._id}</h3>
    //     <p>Amount: {orderEntry.order.amount}</p>
    //     {/* Add other order details here */}
    //   </div>
    //   <div>
    //     <h3>Listing Details</h3>
    //     <p>Listings ID: {orderEntry.listing._id}</p>
    //     <p>Listings ID: {orderEntry.listing.name}</p>
    //     {/* Add other listing details here */}
    //   </div>
    //   <hr />
    // </li>
    
  ))}
</ul>

                    <p></p>
                </div>
            </div>
            {/* <div className="flex justify-ceter">
                <div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 px-2 py-2 gap-5 pr-2.5rem">
                        {listings.map((listing) => (
                            <MessItemOwner listing={listing} key={listing.id} />
                        
                        ))}
                    </ul>
                </div>
            </div> */}
        </div>
    );
};

export default UserProfile;
