import { useState } from "react";
import "./Profile.css";
import { url } from "./Info";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"), // ❌ NEVER UPDATED
    mobile: localStorage.getItem("mobile"),
    pincode: localStorage.getItem("pincode"),
    location: localStorage.getItem("address")
  });

  // 🔹 Update ONLY one field at a time (mobile / pincode / address)
  const updateField = async (field, label) => {
    const value = prompt(`Enter ${label}`);
    if (!value) return;

    // UI field → DB field mapping
    const dbField = field === "location" ? "address" : field;

    try {
      const res = await fetch(`${url}/updateprofile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: profile.email, // 🔑 used ONLY to identify user
          field: dbField,       // 🔒 only allowed fields reach backend
          value
        })
      });

      const data = await res.json();

      if (data.status === "success") {
        // ✅ update ONLY this field in UI
        setProfile((prev) => ({
          ...prev,
          [field]: value
        }));

        // ✅ update ONLY this field in localStorage
        if (field === "location") {
          localStorage.setItem("address", value);
        } else {
          localStorage.setItem(field, value);
        }

        alert(`${label} updated successfully`);
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="profile-container">
      {/* TOP USER CARD */}
      <div className="profile-user-card">
        <div className="profile-avatar">
          {profile.name?.charAt(0)}
        </div>
        <div className="profile-user-info">
          <span className="profile-user-name">{profile.name}</span>
          <span className="profile-user-email">{profile.email}</span>
        </div>
      </div>

      {/* ACCOUNT DETAILS */}
      <div className="profile-section">
        <h4 className="profile-section-title">Account Information</h4>

        {/* MOBILE */}
        <div className="profile-item">
          <span>Mobile Number</span>
          {profile.mobile ? (
            <div className="profile-item-action">
              <span style={{ color: "#792f2fff" }}>
                {profile.mobile}
              </span>
              <button
                className="profile-btn"
                onClick={() =>
                  updateField("mobile", "Mobile Number")
                }
              >
                Change
              </button>
            </div>
          ) : (
            <button
              className="profile-btn profile-btn-outline"
              onClick={() =>
                updateField("mobile", "Mobile Number")
              }
            >
              Add Mobile Number
            </button>
          )}
        </div>

        {/* PINCODE */}
        <div className="profile-item">
          <span>Pincode</span>
          <div className="profile-item-action">
            <span style={{ color: "#6B6B6B" }}>
              {profile.pincode || "Not Added"}
            </span>
            <button
              className="profile-btn"
              onClick={() =>
                updateField("pincode", "Pincode")
              }
            >
              Change
            </button>
          </div>
        </div>

        {/* LOCATION / ADDRESS */}
        <div className="profile-item">
          <span style={{ marginRight: "5px" }}>
            Location
          </span>
          <div className="profile-item-action">
            <span style={{ color: "#6B6B6B" }}>
              {profile.location || "Not Added"}
            </span>
            <button
              className="profile-btn"
              onClick={() =>
                updateField("location", "Location")
              }
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="profile-section">
        <h4 className="profile-section-title">My Activity</h4>

        <div className="profile-link">My Orders</div>
        <div className="profile-link">Contact Support</div>
        <div className="profile-link">Help Center</div>
        <div className="profile-link">Privacy & Policy</div>
      </div>

      {/* LOGOUT */}
      <button
        className="profile-logout-btn"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}
