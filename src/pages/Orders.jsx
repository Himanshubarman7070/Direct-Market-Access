import { useLocation } from "react-router-dom";
import "./Orders.css";

export default function Orders() {
  const {state} = useLocation();
  let item = state;
  const orders = [
    {
      id: "ORD12345",
      cropName: "Tomato",
      image:
        "https://images.unsplash.com/photo-1607305387299-a3d9611cd469",
      seller: "Ramesh Patel",
      orderDate: "02 Jan 2026",
      deliveryDate: "05 Jan 2026",
      amount: 250,
      quantity: "10 Kg",
      status: "Packed",
      otp: "4829",
      address: "House No 21, Arera Colony, Bhopal, MP",
      pincode: "462001",
    },
    {
      id: "ORD12346",
      cropName: "Potato",
      image:
        "https://images.unsplash.com/photo-1582515073490-dc84f2a6f4a8",
      seller: "Suresh Yadav",
      orderDate: "30 Dec 2025",
      deliveryDate: "03 Jan 2026",
      amount: 180,
      quantity: "5 Kg",
      status: "Delivered",
      otp: "✔ Verified",
      address: "Near Bus Stand, Kolar Road, Bhopal, MP",
      pincode: "462042",
    },
  ];
  if(item)
 orders.push(item)
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

              {order.status !== "Delivered" && (
                <button className="cancel-btn">Cancel Order</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
