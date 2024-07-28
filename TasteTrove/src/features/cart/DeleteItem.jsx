import { useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';
import {addItem,removeItem,increaseCount,decreaseCount,getcart} from "../../ui/store/addTocart"
// eslint-disable-next-line react/prop-types
function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  return (
    <Button type="small" onClick={() => {dispatch(removeItem(pizzaId))
    navigate("/allListings")}}>
      Delete
    </Button>
  );
}

export default DeleteItem;
