import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { clearCart, getcart } from './cartSlice';
import {
  addItem,
  removeItem,
  increaseCount,
  decreaseCount,
  getcart,
  clearCart,
} from "../../ui/store/addTocart";

function Cart() {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);
  const [idvalue, setIdValue] = React.useState("");
  const cartItems = useSelector((state) => state.cartFunction.cartItems); // Extracting cartItems directly
  // setIdValue(cartItems[0]._id)
  console.log(cartItems[0]._id);
  // cons
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.userdata);

  // Check if cartItems is empty, and render EmptyCart component if it is
  if (!cartItems.length) return <EmptyCart />;

  return (
    <div className="px-3 py-3">
      {/* <LinkButton to="/allmess">&larr; Back to menu</LinkButton> */}

      <h2 className="mt-7 text-xl font-semibold">
        Your cart, {userdata[0].name}
      </h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cartItems.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to={`/order/neworder/${cartItems[0]._id}`} type="primary">
          Book Mess
        </Button>
        <Button
          type="secondary"
          onClick={() => {
            dispatch(clearCart());
            navigate("/allListings");
          }}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
