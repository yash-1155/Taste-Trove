import { Link, NavLink } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAddress } from "../services/apiGeocoding";
import axios from "axios";
import { data } from "autoprefixer";
import { addUser, removeUser } from "./store/user";
import { useSelector } from "react-redux";
function Header() {
  const [userAddress, setUserAddress] = useState("");
  const userdata = useSelector((state) => state.userdata);
  const [userData, setUserData] = useState({});
  // console.log("userdata:",userData);

  const dispatch = useDispatch();
  const fetchUserAddress = async () => {
    try {
      const address = await getAddress(); // Replace with your actual API call to fetch user address
      setUserAddress(address);
    } catch (error) {
      console.error("Error fetching user address", error);
    }
  };

  function logout() {
    window.open("http://localhost:3000/auth/logout", "_self");
    // userData=""
    removeUserData(userData);
    setUserData("");
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/users", { withCredentials: true })
      .then((response) => {
        setUserData(response.data);
        // console.log(response.data)

        addUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const addUserData = (payload) => {
    // console.log(payload)
    dispatch(addUser(payload));
  };
  const removeUserData = (payload) => {
    dispatch(removeUser(payload));
  };
  // useEffect(()=>{

  // },[])
  return (
    <header className="flex justify-between items-center border-b border-stone-200 bg-yellow-400 px-4 py-3 sm:px-6">
      <Link
        to="/"
        className="tracking-widest text-xl flex uppercase ml-3 font-extrabold"
      >
        Taste<p className="text-red-500 font-extrabold">Trove</p>{" "}
      </Link>

      <div className="flex justify-between items-center space-x-16 px-4 font-semibold">
      <Link to="/">Home</Link>
        <Link to="/allListings">All Mess</Link>
        {/* Display Location */}

        <SearchOrder />
        {/* <div className="hidden sm:flex items-center space-x-4">
          <Username />
          <Link to="/login">
            <FaUser className="cursor-pointer" />
          </Link>
        </div> */}

        {userdata && userdata.length > 0 && userdata[0].Type == "Admin" && (
          <button className="">
            {" "}
            <a href={`/Adminprofile/${userdata[0]._id}`}>
              {/* {userdata[0].name.split(" ")[0]} */}{" "}
              <FaUser className="cursor-pointer" />
            </a>
          </button>
        )}
        {userdata && userdata.length > 0 && userdata[0].Type == "User" && (
          <button>
            {" "}
            <a href={`/Userprofile/${userdata[0]._id}`}>
              {/* {userdata[0].name.split(" ")[0]} */}{" "}
              <FaUser className="cursor-pointer" />
            </a>
          </button>
        )}
        {userdata.length === 0 && (
          <div className="hidden sm:flex items-center space-x-4">
            {/* <Username /> */}
            <Link to="/login" onClick={logout}>
              <FaUser className="cursor-pointer" />
            </Link>
          </div>
        )}

        {userdata.length > 0 && (
          <div
            className="flex items-center space-x-4"
            style={{ marginTop: "8px", marginRight: "10px" }}
          >
            <Username />
            <div className="relative">
              <button className="cursor-pointer" onClick={logout}>
                <Link to="/">
                  <FaSignOutAlt />
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
// export{logout};
