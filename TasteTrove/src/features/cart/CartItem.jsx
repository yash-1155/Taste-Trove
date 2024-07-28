/* eslint-disable react/prop-types */

import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';
import { getCurrentQuantityById } from './cartSlice';
import {addItem,removeItem,increaseCount,decreaseCount,getcart} from "../../ui/store/addTocart"

/* eslint-disable no-unused-vars */
function CartItem({ item }) {
  const {  _id,
    name,
    rating,
    pricePerMeal,
    pricePerMonth,
    image,
    address,
    days,
    latitude,
    longitude,
    MorningStart,
    MorningEnd,
    NightStart,
    NightEnd,
    OpearationalDirectives,cartQuantity,totalAmount } = item;
  
  // const quantity=cardData.totalAmount/item.pricePerMeal
  // const currentQuantity = useSelector((state)=> state.cardFunction);

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {cartQuantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        {/* <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p> */}

        <UpdateItemQuantity
          item={item}
        />

        <DeleteItem pizzaId={_id} />
      </div>
    </li>
  );
}

export default CartItem;
