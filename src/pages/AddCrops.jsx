import { useState } from "react";
import "./AddCrops.css";
import { useNavigate } from "react-router-dom";
import {url} from './Info'
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

 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCrop({
      ...crop,
      image: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

 
  const handlePinChange = (index, field, value) => {
    const updated = [...crop.pincodes];
    updated[index][field] = value;
    setCrop({ ...crop, pincodes: updated });
  };


  const addLocation = () => {
    setCrop({
      ...crop,
      pincodes: [...crop.pincodes, { code: "", area: "" }],
    });
  };


  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });


  const saveCrop = async () => {
    try {
      if (!crop.image) {
        alert("Please upload image");
        return;
      }

      const base64Image = await toBase64(crop.image);

      const payload = {
        email: localStorage.getItem("email"), // farmer email
        crop_name: crop.name,
        price: Number(crop.price),
        stock: Number(crop.stock),
        delivery_charge: Number(crop.deliveryCharge),
        pincode: crop.pincodes,
        image: base64Image,
      };

      const res = await fetch(`${url}/addcrop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status === "success" || data.data === "success") {
        alert("Crop added successfully");
        usenavigate("/mainpage/mycrops");
      } else {
        alert("Failed to add crop");
      }
    } catch (err) {
      alert("Error while saving crop");
      console.error(err);
    }
  };

  return (
    <div className="AddCrop-wrapper">
      <div className="AddCrop-card">
        <h2>🌾 Add New Crop</h2>

   
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
        <button type="button" className="save-btn" onClick={saveCrop}>
          Save Crop
        </button>
      </div>
    </div>
  );
}
