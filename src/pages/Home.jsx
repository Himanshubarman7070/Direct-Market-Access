import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { url } from "./Info"; // backend base url

export default function Home() {
  const { search } = useOutletContext();
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const pincode = localStorage.getItem("pincode");
    if (!pincode) return;

    fetch(`${url}/cropsbypincode/${pincode}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setCrops(data.data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const filteredCrops = crops.filter(crop =>
    crop.crop_name.toLowerCase().includes(search.toLowerCase())
  );
  const addToCart = (crop) => {
  fetch(`${url}/addtocart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_email: localStorage.getItem("email"),
      seller_email: crop.email,
      crop_id: crop.cropId,
      crop_name: crop.cropName,
      price: crop.price,
      quantity: 1
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
  })
  .catch(err => console.log(err));
};

  return (
    <div className="crops-grid">
      {filteredCrops.map(crop => (
        <div className="crop-card" key={crop.crop_id}>
          <img src={crop.image} className="crop-image" />

          <h3>{crop.crop_name}</h3>

          <p className="price">₹{crop.price}/kg</p>

          <input type="number" placeholder="Qty" />

          <button
            className="add-btn"
            onClick={() =>
              addToCart({
                cropId: crop.crop_id,
                cropName: crop.crop_name,
                price: crop.price,
                sellerName: crop.seller_name,
                email: crop.email,
                image: crop.image
              })
            }
          >
            Add to Cart
          </button>
        </div>
      ))}

      {filteredCrops.length === 0 && (
        <p style={{ gridColumn: "1/-1", textAlign: "center" }}>
          No crops found 🌾
        </p>
      )}
    </div>
  );
}
