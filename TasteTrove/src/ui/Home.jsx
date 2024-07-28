import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import Button from "./Button";
import Menu from "../features/menu/Menu";
import { Link } from "react-router-dom";

import "./Home.css";
import image1 from "./image1.png";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const developers = [
  {
    name: "Yash Sathe",
    role: "Frontend Developer",
    image: "yash.jpeg",
    social: {
      instagram: "https://www.instagram.com/yash_sathe_12/",
      linkedin: "https://www.linkedin.com/in/yash-sathe-b208a124a/",
    },
  },
  {
    name: "Siddharth Sahane",
    role: "Backend Developer",
    image: "developer2.jpg",
    social: {
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Hrishikesh Chaudhari",
    role: "Full Stack Developer",
    image: "developer3.jpg",
    social: {
      instagram: "https://www.instagram.com/yash_sathe_12/",
      linkedin: "",
    },
  },
  {
    name: "Rohit Ravate",
    role: "Full Stack Developer",
    image: "developer3.jpg",
    social: {
      instagram: "https://www.instagram.com/yash_sathe_12/",
      linkedin: "#",
    },
  },
];

const DeveloperCard = ({ name, role, image, social }) => (
  <div className="card-client">
    <div className="user-picture">
      <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
      </svg>
    </div>
    <p className="name-client">
      {name}
      <span>{role}</span>
    </p>
    <p>
      <hr className="black-hr" />
    </p>
    <div className="social-media">
      {/* <a href={social.instagram}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
        </svg>
        <span className="tooltip-social">Twitter</span>
      </a> */}
      <a href={social.instagram}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
        </svg>
        <span className="tooltip-social">Instagram</span>
      </a>

      <a href={social.linkedin}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
        </svg>
        <span className="tooltip-social">LinkedIn</span>
      </a>
    </div>
  </div>
);

function Home() {
  const userdata = useSelector((state) => state.userdata);
  console.log(userdata);
  const username = useSelector((state) => state.user.username);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      isLoading(false);
    }, 1000); // 2 seconds timeout

    return () => clearTimeout(timer); // Cleanup the timeout
  }, []);

  return (
    // <div className="flex justify-between">
    //   <div className="bg-red-100 max-h-full md:max-h-screen">
    //     <div className="grid gap-5 h-[100%]"></div>
    //   </div>
    // </div>
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="grid">
            <div className="content">
              <div className="content-left">
                <div className="info">
                  <h2>Local Flavors, Global Tastes</h2>
                  <p>
                    Hey, Our delicious food is waiting for you, <br />
                    We are always near to you with fresh item of food
                  </p>
                </div>
                <a href="/allListings">
                  <button>
                    <Link to="/allListings">Explore Food</Link>
                  </button>
                </a>
              </div>
              <div className="content-right">
                <img src={image1} alt="" />
              </div>
            </div>
          </section>
          <section className="category">
            <div className="list-items">
             
              <div className="card-list">
                <div className="card-main">
                  <img src={image1} alt="" />
                  <div className="food-title">
                    <h1>Health</h1>
                  </div>
                  <div className="desc-food">
                    <p>
                    Nourishes body, fuels energy, supports well-being.
                    </p>
                  </div>
                  <div className="price">
                  <span>&#128522;</span>
                  </div>
                </div>

                <div className="card-main">
                  <img src={image1} alt="" />
                  <div className="food-title">
                    <h1>Mood</h1>
                  </div>
                  <div className="desc-food">
                    <p>
                    Elevates spirits, enhances happiness, boosts mood.
                    </p>
                  </div>
                  <div className="price">
                  <span>&#128522;</span>
                  </div>
                </div>

                <div className="card-main">
                  <img src={image1} alt="" />
                  <div className="food-title">
                    <h1>Performance</h1>
                  </div>
                  <div className="desc-food">
                    <p>
                    Optimizes brain function, enhances physical abilities.
                    </p>
                  </div>
                  <div className="price">
                  <span>&#128522;</span>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="about-us"
                  style={{
                    fontFamily: "great-vibes-regular, Arial, sans-serif",
                  }}
                >
                  About Us
                </div>
                <p
                  className="text-lg leading-relaxed text-gray-800 font"
                  style={{ fontFamily: "'Lato', Arial, sans-serif" }}
                >
                  Welcome to <span className="text-yellow-500">TasteTrove</span>
                  , where culinary excellence meets warmth and comfort. Nestled
                  in the heart of <span className="text-red-400"> Nashik</span>,
                  our cozy establishment offers a delightful array of homemade
                  delicacies crafted with love and care. From traditional family
                  recipes to modern twists on classic favorites, each dish tells
                  a story of tradition, flavor, and community. Step into our
                  welcoming space and experience the essence of home-cooked
                  goodness, where every meal is a celebration of togetherness.
                  Whether you're a local food enthusiast or a curious traveler,
                  we invite you to join us on a journey of taste and discovery
                  at
                  <span className="font-great-vibes"> TasteTrove</span>.
                </p>

                <div className="container-1">
                  {developers.map((developer, index) => (
                    <DeveloperCard key={index} {...developer} />
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* <div className="footer"> */}
          <Footer />
          {/* </div> */}
        </>
      )}
    </>
  );
}

export default Home;

{
  /* <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        Hostel life just got delicious.
        <br />
        <span className="text-yellow-500">
          Find your perfect mess match here!
        </span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue Browsing, {username}
        </Button>
      )}
    </div> */
}
