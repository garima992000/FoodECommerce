import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {loading,error,isAuthenticated,role}=useSelector(state=>state.auth);
  const[loginFormData,setLoginFormData]=useState({
    email:'',
    password:''
  })
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setLoginFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(loginFormData);
    dispatch(loginUser(loginFormData));
  }

  useEffect(()=>{
    if(isAuthenticated){
      if(role==='user'){
        navigate('/')
      }
      else if(role==='admin'){
        navigate('/admin')
      }
      else if(role==='restaurant_owner'){
        navigate('/owner')
      }
    }
  },[isAuthenticated, role, navigate])
  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" name='email' placeholder="Enter your email" onChange={handleChange}required />
        </div>

        <div>
          <label>Password</label>
          <input type="password" name='password' placeholder="Enter your password" onChange={handleChange}required />
        </div>

        <button type="submit" disabled={loading}>
          {loading? "Logging In...":"LogIn"}
          </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Don’t have an account? <span>Register</span>
      </p>
    </div>
  );
};

export default Login;
