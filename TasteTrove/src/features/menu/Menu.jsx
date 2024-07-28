import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
// import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import FirstCont from "./FirstCont";
import {useSelector} from 'react-redux'
function Menu() {
  const menu = useLoaderData();
  const [imageIndex, setImageIndex] = useState(0);

 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) =>
        prevIndex === menu.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds (adjust as needed)

    return () => clearInterval(intervalId);
  }, [menu.length]);

  return (
    <div className="flex justify-evenly divide-y divide-stone-200 px-2 h-screen w-screen">
      {/* <div>
        <FirstCont />
      </div> */}
      <div>
        {/* Scroll Bar */}
        <div className="overflow-x-auto whitespace-nowrap">
          {/* Add your images inside this container */}
          <div className="flex space-x-4">
            {menu.map((pizza, index) => (
              <img
                key={index}
                src={pizza.imageUrl}
                alt={pizza.name}
                className={`inline-block max-w-full h-auto ${
                  index === imageIndex ? "" : "hidden"
                }`}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            ))}
          </div>
        </div>
        <div>
          <ul className="divide-y divide-stone-200 px-2 py-2">
            {menu.map((pizza) => (
              <MenuItem pizza={pizza} key={pizza.id} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Fetching the menu data
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
