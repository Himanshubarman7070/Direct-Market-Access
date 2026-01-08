import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { url } from "./Info";

export default function PlaceOrder() {
  const usenavigate = useNavigate();
  const { state } = useLocation();
  const item = state;

  // ✅ FIX: support both cropId & crop_id
  const cropId = item?.cropId || item?.crop_id;

  const [quantity, setQuantity] = useState(1);
  const [place, setPlace] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  // 🔹 Fetch delivery charge
  useEffect(() => {
    if (!cropId) return;

    fetch(`${url}/deliverycharge/${cropId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setDeliveryCharge(data.delivery_charge);
        }
      })
      .catch((err) => console.log(err));
  }, [cropId]);

  // 🧮 Price calculation
  const itemTotal = item.price * quantity;
  const finalPrice = itemTotal + deliveryCharge + 10;

  // 🔴 CONFIRM ORDER LOGIC
  const confirmOrder = () => {
    if (!cropId) {
      alert("Crop not found. Please try again.");
      return;
    }

    if (quantity <= 0) {
      alert("Quantity must be at least 1 kg");
      return;
    }

    fetch(`${url}/placeorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_email: localStorage.getItem("email"),
        seller_email: item.seller,
        crop_id: cropId,
        crop_name: item.name,
        image: item.image,
        quantity: quantity,
        amount: finalPrice,
        address: place || localStorage.getItem("address"),
        mobile: localStorage.getItem("mobile"),
        pincode: localStorage.getItem("pincode")
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          usenavigate("/mainpage/orders");
        } else {
          alert(data.message || "Order failed");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Server error. Try again.");
      });
  };

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

          {/* Delivery Address */}
          <div className="place-order-field place-selector_name">
            <div className="place-order-address-header">
              <label className="place-order-label">
                Delivery Location in your Pincode-
                {localStorage.getItem("pincode")}
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

          {/* Price Summary */}
          <div className="place-order-summary">
            <p>
              Items Total Price: <span>₹{itemTotal}</span>
            </p>
            <p>
              Delivery Charge: <span>₹{deliveryCharge}</span>
            </p>
            <p>
              Web Service Charge: <span>₹10</span>
            </p>
            <p className="place-order-final">
              Final Amount: <span>₹{finalPrice}</span>
            </p>
          </div>

          {/* ✅ Confirm Order */}
          <button
            type="button"
            className="place-order-confirm-btn"
            onClick={confirmOrder}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
