import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const navigate = useNavigate();

  const [crops, setCrops] = useState([
    {
      id: 1,
      name: "Tomato",
      seller: "Ramesh Patel",
      contact: "FARM123",
      price: 25,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469",
    },
    {
      id: 2,
      name: "Potato",
      seller: "Suresh Yadav",
      contact: "FARM456",
      price: 18,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1582515073490-dc84f2a6f4a8",
    },
    {
      id: 3,
      name: "Onion",
      seller: "Mahesh Singh",
      contact: "FARM789",
      price: 22,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1604908177522-4026bde57c21",
    },
  ]);

  const removeItem = (id) => {
    setCrops(crops.filter((item) => item.id !== id));
  };

  return (
    <div className="cart-page">
      {crops.length === 0 && (
        <div className="cart-empty">Your cart is empty</div>
      )}

      {crops.map((crop) => (
        <div key={crop.id} className="cart-card">
          <img
            src={crop.image}
            alt={crop.name}
            className="cart-image"
          />

          <div className="cart-content">
            <div className="cart-header">
              <h3 className="cart-title">{crop.name}</h3>
              <span className="cart-rating">⭐ {crop.rating}</span>
            </div>

            <div className="cart-info">
              <p><b>Seller:</b> {crop.seller}</p>
              <p><b>Contact ID:</b> {crop.contact}</p>
              <p><b>Price:</b> ₹{crop.price}/kg</p>
            </div>
          </div>

          <div className="cart-action">
            {/* REMOVE FIRST */}
            <button
              className="cart-remove-btn"
              onClick={() => removeItem(crop.id)}
            >
              Remove
            </button>

            {/* PLACE ORDER LAST */}
            <button
              className="cart-place-btn"
              onClick={() =>
                navigate("/place", {
                  state: {
                    id: crop.id,
                    name: crop.name,
                    seller: crop.seller,
                    price: crop.price,
                    image: crop.image,
                  },
                })
              }
            >
              Place Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
