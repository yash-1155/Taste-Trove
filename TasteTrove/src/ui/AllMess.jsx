/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Button from "../../ui/Button";
// import { Button } from "react-bootstrap";
// import { formatCurrency } from "../../utils/helpers";
// import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
// import DeleteItem from "../cart/DeleteItem";
// import UpdateItemQuantity from "../cart/UpdateItemQuantity";

import { BsStarFill, BsCursor } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { BsFillBrightnessHighFill } from "react-icons/bs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import "./styles.css";
function AllMess({ pizza }) {
    const dispatch = useDispatch();

    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

    //   const currentQuantity = useSelector(getCurrentQuantityById(id));
    const isInCart = currentQuantity > 0;

    function handleAddToCart() {
        const newItem = {
            pizzaId: id,
            name,
            quantity: 1,
            unitPrice,
            totalPrice: unitPrice * 1,
        };
// dispatch(addItem(newItem));
    }

    return (
        <>
            <div
                className="p-2"
                style={{ display: "flex", justifyContent: "space-evenly" }}
            >
                <div className="hover:scale-105 transition-transform duration-300">
                    <Link to="/menu/item">
                        <img
                            style={{ width: "45vh", height: "90%", borderRadius: "5%" }}
                            src={imageUrl}
                            //   className={h-48 ${soldOut ? "opacity-70 grayscale" : ""}}
                            alt=""
                        />
                    </Link>
                </div>
                <div>
                    <div className="menuk1 ml-4" style={{ padding: "9.5%" }}>
                        <h1 className="" style={{ fontSize: "1.8rem" }}>
                            {name}
                        </h1>
                        <h4 style={{ padding: 5, fontSize: "1rem" }}>Amrutdham</h4>

                        <div className="flex flex-row pt-2">
                            <BsStarFill className=" text-brightColor" />
                            <BsStarFill className=" text-brightColor" />
                            <BsStarFill className=" text-brightColor" />
                            <BsStarFill className=" text-brightColor" />
                            <BsStarHalf className=" text-brightColor" />
                        </div>
                        <div className="pt-5">
                            <p className="">🌞11:55 - 1:30 </p>

                            <p className="pt-1">🌙07:00 : 9:30</p>
                        </div>
                        <div className="pt-3 pb-3" style={{ display: "flex" }}>
                            <h6>Starts from: {formatCurrency(unitPrice)}</h6>
                        </div>
                        <div>
                            <div className="mt-auto flex items-center justify-between">
                                {!soldOut ? (
                                    <p className="text-sm"></p>
                                ) : (
                                    <p className="text-sm font-medium uppercase text-stone-500">
                                        Sold out
                                    </p>
                                )}

                                {isInCart && (
                                    <div className="flex items-center pt-4 gap-3 sm:gap-8">
                                        <UpdateItemQuantity
                                            pizzaId={id}
                                            currentQuantity={currentQuantity}
                                        />
                                        <DeleteItem pizzaId={id} />
                                    </div>
                                )}

                                {!soldOut && !isInCart && (
                                    <Button
                                        className="pt-4"
                                        type="small"
                                        onClick={handleAddToCart}
                                    >
                                        Book Now
                                    </Button>
                                )}
                            </div>

                            {/* <button
                style={{
                  backgroundColor: "#FAA300",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "20%",
                }}
              >
                BookNow
              </button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <h3 className=" font-semibold text-lg">{unitPrice}</h3> */}
        </>
    );
}

export default AllMess;