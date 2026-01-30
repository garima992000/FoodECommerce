import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BlockUser,
  fetchAllUsers,
  UnblockUser,
} from "../../Redux/Slices/AdminSlice";
import UserCard from "../../Components/UserCard";
import "../../CSS/Users.css";
import { toast } from "react-toastify";
import { useDebounce } from "../../CustomHooks/useDebounce";

const Users = () => {
  const[searchText,setSearchText]=useState('');
  const debouncedText=useDebounce(searchText,800);
  const { users = [], loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers(debouncedText));
    console.log(debouncedText)
  }, [dispatch,debouncedText]);
  const handleBlock = async (id) => {
    const res = await dispatch(BlockUser(id)).unwrap();
    await dispatch(fetchAllUsers());

    const { message, status } = res;
    if (status === true) {
      toast.success(message);
    } else {
      toast.error("Something is wrong!!");
    }

    console.log("blocked", res);
  };
  const handleUnblock = async (id) => {
    const res = await dispatch(UnblockUser(id)).unwrap();
    await dispatch(fetchAllUsers());

    const { message, status } = res;
    if (status === true) {
      toast.success(message);
    } else {
      toast.error("Something is wrong!!");
    }
    console.log("unblocked", res);
  };
  if (loading) return <h2 className="status-text">Loading users...</h2>;
  if (error) return <h2 className="status-text error">{error}</h2>;

  return (
    <div className="users-container">
      <h1 className="users-title">All Users</h1>
      <input className='users-searchbar' type='text' placeholder='Search User' value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>

      <div className="users-grid">
        {
          users?.length>0 ?
        users?.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            handleBlock={handleBlock}
            handleUnblock={handleUnblock}
          />
        ))
      :(
            <p>No users available</p>
          )
      }
        
      </div>
    </div>
  );
};

export default Users;
