/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, redirect, useNavigation, useActionData,useParams,useNavigate } from 'react-router-dom';
// import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';
import {addItem,removeItem,increaseCount,decreaseCount,getcart} from '../../ui/store/addTocart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { useDispatch } from 'react-redux';
// import { fetchAddress } from '../user/userSlice';
import axios from 'axios';


// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrd() {
  const [withPriority, setWithPriority] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const userdata=useSelector((state)=>state.userdata)
  const isLoadingAddress = addressStatus === 'loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart1 = useSelector(getcart);
  const cart=cart1.payload.cartFunction.cartItems
  console.log(cart)
  // console.log(cart[0].totalAmount)
  // const totalCartPrice = useSelector(getTotalCartPrice);
  // const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  // const totalPrice = totalCartPrice + priorityPrice;
  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const submitOrder = async () => {
    try {
      // Call createOrderAction with the necessary parameters
      const result = await createOrderAction(params,phoneNumber,cart[0].totalAmount);
  
      // Optionally handle the result
      console.log('Order created successfully:', result);
  
      // Perform any navigation or UI updates as needed
      navigate('/'); // Example navigation to the home page
    } catch (error) {
      // Handle any errors
      console.error('Error creating order:', error);
      // Optionally, you can set an error state or display an error message to the user
    }
  };
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      {/* <Form method='post'  > */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input w-full"
            type="text"
            name="customer"
            defaultValue={userdata[0].name}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" onChange={handlePhoneChange} required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

       

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button onClick={submitOrder}  type="primary">
            {formatCurrency(cart[0].totalAmount)}
          </Button>
        </div>
      {/* </Form> */}
    </div>
  );
}
// Import any necessary dependencies
// import axios from 'axios';

// Define the action function
export async function createOrderAction (params,phoneNumber,totalAmount) {
    // try {
      // Extract the userid from the params
      const { userid } = params;
  
      // Perform any necessary data retrieval or processing
      // For example, fetch additional information related to the user
  
      // Make a POST request to create a new order
      console.log("1");
            axios.post(`http://localhost:3000/order/${userid}`, {
        phone: phoneNumber,
        totalAmount: totalAmount,
        }, { withCredentials: true })
        .then(response => {
            // console.log(response);
            // Handle success response here
        })
        .catch(error => {
            console.error(error);
            // Handle error here
        });
  
      // Optionally, handle the response data
  
      // Return any relevant data or perform additional actions
    //   return response.data;
    // } catch (error) {
      // Handle any errors
    //   console.error('Error creating order:', error);
      // Optionally, you can throw the error to propagate it to the caller
    //   throw error;
    // }
  };
  
  // Export the action function
//   export { createOrderAction };

export default CreateOrd;
