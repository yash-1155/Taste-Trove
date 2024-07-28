/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <div className="row md:row-span-2 sm:row-span-1 ">
      <div className="w-54 h-52 bg-gray-100 rounded-lg shadow-2xl relative overflow-hidden">
        <li className="flex gap-4 py-2">
          <img
            src={imageUrl}
            alt={name}
            className={`h-48 ${soldOut ? "opacity-70 grayscale" : ""}`}
          />
          <div className="flex grow flex-col pt-0.5">
            <p className="font-medium">{name}</p>
            <p className="text-sm capitalize italic text-stone-500">
              {ingredients.join(", ")}
            </p>
            <div className="mt-auto flex items-center justify-between">
              {!soldOut ? (
                <p className="text-sm">{formatCurrency(unitPrice)}</p>
              ) : (
                <p className="text-sm font-medium uppercase text-stone-500">
                  Sold out
                </p>
              )}

              {isInCart && (
                <div className="flex items-center gap-3 sm:gap-8">
                  <UpdateItemQuantity
                    pizzaId={id}
                    currentQuantity={currentQuantity}
                  />
                  <DeleteItem pizzaId={id} />
                </div>
              )}

              {!soldOut && !isInCart && (
                <Button type="small" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </li>
      </div>
    </div>
  );
}

export default MenuItem;
