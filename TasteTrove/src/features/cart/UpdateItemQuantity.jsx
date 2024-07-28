import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";
import {
  addItem,
  removeItem,
  increaseCount,
  decreaseCount,
  getcart,
} from "../../ui/store/addTocart";
// eslint-disable-next-line no-unused-vars, react/prop-types
function UpdateItemQuantity({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseCount(item))}>
        -
      </Button>
      <span className="text-sm font-medium">{item.cartQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseCount(item))}>
        +
      </Button>
      Total Price :<p>{item.totalAmount}</p>
    </div>
  );
}

export default UpdateItemQuantity;
