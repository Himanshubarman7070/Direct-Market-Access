import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PlaceOrder.css";

export default function PlaceOrder() {
  const usenavigate = useNavigate();
  const { state } = useLocation();
  const item = state;

  const [quantity, setQuantity] = useState(1);
  const [place, setPlace] = useState("");

  const deliveryCharge =
    quantity < 10 ? 40 : (quantity / 10) * 20 + 40;

  const itemTotal = item.price * quantity;
  const finalPrice = itemTotal + deliveryCharge+10;

  return (
    <div className="place-order-page">
      <div className="place-order-card">
        <img
          src={item.image}
          alt={item.name}
          className="place-order-image"
        />

        <div className="place-order-details">
          <h2 className="place-order-title">{item.name}</h2>

          <p className="place-order-seller">
            Seller: <span>{item.seller}</span>
          </p>

          <p className="place-order-price">
            Price per kg: <span>₹{item.price}</span>
          </p>

          {/* Quantity */}
          <div className="place-order-field">
            <label className="place-order-label">
              Quantity (kg)
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
              className="place-order-input"
            />
          </div>

          {/* Delivery Location */}
          <div className="place-order-field place-selector_name">
            <div className="place-order-address-header">
              <label className="place-order-label">
                Delivery Location in your Pincode-{545345}
              </label>

              <button
                type="button"
                className="place-order-change-btn"
                onClick={() => setPlace("")}
              >
                Change Address
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter delivery address"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="place-order-input place-selector_input"
            />
          </div>

          {/* Price Breakdown */}
          <div className="place-order-summary">
            <p>
              Items Total Price: <span>₹{itemTotal}</span>
            </p>
            <p>
              Delivery Charge: <span>₹{deliveryCharge}</span>
            </p>
            <p>
              Web  Service Charge: <span>₹10</span>
            </p>
            <p className="place-order-final">
              Final Amount: <span>₹{finalPrice}</span>
            </p>
          </div>

          <button type="button" onClick={()=>{usenavigate('/mainpage/orders',{state:{
      
      id: item.id,
      cropName: item.name,
      image:
        item.image,
      seller: item.seller,
      orderDate: "30 Dec 2025",
      deliveryDate: "03 Jan 2026",
      amount: finalPrice,
      quantity: quantity,
      status: "confirm",
      otp: Math.floor(Math.random()*100000),
      address: "Near Bus Stand, Kolar Road, Bhopal, MP",
      pincode: "462042",
    }})}} className="place-order-confirm-btn">
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
