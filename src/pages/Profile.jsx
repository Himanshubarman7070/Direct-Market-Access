import { useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "Himanshu Barman",
    email: "himanshu@gmail.com",
    mobile: "", // empty = show Add Mobile
    pincode: "462001",
    location: "Bhopal fuufg erhguryf erheueyhf vhfff fbncvtr e fyv vbbnv vbb vjjjjjj nnn bc",
  });

  const updateField = (field, label) => {
    const value = prompt(`Enter ${label}`);
    if (!value) return;

    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="profile-container">
      {/* TOP USER CARD */}
      <div className="profile-user-card">
        <div className="profile-avatar">
          {profile.name.charAt(0)}
        </div>
        <div className="profile-user-info">
          <span className="profile-user-name">{profile.name}</span>
          <span className="profile-user-email">{profile.email}</span>
        </div>
      </div>

      {/* ACCOUNT DETAILS */}
      <div className="profile-section">
        <h4 className="profile-section-title">Account Information</h4>

        <div className="profile-item">
          <span>Mobile Number</span>
          {profile.mobile ? (
            <div className="profile-item-action">
              <span style={{color:"#6B6B6B"}}>{profile.mobile}</span>
              <button
                className="profile-btn"
                onClick={() => updateField("mobile", "Mobile Number")}
              >
                Change
              </button>
            </div>
          ) : (
            <button
              className="profile-btn profile-btn-outline"
              onClick={() => updateField("mobile", "Mobile Number")}
            >
              Add Mobile Number
            </button>
          )}
        </div>

        <div className="profile-item">
          <span>Pincode</span>
          <div className="profile-item-action">
            <span style={{color:"#6B6B6B"}}>{profile.pincode || "Not Added"}</span>
            <button
              className="profile-btn"
              onClick={() => updateField("pincode", "Pincode")}
            >
              Change
            </button>
          </div>
        </div>

        <div className="profile-item">
          <span style={{marginRight:"5px"}}>Location </span>
          <div className="profile-item-action">
            <span style={{color:"#6B6B6B"}}>{profile.location || "Not Added"}</span>
            <button
              className="profile-btn"
              onClick={() => updateField("location", "Location")}
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
      <button className="profile-logout-btn">Logout</button>
    </div>
  );
}
