import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { url } from "./Info";
import "./AllBookings.css";

export default function AllBookings() {
  const { state: crop } = useLocation();
  const sellerEmail = localStorage.getItem("email");

  const statusFlow = ["confirmed", "packed", "out for delivery", "delivered"];

  const statusLabel = {
    confirmed: "Order Confirmed",
    packed: "Packed",
    "out for delivery": "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled"
  };

  const [bookings, setBookings] = useState([]);

  // 🔹 FETCH BOOKINGS
  useEffect(() => {
    fetch(`${url}/bookings/${sellerEmail}/${crop.id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          const formatted = res.data.map((o) => ({
            id: o._id,
            buyerName: o.user_email,
            mobile: o.mobile,
            pincode: o.pincode,
            address: o.address,
            bookingDate: new Date(o.order_date).toLocaleDateString("en-IN"),
            deliveryDate: new Date(o.delivery_date).toLocaleDateString("en-IN"),
            quantity: `${o.quantity} Kg`,
            amount: `₹${o.amount}`,
            status: o.status,
            otpInput: "",
            otp: o.otp
          }));
          setBookings(formatted);
        }
      });
  }, [crop.id, sellerEmail]);

  // 🔹 UPDATE STATUS
  const updateStatus = async (id) => {
    const res = await fetch(`${url}/updateorderstatus/${id}`, {
      method: "PUT"
    });
    const data = await res.json();

    if (data.status === "success") {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: data.newStatus } : b
        )
      );
    }
  };

  // 🔹 CANCEL BOOKING
  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    const res = await fetch(`${url}/cancelbooking/${id}`, {
      method: "PUT"
    });
    const data = await res.json();

    if (data.status === "success") {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: "cancelled" } : b
        )
      );
    }
  };

  // 🔹 VERIFY OTP
  const submitOtp = async (id, otp) => {
    const res = await fetch(`${url}/verifyotp/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp })
    });

    const data = await res.json();
    if (data.status === "success") {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: "delivered", otpInput: "" } : b
        )
      );
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="AllBookings-page">
      <h2 className="AllBookings-title">All Bookings</h2>

      <div className="AllBookings-container">
        {bookings.map((b) => {
          const currentStatus = b.status;

          return (
            <div className="AllBookings-card" key={b.id}>
              <div className="AllBookings-row">
                <span className="AllBookings-label">Buyer</span>
                <span>{b.buyerName}</span>
              </div>

              <div className="AllBookings-row">
                <span className="AllBookings-label">Mobile</span>
                <span>{b.mobile}</span>
              </div>

              <div className="AllBookings-row">
                <span className="AllBookings-label">Address</span>
                <span>
                  {b.address} - {b.pincode}
                </span>
              </div>

              <div className="AllBookings-row">
                <span className="AllBookings-label">Dates</span>
                <span>
                  {b.bookingDate} → {b.deliveryDate}
                </span>
              </div>

              <div className="AllBookings-row">
                <span className="AllBookings-label">Quantity</span>
                <span>{b.quantity}</span>
              </div>

              <div className="AllBookings-row">
                <span className="AllBookings-label">Amount</span>
                <span className="AllBookings-amount">{b.amount}</span>
              </div>

              <div className="AllBookings-statusRow">
                <span
                  className={`AllBookings-statusText ${currentStatus.replace(
                    / /g,
                    "-"
                  )}`}
                >
                  {statusLabel[currentStatus]}
                </span>
              </div>

              {(currentStatus === "confirmed" ||
                currentStatus === "packed") && (
                <div className="AllBookings-actions">
                  <button
                    className="AllBookings-actionBtn AllBookings-cancelBtn"
                    onClick={() => cancelBooking(b.id)}
                  >
                    Cancel
                  </button>

                  <button
                    className="AllBookings-actionBtn AllBookings-updateBtn"
                    onClick={() => updateStatus(b.id)}
                  >
                    Update Status
                  </button>
                </div>
              )}

              {currentStatus === "out for delivery" && (
                <div className="AllBookings-otpSection">
                  <input
                    type="text"
                    className="AllBookings-otpInput"
                    placeholder="Enter delivery OTP"
                    value={b.otpInput}
                    onChange={(e) =>
                      setBookings((prev) =>
                        prev.map((x) =>
                          x.id === b.id
                            ? { ...x, otpInput: e.target.value }
                            : x
                        )
                      )
                    }
                  />

                  <button
                    className="AllBookings-otpBtn"
                    onClick={() => submitOtp(b.id, b.otpInput)}
                  >
                    Submit OTP
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
