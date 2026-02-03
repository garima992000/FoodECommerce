import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../Redux/Slices/OrderSlice";
import OrderCard from "../../Components/OrderCard";
import "../../CSS/OrderCard.css";
import { me } from "../../Redux/Slices/AuthSlice";

const MyOrders = () => {
  const{user}=useSelector(state=>state.auth);
  const { orders = [], loading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const handleMyOrders = async () => {
    const res = await dispatch(getMyOrders());
    return res.data;
  };
  useEffect(()=>{
    dispatch(me());
  },[])
  useEffect(() => {
    handleMyOrders();
  }, [dispatch]);
  console.log(orders)
  return (
    <div className="orders-page">
      <h1 className="orders-title">Order History</h1>
      {loading && <p className="cart-status">Loading Orders...</p>}

      {!loading && error && <p className="cart-error">{error}</p>}

      {!loading && !error && orders?.length === 0 && (
        <p className="cart-empty">You haven't Ordered Yet!!</p>
      )}

      {!loading && !error && orders?.length > 0 && (
        <div className="orders-list">
          {orders?.map((order) => (
             <OrderCard key={order._id} order={order} user={user}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
