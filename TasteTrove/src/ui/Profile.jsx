import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MessItemOwner from "./MessItemOwner";

const Profile = () => {
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
    const [listings, setListings] = useState([]);

    useEffect(() => {
        getData();
        getUserData();
        getOrders();
    }, []);

    const getUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/Owner/${id}`);
            const userData = response.data;
            setProfile(userData);
        } catch (error) {
            console.error(error);
        }
    };
    const getOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/order/admin/${id}`, { withCredentials: true });
            console.log(response.data)
            const filteredOrders = response.data.filter(orderEntry => {
                const orderTime = new Date(orderEntry.order.time);
                console.log(orderTime)
                return orderTime > Date.now();
            });
            setOrders(filteredOrders);
            // setOrders(response.data);
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
            const response = await axios.put(`http://localhost:3000/Owner/listings/${id}`, profile);
            console.log(`/profile/${id}`);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/Owner/listings/${id}`, { withCredentials: true });
            setListings(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
           <a href={`/new`}>Add New Listing</a> &nbsp; &nbsp;
            <div className="aaa" style={{ display: "flex" }}>
                <div style={{ paddingLeft: "100px", width: "100%" }}>
                    <form onSubmit={handleFormSubmit} className="edit-form">
                        <div className="edit-input">
                            <label htmlFor="name">User Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleInputChange}
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
                </div>
            </div>
            <div className="flex justify-ceter">
                <div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 px-2 py-2 gap-5 pr-2.5rem">
                        {listings.map((listing) => (
                            <MessItemOwner listing={listing} key={listing.id} />
                        ))}
                    </ul>
                </div>
            </div>
            <div>
    <h1>Orders</h1>
    <ul style={{ display: "flex" }}>
        {orders.map((orderEntry) => {
            // console.log("Order Time:", orderEntry.order.time);
            // console.log("Current Time:", Date.now());
            return (
                <div key={orderEntry.order._id} className="card" style={{ width: "50%", display: "flex" }}>
                    <div className="p-2" style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <div>
                            <div className="menuk1 ml-4" style={{ padding: "5%" }}>
                                <h1 className="title" style={{ fontSize: "1.8rem" }}>
                                    {orderEntry.user.name}
                                </h1>
                                <p className="title" style={{ fontSize: "1.0rem" }}>
                                    {orderEntry.order.amount}
                                </p>
                                <p></p>
                                &nbsp; &nbsp;
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
    </ul>
</div>

        </div>
    );
};

export default Profile;
