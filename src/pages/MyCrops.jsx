import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyCrops.css";

export default function MyCrops() {
  const navigate = useNavigate();

  const [crops] = useState([
    {
      id: 1,
      name: "Tomato",
      seller: "Himanshu Barman",
      price: 25,
      deliveryCharge: 5,
      stock: 120, // ✅ STOCK
      pincodes: [
        { code: "462001", area: "MP Nagar" },
        { code: "462003", area: "Arera Colony" },
        { code: "462016", area: "BHEL" },
      ],
      image:
        "https://images.unsplash.com/photo-1607305387299-a3d9611cd469",
    },
    {
      id: 2,
      name: "Potato",
      seller: "Himanshu Barman",
      price: 18,
      deliveryCharge: 4,
      stock: 200, // ✅ STOCK
      pincodes: [
        { code: "462020", area: "Kolar" },
        { code: "462021", area: "Misrod" },
      ],
      image:
        "https://images.unsplash.com/photo-1582515073490-dc84f2a6f4a8",
    },
  ]);

  return (
    <div className="MyCrops-container">
      <div className="MyCrops-header">
        <h2>🌾 My Crops</h2>
        <button type="button" onClick={()=>{navigate('/mainpage/addcrops')}} className="MyCrops-add-btn">+ Add Crop</button>
      </div>

      {/* ✅ ROW WISE GRID */}
      <div className="MyCrops-grid">
        {crops.map((crop) => (
          <div className="MyCrops-card" key={crop.id}>
            <img src={crop.image} alt={crop.name} className="MyCrops-image" />

            <div className="MyCrops-details">
              <h3>{crop.name}</h3>
              <p>Seller: {crop.seller}</p>
              <p>Price: ₹{crop.price}/kg</p>
              <p>Stock: <strong>{crop.stock} kg</strong></p>
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

              {/* ✅ UPDATE BUTTON */}
              <button
                className="MyCrops-update-btn"
                onClick={() =>
                  navigate("/my-crops/update", { state: crop })
                }
              >
                Update
              </button>

              <button className="MyCrops-remove-btn">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
