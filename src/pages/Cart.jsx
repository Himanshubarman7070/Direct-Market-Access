import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { url } from "./Info";

export default function Cart() {
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);

  // 🔹 Fetch cart items on load
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    fetch(`${url}/mycart/${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setCrops(
            data.data.map(item => ({
              id: item._id,              // cart id
              cropId: item.crop_id,      // crop id
              name: item.crop_name,
              seller: item.seller_email,
              contact: item.seller_email,
              price: item.price,
              rating: 4.5,               // static rating
              image: item.image
            }))
          );
        }
      })
      .catch(err => console.log(err));
  }, []);

  // 🔹 Remove item from cart
  const removeItem = (id) => {
    fetch(`${url}/removefromcart/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setCrops(crops.filter(item => item.id !== id));
        }
      })
      .catch(err => console.log(err));
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
                    cropId: crop.cropId,
                    name: crop.name,
                    seller: crop.seller,
                    price: crop.price,
                    image: crop.image
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
