import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  getCart,
  removeCart,
  updateCart,
} from "../../Redux/Slices/CartSlice";
import "../../CSS/Cart.css";
import { placeOrder } from "../../Redux/Slices/OrderSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../Utils/axiosInstance";

const Cart = () => {
  const navigate=useNavigate();
  const {
    items = [],
    totalAmount,
    originalAmount,
    discountPrice,
    loading,
    error,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  
  // const handlePlace=async()=>{
  //   const res=await dispatch(placeOrder());
  //   const{status,message}=res.payload;
  //   console.log('PlaceOrder',status,message);
  //   if(status===true){
  //     toast.success(message);
  //     setTimeout(()=>{
  //       navigate('/myorders')
  //     },500)
  //   }
  // }

  const handlePlace=async()=>{
    try {
      const {data}=await axiosInstance.post('/create-checkout-session');
      window.location.href=data.url;
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">My Cart</h1>

        {loading && <p className="cart-status">Loading Cart...</p>}

        {!loading && error && <p className="cart-error">{error}</p>}

        {!loading && !error && items.length === 0 && (
          <p className="cart-empty">Your cart is empty</p>
        )}

        {!loading && !error && items.length > 0 && (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.foodId}>
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                  <div className="item-actions">
                    <div className="item-qty">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          dispatch(
                            updateCart({
                              foodId: item.foodId,
                              quantity: -1,
                            })
                          )
                        }
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() =>
                          dispatch(
                            updateCart({
                              foodId: item.foodId,
                              quantity: 1,
                            })
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="delete-btn"
                      title="Remove item"
                      onClick={() => {
                        dispatch(deleteCart(item.foodId));
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>  
            <div className="clear-cart-wrapper">
              <button
                className="clear-cart-btn"
                onClick={() => {
                  dispatch(removeCart());
                }}
              >
                Clear Cart
              </button>
            </div>
            <div className="price-summary">
  <h3 className="summary-title">Price Details</h3>

  <div className="price-row">
    <span>Original Amount</span>
    <span>₹{originalAmount}</span>
  </div>

  <div className="price-row discount">
    <span>Discount</span>
    <span>- ₹{discountPrice}</span>
  </div>

  <div className="price-divider"></div>

  <div className="price-row total">
    <span>Total Amount</span>
    <span>₹{totalAmount}</span>
  </div>
</div>

            <div className="place-order-wrapper">
              <button className="place-order-btn" onClick={()=>{handlePlace()}}>Place Order</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
