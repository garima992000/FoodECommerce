import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FoodCard from "../Components/FoodCard";
import "../CSS/FoodCard.css";
import { addFood, deleteFood, fetchOwnerMenu, updateFood } from "../Redux/Slices/MenuSlice";
import { toast } from "react-toastify";
const initialModalData = {
  name: "",
  description: "",
  category: "",
  price: "",
  isVeg: true,
  isAvailable: true,
};
const OwnerMenu = () => {
  const [modal, setModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [modalData, setModalData] = useState(initialModalData);
  const { menuItems = [], loading, error } = useSelector((state) => state.menu);
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setModalData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const openAddModal = () => {
    setModalMode("add");
    setModal(true);
    setModalData(initialModalData);
  };
  const handleEdit = (data) => {
    setModalMode("edit");
    setModal(true);
    setModalData(data);
  };
  const handleDelete=async(id)=>{
      const res=await dispatch(deleteFood(id)).unwrap();
      await dispatch(fetchOwnerMenu(restaurantId));
      const{status,message}=res;
      if(status===true){
        toast.success(message);
      }
      else{
        toast.error(message);
      }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !modalData.name ||
      !modalData.description ||
      modalData.price <= 0 ||
      !modalData.category
    ) {
      toast.error("Please fill the entire details");
      return;
    }
    if (modalMode === "add") {
      const res = await dispatch(
        addFood({ data: modalData, restaurantId })
      ).unwrap();
      const { message, status } = res;
      if (status === true) {
        toast.success(message);
        setModalData(initialModalData);
        setModal(false);
        dispatch(fetchOwnerMenu(restaurantId));
      } else {
        toast.error(message);
      }
    } else {
      const res=await dispatch(updateFood({data:modalData,foodId:modalData._id})).unwrap();
      console.log('update res',res);
      const{status,message}=res;
      if(status===true){
        toast.success(message);
        setModalData(initialModalData);
        setModal(false);
      }
      else {
        toast.error(message);
      }
    }
  };
  useEffect(() => {
    dispatch(fetchOwnerMenu(restaurantId));
  }, [dispatch, restaurantId]);
  console.log(menuItems);
  return (
    <div className="menu-page">
      <div className="menu-container">
        <div className="menu-header">
          <h2 className="menu-title">Menu</h2>

          <button
            className="add-food-btn"
            onClick={openAddModal}
            disabled={loading}
          >
            + Add Food
          </button>
          {modal && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-header">
                  <h3>{modalMode === "add" ? "Add New Food" : "Edit Food"}</h3>
                  <span
                    className="modal-close"
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    ×
                  </span>
                </div>

                <div className="modal-body">
                  <div className="form-group">
                    <label>Food Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={modalData.name}
                      placeholder="Paneer Butter Masala"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Description *</label>
                    <textarea
                      rows="3"
                      name="description"
                      placeholder="Creamy tomato-based curry with paneer cubes"
                      value={modalData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={modalData.price}
                      placeholder="220"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <input
                      type="text"
                      name="category"
                      value={modalData.category}
                      placeholder="Main Course"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <label className="checkbox-group">
                      <input
                        type="checkbox"
                        name="isVeg"
                        checked={modalData.isVeg}
                        onChange={handleChange}
                      />
                      <span>Veg</span>
                    </label>

                    <label className="checkbox-group">
                      <input
                        type="checkbox"
                        name="isAvailable"
                        checked={modalData.isAvailable}
                        onChange={handleChange}
                      />
                      <span>Available</span>
                    </label>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn-cancel"
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button className="btn-primary" onClick={handleSubmit}>
                    {modalMode === "add" ? "Add Food" : "Update Food"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {loading && <p className="menu-status">Loading Menu...</p>}

        {!loading && error && <p className="menu-error">{error}</p>}

        {!loading && !error && menuItems.length === 0 && (
          <p className="menu-empty">No food items available!!</p>
        )}

        {!loading && !error && menuItems.length > 0 && (
          <div className="menu-grid">
            {menuItems.map((food) => (
              <FoodCard
                key={food._id}
                food={food}
                role="owner"
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerMenu;
