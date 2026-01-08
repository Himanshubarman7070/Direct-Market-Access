import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "./Info";
import "./MyCrops.css";

export default function MyCrops() {
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);

  // 🔹 Fetch crops
  useEffect(() => {
    const email = localStorage.getItem("email");

    fetch(`${url}/myallcrops/${email}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          const formatted = res.data.map((crop) => ({
            id: crop._id,
            name: crop.crop_name,
            seller: email,
            price: crop.price,
            stock: crop.stock,
            deliveryCharge: crop.delivery_charge,
            pincodes: crop.pincode,
            image: crop.image
          }));

          setCrops(formatted);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔴 REMOVE CROP LOGIC
  const removeCrop = async (cropId) => {
    const confirmDelete = window.confirm(
      "Removing this crop will CANCEL ALL BOOKINGS.\nAre you sure?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${url}/removecrop/${cropId}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (data.status === "success") {
        setCrops((prev) =>
          prev.filter((crop) => crop.id !== cropId)
        );
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="MyCrops-container">
      <div className="MyCrops-header">
        <h2>🌾 My Crops</h2>
        <button
          type="button"
          onClick={() => navigate("/mainpage/addcrops")}
          className="MyCrops-add-btn"
        >
          + Add Crop
        </button>
      </div>

      {/* ✅ UI UNCHANGED */}
      <div className="MyCrops-grid">
        {crops.map((crop) => (
          <div className="MyCrops-card" key={crop.id}>
            <img
              src={crop.image}
              alt={crop.name}
              className="MyCrops-image"
            />

            <div className="MyCrops-details">
              <h3>{crop.name}</h3>
              <p>Seller: {crop.seller}</p>
              <p>Price: ₹{crop.price}/kg</p>
              <p>
                Stock: <strong>{crop.stock} kg</strong>
              </p>
              <p>Delivery: ₹{crop.deliveryCharge}</p>

              <div className="MyCrops-pincodes">
                {crop.pincodes.map((pin, i) => (
                  <span key={i}>
                    {pin.code} – {pin.area}
                  </span>
                ))}
              </div>
            </div>

            <div className="MyCrops-actions">
              <button
                className="MyCrops-booking-btn"
                onClick={() =>
                  navigate("/mainpage/allbookings", { state: crop })
                }
              >
                All Bookings
              </button>

              <button
                className="MyCrops-update-btn"
                onClick={() =>
                  navigate("/my-crops/update", { state: crop })
                }
              >
                Update
              </button>

              <button
                className="MyCrops-remove-btn"
                onClick={() => removeCrop(crop.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
