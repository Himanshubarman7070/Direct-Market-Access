import { useState } from "react";
import "./AddCrops.css";
import { useNavigate } from "react-router-dom";

export default function AddCrops() {
  const usenavigate = useNavigate();  
  const [crop, setCrop] = useState({
    name: "",
    price: "",
    stock: "",
    deliveryCharge: "",
    image: null,
    imagePreview: "",
    pincodes: [{ code: "", area: "" }],
  });

  const handleChange = (e) => {
    setCrop({ ...crop, [e.target.name]: e.target.value });
  };

  // ✅ Image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCrop({
      ...crop,
      image: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  // ✅ Pincode change
  const handlePinChange = (index, field, value) => {
    const updated = [...crop.pincodes];
    updated[index][field] = value;
    setCrop({ ...crop, pincodes: updated });
  };

  // ✅ Add new location
  const addLocation = () => {
    setCrop({
      ...crop,
      pincodes: [...crop.pincodes, { code: "", area: "" }],
    });
  };

 

  return (
    <div className="AddCrop-wrapper">
      <div className="AddCrop-card">
        <h2>🌾 Add New Crop</h2>

        {/* IMAGE UPLOAD */}
        <div className="image-upload">
          <label>
            {crop.imagePreview ? (
              <img src={crop.imagePreview} alt="preview" />
            ) : (
              <div className="image-box">
                📷
                <span>Add Crop Photo</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* CROP NAME */}
        <div className="section">
          <label>Crop Name</label>
          <input
            type="text"
            name="name"
            placeholder="Eg. Tomato"
            value={crop.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* PRICE & STOCK */}
        <div className="row">
          <div className="section">
            <label>Price (₹ / kg)</label>
            <input
              type="number"
              name="price"
              value={crop.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="section">
            <label>Stock (kg)</label>
            <input
              type="number"
              name="stock"
              value={crop.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* DELIVERY CHARGE */}
        <div className="section">
          <label>Delivery Charge (₹)</label>
          <input
            type="number"
            name="deliveryCharge"
            value={crop.deliveryCharge}
            onChange={handleChange}
            required
          />
        </div>

        {/* DELIVERY LOCATIONS */}
        <div className="delivery-box">
          <h4>🚚 Delivery Locations</h4>

          {crop.pincodes.map((pin, index) => (
            <div className="row" key={index}>
              <input
                type="text"
                placeholder="Pincode"
                value={pin.code}
                onChange={(e) =>
                  handlePinChange(index, "code", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Area"
                value={pin.area}
                onChange={(e) =>
                  handlePinChange(index, "area", e.target.value)
                }
                required
              />
            </div>
          ))}

          <button
            type="button"
            className="add-location-btn"
            onClick={addLocation}
          >
            + Add Another Location
          </button>
        </div>

        {/* SAVE */}
        <button   type="button" className="save-btn" onClick={()=>{usenavigate('/mainpage/mycrops')}}>
          Save Crop
        </button>
      </div>
    </div>
  );
}
