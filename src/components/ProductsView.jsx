import { useState, useEffect } from "react";
import { getProducts } from "../api";

// Optional: assign emojis based on product name
const getEmoji = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes("rice") || lower.includes("paddy")) return "🌾";
  if (lower.includes("potato")) return "🥔";
  if (lower.includes("corn")) return "🌽";
  if (lower.includes("tomato")) return "🍅";
  if (lower.includes("banana")) return "🍌";
  if (lower.includes("apple")) return "🍎";
  if (lower.includes("onion")) return "🧅";
  return "🧺";
};

const ProductsView = ({ user }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts(user.public_id);
      setProducts(Array.isArray(data) ? data : []);
    };
    loadProducts();
  }, [user]);

  return (
    <div className="farmer-dashboard-bg">
      <div className="farmer-content-container">
        <h2>Your Products</h2>
        <div className="product-grid">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((p) => (
              <div className="product-card" key={p.product_uid}>
                <div className="product-icon">{getEmoji(p.name)}</div>
                <div className="product-info">
                  <h3>{p.name}</h3>
                  <p>
                    Price: <strong>₹{p.price}</strong>
                  </p>
                  <p className="product-meta">Owner: {p.current_owner}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
