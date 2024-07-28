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
import { fetchAddress } from '../user/userSlice';
import axios from 'axios';


// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
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
      const result = await createOrderAction(params);
  
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
      <Form method='post' >
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

        {/* <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 sm:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  // eslint-disable-next-line no-undef
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div> */}

        {/* <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring  focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div> */}

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
          <Button disabled={isSubmitting || isLoadingAddress} onClick={submitOrder} type="primary">
            {isSubmitting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(cart[0].totalAmount)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
// Import any necessary dependencies
// import axios from 'axios';

// Define the action function
const createOrderAction = async (params) => {
  try {
    // Extract the userid from the params
    const { userid } = params;

    // Perform any necessary data retrieval or processing
    // For example, fetch additional information related to the user

    // Make a POST request to create a new order
    const response = await axios.post(`http://localhost:3000/order/${userid}`, {
      action: 'create',
      // Include any additional data needed for creating the order
    }, { withCredentials: true });

    // Optionally, handle the response data

    // Return any relevant data or perform additional actions
    // return response.data;
    navigate('/')
  } catch (error) {
    // Handle any errors
    console.error('Error creating order:', error);
    // Optionally, you can throw the error to propagate it to the caller
    throw error;
  }
};

// Export the action function
export { createOrderAction };


export default CreateOrder;
