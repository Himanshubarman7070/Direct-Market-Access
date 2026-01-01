import crops from "./Crops";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { search } = useOutletContext();

  const filteredCrops = crops.filter(crop =>
    crop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="crops-grid">
      {filteredCrops.map(crop => (
        <div className="crop-card" key={crop.id}>
          <img src={crop.image} className="crop-image" />
          <h3>{crop.name}</h3>
          <p className="price">₹{crop.price}/{crop.unit}</p>
          <input type="number" placeholder="Qty" />
          <button className="add-btn">Add to Cart</button>
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
