import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UilSignOutAlt } from "@iconscout/react-unicons";

// import MessItemOwner from "./MessItemOwner";
import { useSelector } from "react-redux";
import "./Dashboard.css";
function AdminHub() {
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [isSearchFormVisible, setSearchFormVisible] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [Count, setCount] = useState(0);
  const [totalAmountSpend, setTotalAmountSpend] = useState(0);
  const [isSettingFormVisible, setSettingFormVisible] = useState(false);
  const [isDashboardVisible, setDashboardVisible] = useState(true);
  const [isDashboardButtonDisabled, setDashboardButtonDisabled] =
    useState(true);
  const [isProfileButtonDisabled, setProfileButtonDisabled] = useState(false);
  const [isSettingButtonDisabled, setSettingButtonDisabled] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    Type: "",
    Contact: "",
    city: "",
    state: "",
    messName: "",
    messAddress: "",
  });
  // const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.userdata);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarHidden(true);
      } else if (window.innerWidth > 576) {
        setSearchButtonIconClass("bx-search");
        setSearchFormVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUserData();
    getOrders();
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/User/${id}`, {
        withCredentials: true,
      });
      // const response = useSelector((state)=>state.userdata);
      console.log(response.data);
      // const userData = response.data;
      // console.log(userData);
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const toggleSidebar = () => {
    setSidebarHidden(!isSidebarHidden);
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/order/${id}`, {
        withCredentials: true,
      });
      console.log(response.data);
      var countValue = 0;
      var amountValue = 0;
      const filteredOrders = response.data.filter((orderEntry) => {
        const orderTime = new Date(orderEntry.order.time);
        console.log(orderTime);
        amountValue = amountValue + orderEntry.order.amount;
        if (orderTime < Date.now()) {
          var obj = { status: "Expired" };
          return Object.assign(orderEntry, obj);
        } else {
          countValue++;
          var obj = { status: "Live" };
          return Object.assign(orderEntry, obj);
        }
      });
      setCount(countValue);
      setTotalAmountSpend(amountValue);
      setOrders(filteredOrders);
    } catch (error) {
      console.error(error);
    }
  };
  const toggleSearchForm = (e) => {
    if (window.innerWidth < 576) {
      e.preventDefault();
      setSearchFormVisible(!isSearchFormVisible);
      setSearchButtonIconClass(isSearchFormVisible ? "bx-search" : "bx-x");
    }
  };

  const setSearchButtonIconClass = (className) => {
    const searchButtonIcon = document.querySelector(
      "#content nav form .form-input button .bx"
    );
    searchButtonIcon.classList.replace(
      searchButtonIcon.className.baseVal,
      className
    );
  };

  const handleSwitchModeChange = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };
  const toggleProfile = () => {
    setProfileVisible(!isProfileVisible);
    setDashboardVisible(false);
    setSettingFormVisible(false);
    setDashboardButtonDisabled(false);
    setProfileButtonDisabled(true);
    setSettingButtonDisabled(false);
  };

  const toggleDashboard = () => {
    setDashboardVisible(!isDashboardVisible);
    setProfileVisible(false);
    setSettingFormVisible(false);
    setDashboardButtonDisabled(true);
    setProfileButtonDisabled(false);
    setSettingButtonDisabled(false);
  };

  const toggleSettingForm = () => {
    setSettingFormVisible(!isSettingFormVisible);
    setProfileVisible(false);
    setDashboardVisible(false);
    setDashboardButtonDisabled(false);
    setProfileButtonDisabled(false);
    setSettingButtonDisabled(true);
  };
  const handleClick = () => {
    // Disable the button
  };
  const { id } = useParams();

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
      const response = await axios.put(
        `http://localhost:3000/User/listings/${id}`,
        profile
      );
      console.log(response.data);
      // navigate(`/profile/${id}`);
      // navigate(`profile/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  console.log(userdata);
  if (userdata.length == 0) {
    navigate("/login");
  }
  return (
    <div>
      <div id="sidebar" className={isSidebarHidden ? "hide" : ""}>
        <ul className="side-menu top" style={{ backgroundColor: "" }}>
          <li className="act">
            <Link>
              <button
                onClick={toggleDashboard}
                disabled={isDashboardButtonDisabled}
              >
                {/* <i className="bx bxs-dashboard"></i> */}
                <span className="text pl-10">Dashboard</span>
              </button>
            </Link>
          </li>
          <li>
            <Link>
              <button
                onClick={toggleProfile}
                disabled={isProfileButtonDisabled}
              >
                <i className="bx bxs-shopping-bag-alt"></i>
                <span className="text pl-10">Profile</span>
              </button>
            </Link>
          </li>
          <li>
            <Link>
              <button
                onClick={toggleSettingForm}
                disabled={isSettingButtonDisabled}
              >
                <i className="bx bxs-shopping-bag-alt"></i>
                <span className="text pl-10">Setting</span>
              </button>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="logout"
              to={"http://localhost:3000/auth/logout"}
            >
              <i className="bx bxs-log-out-circle"></i>
              LogOut &nbsp;
              <UilSignOutAlt />
            </Link>
          </li>
        </ul>
      </div>

      {/* content of profile */}
      {/* Content */}
      <div id="content">
        <div id="content_profile">
          {isProfileVisible && !isDashboardVisible && (
            <div
              className="container mt-4 mb-4 p-3 d-flex justify-content-center mr-72"
              style={{ width: "620px", height: "450px" }}
            >
              <div className="card-1 p-6">
                <div
                  className="image d-flex flex-column justify-content-center align-items-center"
                  style={{ width: "603px" }}
                >
                  <button className="btn btn-secondary">
                    <img
                      src="data:image/png;base64,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"
                      height="100"
                      width="100"
                      alt="Profile"
                    />
                  </button>
                  <br />
                  <span className="name mt-4"> {profile.name}</span>
                  <br />

                  <span className="idd">{profile.email}</span>
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <span className="idd1">{profile.Contact}</span>
                    <span>
                      <i className="fa fa-copy"></i>
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                    <span className="text">
                      {profile.city}&ensp;
                      <span className="follow">{profile.state}</span>
                    </span>
                  </div>
                  <div className="d-flex mt-2">
                    <button className="btn1 btn-dark"><Link to="/">Visit Mess</Link></button>
                  </div>

                  {/* <div className="text mt-3">
                    <span>
                      Eleanor Pena is a creator of minimalistic x bold graphics
                      and digital artwork.
                      <br />
                    </span>
                  </div> */}
                  <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                    <span>
                      <i className="fa fa-twitter"></i>
                    </span>
                    <span>
                      <i className="fa fa-facebook-f"></i>
                    </span>
                    <span>
                      <i className="fa fa-instagram"></i>
                    </span>
                    <span>
                      <i className="fa fa-linkedin"></i>
                    </span>
                  </div>
                  <div className="px-2 rounded mt-4 date"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navbar */}
        {/* <nav>
                    Navbar content
                    <i className='bx bx-menu' ></i>
                    <Link href="#" className="nav-link">Categories</Link>
                    <form action="#" className={isSearchFormVisible ? 'show' : ''}>
                        <div className="form-input">
                            <input type="search" placeholder="Search..." />
                            <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                        </div>
                    </form>
                    <input type="checkbox" id="switch-mode" hidden />
                    <label htmlFor="switch-mode" className="switch-mode"></label>
                    <Link href="#" className="notification">
                        <i className='bx bxs-bell' ></i>
                        <span className="num">8</span>
                    </Link>
                    <Link href="#" className="profile">
                        <img src="img/people.png" alt="Profile" />
                    </Link>
                </nav> */}

        {/* Main content */}
        <div id="content_profile">
          {isSettingFormVisible && (
            <form onSubmit={handleFormSubmit} className="edit-form">
              <div className="edit-input">
                <label htmlFor="name">User Name:</label>
                <input type="text" name="name" value={profile.name} />
              </div>
              <div className="edit-input">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" value={profile.email} />
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
          )}
        </div>
        {isDashboardVisible && (
          <main>
            {/* Main content content */}
            <div className="head-title">
              <div className="left">
                <h1>Hello {profile.name}!</h1>
                {/* <ul className="breadcrumb">
                    <li>
                        <Link href="#">Dashboard</Link>
                    </li>
                    <li><i className='bx bx-chevron-right'></i></li>
                    <li>
                        <Link className="active" href="#">Home</Link>
                    </li>
                </ul> */}
              </div>
              {/* <Link href="#" className="btn-download">
                <i className='bx bxs-cloud-download'></i>
                <span className="text">Download PDF</span>
            </Link> */}
            </div>

            <ul className="box-info">
              <li>
                <i className="bx bxs-calendar-check"></i>
                <span className="text">
                  <h3>{Count}</h3>
                  <p>New Order</p>
                </span>
              </li>
              <li>
                <i className="bx bxs-group"></i>
                <span className="text">
                  <h3>{totalAmountSpend}</h3>
                  <p>Amount Spend</p>
                </span>
              </li>
              {/* <li>
                <i className="bx bxs-dollar-circle"></i>
                <span className="text">
                  <h3>$2543</h3>
                  <p>Favourite</p>
                </span>
              </li> */}
            </ul>

            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3>Recent Orders</h3>
                  <i className="bx bx-search"></i>
                  <i className="bx bx-filter"></i>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Mess Name</th>
                      <th>Date Order</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                 
              
                    {orders.map((orderEntry, index) => (
                      <tr key={index}>
                        <td>
                          <p>{orderEntry.listing.name}</p>
                        </td>
                        <td>{orderEntry.order.time}</td>
                        <td>
                          <span className="">{orderEntry.order.amount}</span>
                        </td>
                        <td>
                          <span className="status completed">
                            {orderEntry.status}
                          </span>
                        </td>
                      </tr>
                    ))}


                    {/* {orders.map((orderEntry) => (
                      <tr>
                        <td>
                          <p>{orderEntry.listing.name}</p>
                        </td>
                        <td>{orderEntry.order.time}</td>
                        <td>
                          <span className="">{orderEntry.order.amount}</span>
                        </td>
                        <td>
                          <span className="status completed">
                            {orderEntry.status}
                          </span>
                        </td>
                      </tr>
                    ))} */}

                    {/* <tr>
                            <td>
                                <img src="img/people.png" alt="User" />
                                <p>John Doe</p>
                            </td>
                            <td>01-10-2021</td>
                            <td><span className="status completed">Completed</span></td>
                        </tr>
                        <tr>
                            <td>
                                <img src="img/people.png" alt="User" />
                                <p>John Doe</p>
                            </td>
                            <td>01-10-2021</td>
                            <td><span className="status completed">Completed</span></td>
                        </tr>
                        <tr>
                            <td>
                                <img src="img/people.png" alt="User" />
                                <p>John Doe</p>
                            </td>
                            <td>01-10-2021</td>
                            <td><span className="status completed">Completed</span></td>
                        </tr> */}
                    {/* Add more table rows as needed */}
                  </tbody>
                </table>
              </div>
              {/* Add more table components as needed */}
            </div>
          </main>
        )}
      </div>

      {/* Script */}
      
      <script>
        {/* Toggle sidebar */}
        const menuBar = document.querySelector('#content nav .bx.bx-menu');
        const sidebar = document.getElementById('sidebar');
        menuBar.addEventListener('click', toggleSidebar);
        {/* Toggle search form */}
        const searchButton = document.querySelector('#content nav form
        .form-input button'); const searchButtonIcon =
        document.querySelector('#content nav form .form-input button .bx');
        const searchForm = document.querySelector('#content nav form');
        searchButton.addEventListener('click', toggleSearchForm);
        {/* Switch mode */}
        const switchMode = document.getElementById('switch-mode');
        switchMode.addEventListener('change', handleSwitchModeChange);

      </script>
      {/* </div> */}
    </div>
  );
}

export default AdminHub;
