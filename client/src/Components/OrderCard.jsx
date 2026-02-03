import React from "react";
import "../CSS/OrderCard.css";
const OrderCard = ({ order,user }) => {
  
  return (
    <div className="order-card">
      <div className="order-header">
        <div className="order-header-left">
          <h3 className="restaurant-name">{order.restaurantId.name}</h3>
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
        </div>

        <div className="order-total">Total: ₹{order.totalAmount}</div>
      </div>
    </div>
  );
};

export default OrderCard;
