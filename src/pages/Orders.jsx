import { useEffect, useState } from "react";
import "./Orders.css";
import { url } from "./Info";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // 🔹 Fetch all orders of logged-in user
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    fetch(`${url}/myorders/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setOrders(
            data.data.map((order) => ({
              id: order._id,
              cropName: order.crop_name,
              image: order.image,
              seller: order.seller_email,

              orderDate: new Date(order.order_date).toLocaleDateString(
                "en-IN",
                { day: "2-digit", month: "short", year: "numeric" }
              ),

              deliveryDate: new Date(order.delivery_date).toLocaleDateString(
                "en-IN",
                { day: "2-digit", month: "short", year: "numeric" }
              ),

              amount: order.amount,
              quantity: `${order.quantity} Kg`,
              status: order.status,

              otp:
                order.status === "delivered"
                  ? "✔ Verified"
                  : order.status === "cancelled"
                  ? "❌ Cancelled"
                  : order.otp,

              address: order.address,
              pincode: order.pincode
            }))
          );
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔴 Cancel Order Logic
  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      const res = await fetch(`${url}/cancelorder/${orderId}`, {
        method: "PUT"
      });

      const data = await res.json();

      if (data.status === "success") {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  status: "cancelled",
                  otp: "❌ Cancelled"
                }
              : order
          )
        );
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="orders-page">
      <h2 className="orders-title">My Orders</h2>

      <div className="orders-container">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            {/* IMAGE */}
            <div className="order-image">
              <img src={order.image} alt={order.cropName} />
            </div>

            {/* DETAILS */}
            <div className="order-details">
              <h3>{order.cropName}</h3>
              <p className="seller">Seller: {order.seller}</p>

              <div className="order-meta">
                <span>Order: {order.orderDate}</span>
                <span>Delivery: {order.deliveryDate}</span>
              </div>

              <div className="order-address">
                📍 {order.address}
              </div>

              <div className="amount">₹ {order.amount}</div>

              <div className="otp-box">
                OTP: <strong>{order.otp}</strong>
              </div>
            </div>

            {/* ACTION COLUMN */}
            <div className="order-actions">
              <span className={`status ${order.status.toLowerCase()}`}>
                Status: {order.status}
              </span>

              <span className="quantity">
                Qty: <strong>{order.quantity}</strong>
              </span>

              <span className="pincode">
                PIN: <strong>{order.pincode}</strong>
              </span>

              {/* ❌ Cancel Button (Removed after cancellation) */}
              {order.status !== "delivered" &&
                order.status !== "cancelled" && (
                  <button
                    className="cancel-btn"
                    onClick={() => cancelOrder(order.id)}
                  >
                    Cancel Order
                  </button>
                )}
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p style={{ textAlign: "center", width: "100%" }}>
            No orders found 📦
          </p>
        )}
      </div>
    </div>
  );
}
