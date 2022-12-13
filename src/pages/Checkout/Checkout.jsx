import "./Checkout.css";
import { v4 as uuid } from "uuid";
import { AddressCard } from "./AddressCard/AddressCard";
import { AddressFormModal } from "./AddressFormModal/AddressFormModal";
import { useStateContext } from "../../context/stateContext";
import { ADD_ORDER } from "../../utils/constants";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAddress } from "../../utils/getDataFromServer";
import { useAuth } from "../../context/authContext";
import { priceDetails } from "../../utils/helper";
import { RouteSection } from "../../components";
import { removeFromCart } from "../../utils/getDataFromServer";
import toast from "react-hot-toast";
export const Checkout = () => {
  const [addressModalActive, setAddressModalActive] = useState(false);
  const { state: { address, productInCart, orderDetails }, dispatch } = useStateContext();
  const { authState: { token,userDetails } } = useAuth();
  const navigate = useNavigate();
  const {name,email}=userDetails || "";
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const { price, discount } = priceDetails(productInCart);
  useEffect(() => {
    getAddress(token, dispatch);

  }, [])

const clearAllCart=()=>{
productInCart.forEach(element => {
  removeFromCart(token,dispatch,element._id);
});
  }
  const razorpayHandler=()=>{
    deliveryAddress?
       displayRazorPay()
       :toast.error("Pick delivery address!");
  }
  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const displayRazorPay=async()=>{
    const res=await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
    if (!res) {
      toast.error('Razorpay SDK failed to load, check you connection');
      return;
    }
    const options = {
      key: 'rzp_test_XKtqLi90LtQ8nB',
      amount:(price - discount) *100,
      currency: 'INR',
      name: 'Decoor',
      description: 'Thank you for shopping with us',
      image:
        'https://res.cloudinary.com/dgomw715r/image/upload/v1655122821/ProjectImages/ecomm2_r6nyji.png',
      handler: function (response) {
            dispatch({
            type: ADD_ORDER, payload: {
            id: response.razorpay_payment_id,
            orderItem: productInCart,
            totalAmount: price - discount,
            orderAddress: deliveryAddress
        }
      })
      navigate("/orderDetails");
      clearAllCart();
      },
      prefill: {
        contact: '9999999999',
        name:name,
        email:email
      },
      theme: {
        color: '#8f9ad6',
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <>
      <RouteSection path={"Checkout"} />
      <section className="order-page section">
        <article className="address-container">
          <h4>Deliver to</h4>
          <div className="address-details">
            <div className="address-list">
              {address.map((addressList) => (
                <AddressCard addressDetail={addressList} setDeliveryAddress={setDeliveryAddress} />
              ))}
            </div>
          </div>
          <button className="add-address" onClick={() => setAddressModalActive(prev => !prev)}>Add New Address +</button>
        </article>
        {productInCart.length > 0 ?
          <article className="order-container">
            <h4>Order Summary</h4>

            <div className="order-items">
              <p>Items</p>
              <div>
                {productInCart?.map((orderItem) => (

                  <div className="items top-gutter-sm">
                    <span>{orderItem.title}</span>
                    <span>X {orderItem.qty}</span>
                  </div>

                ))}
              </div>
              <p>Price Details</p>
              <div>
                <div className="items top-gutter-sm">
                  <span>Price (items)</span>
                  <span>Rs.{price}</span>
                </div>
                <div className="items top-gutter-sm">
                  <span>Discount</span>
                  <span>Rs.{discount}</span>
                </div>
                <div className="items top-gutter-sm">
                  <span>Total Amount</span>
                  <span>Rs.{price - discount}</span>
                </div>
              </div>
              <p className="discount-message">
                you will save Rs.{discount}
              </p>
              <button className="order-btn top-gutter-md btn btn-solid-primary btn-lg" onClick={razorpayHandler}>Place Order</button>
            </div>
          </article>
          : <article className="empty-order">
            <img src="../Assets/cart_empty.png" className="img-responsive"></img>
            <Link to="/products" className=" btn btn-solid-primary btn-sm ">Shop now</Link>
          </article>}
      </section>
      <AddressFormModal isOpen={addressModalActive} onClose={() => setAddressModalActive(false)} />
    </>
  )
}