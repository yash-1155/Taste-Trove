// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function SearchOrder() {
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!query) return;
//     navigate(`/order/${query}`);
//     setQuery("");
//   }

//   return (
//     <form onSubmit={handleSubmit} action="">
//       <input
//         placeholder="🔍 Search order #"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className=" w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
//       />
//     </form>
//   );
// }

// export default SearchOrder;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import the search icon
import {addSearchValue, removeSearchValue} from '../../ui/store/searchfunctionality'
import { useDispatch } from "react-redux";
function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  const sendSearchValue=(payload)=>{
    console.log("val:"+payload)
    dispatch(addSearchValue(payload))
  }
  return (
    <form onSubmit={handleSubmit} action="">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          placeholder="Search order "
          value={query}
          onChange={(e) => {setQuery(e.target.value)
            sendSearchValue(e.target.value)}}
          className="pl-10 w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
        />
      </div>
    </form>
  );
}

export default SearchOrder;
