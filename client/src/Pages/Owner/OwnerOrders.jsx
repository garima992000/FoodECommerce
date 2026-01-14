import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnerOrders } from "../../Redux/Slices/OrderSlice";
import OrderCard from "../../Components/OrderCard";
import OwnerCard from "../../Components/OwnerCard";
import '../../CSS/OwnerOrders.css'
const OwnerOrders = () => {
  const { orders = [], loading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOwnerOrders());
  }, [dispatch]);
  return (
    <div className="owner-orders-page">
      <h1 className="owner-orders-title">Incoming Orders</h1>
      {loading && <p>Loading Orders...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && orders?.length === 0 && (
        <p>No orders received yet</p>
      )}

      {!loading && !error && orders?.length > 0 && (
        <div className="orders-list">
          {orders?.map((order) => (
            <OwnerCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerOrders;
