import React from "react";
import "../CSS/OrderCard.css";

const NEXT_STATUS_MAP = {
  PLACED: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PREPARING", "CANCELLED"],
  PREPARING: ["OUT_FOR_DELIVERY"],
  OUT_FOR_DELIVERY: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};
const OwnerCard = ({ order }) => {
  const nextStatuses = NEXT_STATUS_MAP[order.orderStatus] || [];
  return (
    <div className="order-card owner-order-card">
      <div className="order-header">
        <div className="order-header-left">
          <h3 className="restaurant-name">Customer: {order.userId.name}</h3>

          <p className="order-date">Order ID: #{order._id.slice(-6)}</p>

          <p className="order-date">
            {new Date(order.createdAt).toLocaleDateString()} ·{" "}
            {new Date(order.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <span className={`order-status ${order.orderStatus.toLowerCase()}`}>
          {order.orderStatus}
        </span>
      </div>

      <div className="order-items">
        {order.items.map((item) => (
          <div className="order-item" key={item.foodId}>
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="order-footer">
        <div>
          <p className="payment-method">Payment: {order.paymentMethod}</p>
          <p className={`payment-status ${order.paymentStatus.toLowerCase()}`}>
            {order.paymentStatus}
          </p>
          {nextStatuses.length > 0 && (
            <select
              className="status-select"
              defaultValue=""
              onChange={(e) => {
                const newStatus = e.target.value;
                console.log("Change status to:", newStatus);
              }}
            >
              <option value="" disabled>
                Update Status
              </option>
              {nextStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="order-total">₹{order.totalAmount}</div>
      </div>
    </div>
  );
};

export default OwnerCard;
