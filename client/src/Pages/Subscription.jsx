import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../Utils/axiosInstance";
import { toast } from "react-toastify";
import "../CSS/Subscription.css";
import { useEffect } from "react";
import { me } from "../Redux/Slices/AuthSlice";

const Subscription = () => {
  
  const {user}=useSelector(state=>state.auth);
  console.log('user',user);
  const dispatch=useDispatch();

  const handleUpgrade = async (plan) => {
    try {
      const { data } = await axiosInstance.post(
        "/subscription",
        { plan }
      );

      if (data.status) {
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Unable to proceed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  useEffect(()=>{
    const res=dispatch(me()).unwrap();
    console.log('my res',res)
  },[])

  return (
    <div className="subscription-page">
      <h2>My Subscription</h2>

      <div className="current-plan">
        <p>
          Current Plan:
          <strong>
            {user?.subscriptionActive ? user?.subscriptionPlan : "FREE"}
          </strong>
        </p>
      </div>

      <div className="plans-container">
        <div className="plan-card">
          <h3>BASIC</h3>
          <p className="price">₹199 / month</p>
          <ul>
            <li>✔ 10% discount on orders</li>
            <li>✔ Limited restaurants</li>
          </ul>

          <button
            disabled={user?.subscriptionPlan === "basic" || user?.subscriptionPlan === "advanced"}
            onClick={() => handleUpgrade("basic")}
          >
            {user?.subscriptionPlan === "basic" ? "Current Plan" : "Upgrade"}
          </button>
        </div>

        <div className="plan-card featured">
          <h3>ADVANCED</h3>
          <p className="price">₹499 / month</p>
          <ul>
            <li>✔ 50% discount on orders</li>
            <li>✔ All restaurants unlocked</li>
          </ul>

          <button
            disabled={user?.subscriptionPlan === "advanced"}
            onClick={() => handleUpgrade("advanced")}
          >
            {user?.subscriptionPlan === "advanced" ? "Current Plan" : "Upgrade"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
