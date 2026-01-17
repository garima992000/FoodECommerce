import React, { useState } from "react";
import "../CSS/Register.css";
import { registerUser } from "../Redux/Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {loading,error,user}=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const payload = {
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      password: registerData.password,
      role: registerData.role,
      address: {
        street: registerData.street,
        city: registerData.city,
        state: registerData.state,
        pincode: registerData.pincode,
        landmark: registerData.landmark,
      },
    };
    console.log(registerData);
    const res=await dispatch(registerUser(payload)).unwrap();
    const{message,status}=res;
    if(status===true){
      toast.success(message);
      navigate('/login');
    }
    console.log('registered',res)
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Create Account</h2>

        <form>
          <div>
            <label>Name</label>
            <input type="text" name="name" onChange={handleChange} />
          </div>

          <div>
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} />
          </div>

          <div>
            <label>Phone</label>
            <input type="number" name="phone" onChange={handleChange} />
          </div>

          <div>
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>

          <div>
            <label>Street</label>
            <input type="text" name="street" onChange={handleChange} />
          </div>

          <div>
            <label>City</label>
            <input type="text" name="city" onChange={handleChange} />
          </div>

          <div>
            <label>State</label>
            <input type="text" name="state" onChange={handleChange} />
          </div>

          <div>
            <label>Pincode</label>
            <input type="number" name="pincode" onChange={handleChange} />
          </div>

          <div>
            <label>Landmark</label>
            <input type="text" name="landmark" onChange={handleChange} />
          </div>

          <div>
            <label>Role</label>
            <select
              name="role"
              value={registerData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="restaurant_owner">Restaurant Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="button" onClick={handleSubmit}>Register</button>

          <p>
            Already have an account? <span>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
