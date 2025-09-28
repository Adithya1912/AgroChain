import { useState, useEffect } from "react";
import { getProducts, getProductHistory } from "../api";

const ActivitiesView = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts(user.public_id);
      setProducts(Array.isArray(data) ? data : []);
    };
    loadProducts();
  }, [user]);

  useEffect(() => {
    if (!selectedProduct) {
      setActivities([]);
      return;
    }
    const loadActivities = async () => {
      const data = await getProductHistory(selectedProduct.product_uid);
      setActivities(Array.isArray(data) ? data : []);
    };
    loadActivities();
  }, [selectedProduct]);

  return (
    <div className="farmer-dashboard-bg">
      <div className="farmer-content-container">
        <h2>Product Activities</h2>

        <label htmlFor="productSelect" style={{ fontWeight: "600", marginBottom: 8, display: "block" }}>
          Select Product:
        </label>
        <select
          id="productSelect"
          className="farmer-select"
          value={selectedProduct ? selectedProduct.product_uid : ""}
          onChange={(e) => {
            const prod = products.find((p) => p.product_uid === e.target.value);
            setSelectedProduct(prod);
          }}
        >
          <option value="">-- Select Product --</option>
          {products.map((p) => (
            <option key={p.product_uid} value={p.product_uid}>
              {p.name}
            </option>
          ))}
        </select>

        {activities.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#527a33" }}>
            {selectedProduct ? "No activities found for this product." : "Please select a product to see activities."}
          </p>
        ) : (
          <ul className="activity-list">
            {activities.map((act) => (
              <li key={act.id}>
                <span className="activity-timestamp">{new Date(act.created_at).toLocaleString()}</span>
                <span className="activity-action">{act.action}</span>
                <span className="activity-details">{act.details}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ActivitiesView;
