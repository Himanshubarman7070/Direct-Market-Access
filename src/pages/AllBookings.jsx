import { useState } from "react";
import "./AllBookings.css";

export default function AllBookings() {
  const statusFlow = ["Confirmed", "Packed", "Departed", "Delivered"];

  const statusLabel = {
    Confirmed: "Order Confirmed",
    Packed: "Packed",
    Departed: "Out for Delivery",
    Delivered: "Delivered",
  };

  // OTP is visible only to buyer (simulated here)
  const DELIVERY_OTP = "1234";

  const [bookings, setBookings] = useState([
    {
      id: 1,
      buyerName: "Rohit Sharma",
      mobile: "9876543210",
      pincode: "462001",
      address: "MP Nagar, Bhopal",
      bookingDate: "02 Jan 2026",
      deliveryDate: "04 Jan 2026",
      quantity: "5 Kg",
      amount: "₹125",
      statusIndex: 0, // Confirmed
      otpInput: "",
      cancelled: false,
    },
    {
      id: 2,
      buyerName: "Anjali Verma",
      mobile: "9123456780",
      pincode: "462003",
      address: "Arera Colony, Bhopal",
      bookingDate: "01 Jan 2026",
      deliveryDate: "03 Jan 2026",
      quantity: "10 Kg",
      amount: "₹250",
      statusIndex: 1, // Packed
      otpInput: "",
      cancelled: false,
    },
  ]);

  // ✅ Update status ONLY for clicked buyer
  const updateStatus = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id && b.statusIndex < 2
          ? { ...b, statusIndex: b.statusIndex + 1 }
          : b
      )
    );
  };

  // ✅ Cancel ONLY clicked buyer
  const cancelBooking = (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, cancelled: true } : b
      )
    );
  };

  // ✅ OTP submit ONLY for clicked buyer
  const submitOtp = (id) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;

        if (b.otpInput === DELIVERY_OTP) {
          return { ...b, statusIndex: 3, otpInput: "" };
        } else {
          alert("Invalid OTP. Please confirm with buyer.");
          return b;
        }
      })
    );
  };

  return (
    <div className="AllBookings-page">
      <h2 className="AllBookings-title">All Bookings</h2>

      <div className="AllBookings-container">
        {bookings.map((b) => {
          const currentStatus = statusFlow[b.statusIndex];

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
                {b.cancelled ? (
                  <span className="AllBookings-statusText cancelled">
                    Cancelled
                  </span>
                ) : (
                  <span
                    className={`AllBookings-statusText ${currentStatus.toLowerCase()}`}
                  >
                    {statusLabel[currentStatus]}
                  </span>
                )}
              </div>

              {/* ✅ CONFIRMED & PACKED → Cancel + Update */}
              {!b.cancelled &&
                (currentStatus === "Confirmed" ||
                  currentStatus === "Packed") && (
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

              {/* ✅ OUT FOR DELIVERY → OTP ONLY */}
              {!b.cancelled && currentStatus === "Departed" && (
                <div className="AllBookings-otpSection">
                  <input
                    type="text"
                    placeholder="Enter delivery OTP"
                    maxLength="6"
                    className="AllBookings-otpInput"
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
                    onClick={() => submitOtp(b.id)}
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
