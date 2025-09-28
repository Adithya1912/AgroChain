// import React, { useState, useEffect } from "react";
// import { getProducts, addTransportFee } from "../api";

// const DistributorDashboard = ({ user, onLogout }) => {
//   const [products, setProducts] = useState([]);
//   const [productUid, setProductUid] = useState("");
//   const [foundProduct, setFoundProduct] = useState(null);
//   const [transportFee, setTransportFee] = useState("");

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     const data = await getProducts(user.public_id);
//     setProducts(Array.isArray(data) ? data : []);
//   };

//   // Search product by UID entered by distributor
//   const handleSearch = async () => {
//     if (!productUid.trim()) {
//       alert("Enter a Product ID");
//       return;
//     }
//     // Check if product exists among all products of this distributor or farmer?
//     // For simplicity, fetch product by UID from backend

//     try {
//       const res = await fetch(`http://localhost:5000/api/products/all?ownerId=${user.public_id}`);
//       const allProducts = await res.json();
//       const prod = allProducts.find(p => p.product_uid.toLowerCase() === productUid.trim().toLowerCase());

//       if (!prod) {
//         alert("Product not found or not owned by you yet.");
//         setFoundProduct(null);
//       } else {
//         setFoundProduct(prod);
//         setTransportFee(prod.transport_fee || "");
//       }
//     } catch (err) {
//       alert("Failed to search product.");
//     }
//   };

//   const handleAddFee = async () => {
//     if (!foundProduct) {
//       alert("Search and select a product first");
//       return;
//     }
//     const fee = parseFloat(transportFee);
//     if (isNaN(fee) || fee < 0) {
//       alert("Enter valid transport fee");
//       return;
//     }

//     try {
//       const updated = await addTransportFee(foundProduct.product_uid, user.public_id, fee);
//       alert(`Transport fee updated for ${updated.product_uid}`);
//       setFoundProduct(null);
//       setProductUid("");
//       setTransportFee("");
//       loadProducts();
//     } catch (err) {
//       alert("Failed to update transport fee");
//     }
//   };

//   const styles = {
//     container: {
//       maxWidth: 720,
//       margin: "40px auto",
//       backgroundColor: "#ffffffee",
//       borderRadius: 16,
//       padding: 32,
//       boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       color: "#2c3e2f",
//     },
//     title: {
//       fontWeight: 900,
//       fontSize: 24,
//       marginBottom: 24,
//       color: "#2e7d32",
//       textAlign: "center",
//     },
//     input: {
//       padding: "10px 14px",
//       fontSize: 16,
//       borderRadius: 8,
//       border: "2px solid #4caf50",
//       fontWeight: 600,
//       color: "#2f4f2f",
//       marginRight: 12,
//       width: "60%",
//     },
//     button: {
//       backgroundColor: "#388e3c",
//       color: "white",
//       border: "none",
//       padding: "10px 26px",
//       borderRadius: 12,
//       cursor: "pointer",
//       fontWeight: "700",
//       fontSize: 15,
//       boxShadow: "0 5px 15px rgba(56, 142, 60, 0.6)",
//       marginRight: 10,
//     },
//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//       marginTop: 32,
//     },
//     th: {
//       borderBottom: "2px solid #81c784",
//       padding: "12px 18px",
//       textAlign: "left",
//       fontWeight: "800",
//       color: "#2e7d32",
//       backgroundColor: "#e8f5e9",
//     },
//     td: {
//       padding: "12px 18px",
//       borderBottom: "1px solid #c8e6c9",
//       fontWeight: "600",
//       color: "#1b3b1b",
//     },
//     logoutButton: {
//       marginTop: 40,
//       backgroundColor: "#d32f2f",
//       color: "white",
//       border: "none",
//       padding: "12px 40px",
//       borderRadius: 16,
//       cursor: "pointer",
//       fontWeight: "700",
//       fontSize: 16,
//       display: "block",
//       marginLeft: "auto",
//       marginRight: "auto",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>🚚 Distributor Dashboard</h2>

//       <p style={{ textAlign: "center", marginBottom: 32 }}>
//         Welcome, {user.name} (ID: {user.public_id})
//       </p>

//       <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
//         <input
//           type="text"
//           placeholder="Enter Farmer Product ID"
//           value={productUid}
//           onChange={(e) => setProductUid(e.target.value)}
//           style={styles.input}
//         />
//         <button onClick={handleSearch} style={styles.button}>
//           Search
//         </button>
//       </div>

//       {foundProduct && (
//         <div style={{ marginBottom: 24, textAlign: "center" }}>
//           <p>
//             <strong>Product:</strong> {foundProduct.name} (ID: {foundProduct.product_uid})
//           </p>
//           <input
//             type="number"
//             placeholder="Enter Transport Fee"
//             value={transportFee}
//             onChange={(e) => setTransportFee(e.target.value)}
//             min="0"
//             step="0.01"
//             style={{ ...styles.input, width: "30%", marginRight: 12 }}
//           />
//           <button onClick={handleAddFee} style={styles.button}>
//             Add Transport Fee
//           </button>
//         </div>
//       )}

//       <h3>Your Products</h3>
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Product ID</th>
//             <th style={styles.th}>Name</th>
//             <th style={styles.th}>Transport Fee (₹)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.length === 0 ? (
//             <tr>
//               <td colSpan={3} style={{ textAlign: "center", padding: 20, color: "#7a8b59" }}>
//                 No products found.
//               </td>
//             </tr>
//           ) : (
//             products.map((p) => (
//               <tr key={p.product_uid}>
//                 <td style={styles.td}>{p.product_uid}</td>
//                 <td style={styles.td}>{p.name}</td>
//                 <td style={styles.td}>₹{p.transport_fee ?? 0}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       <button onClick={onLogout} style={styles.logoutButton}>
//         Logout
//       </button>
//     </div>
//   );
// };

// export default DistributorDashboard;
// import React, { useState, useEffect } from "react";
// import { getProducts, getProductByUid, addTransportFee } from "../api";

// const DistributorDashboard = ({ user, onLogout }) => {
//   const [ownedProducts, setOwnedProducts] = useState([]);
//   const [searchUid, setSearchUid] = useState("");
//   const [foundProduct, setFoundProduct] = useState(null);
//   const [transportFee, setTransportFee] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     loadOwnedProducts();
//   }, []);

//   const loadOwnedProducts = async () => {
//     const data = await getProducts(user.public_id);
//     setOwnedProducts(Array.isArray(data) ? data : []);
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!searchUid.trim()) return;
//     setIsLoading(true);
//     setMessage("");
//     setFoundProduct(null);
//     try {
//       const product = await getProductByUid(searchUid.trim());
//       if (product.current_owner === user.public_id) {
//           setMessage("You already own this product.");
//       } else {
//           setFoundProduct(product);
//       }
//     } catch (error) {
//       setMessage(`Error: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddFee = async () => {
//     if (!foundProduct || isNaN(parseFloat(transportFee))) {
//         setMessage("Please enter a valid transport fee.");
//         return;
//     }
//     try {
//         await addTransportFee(foundProduct.product_uid, user.public_id, parseFloat(transportFee));
//         alert('Transport fee added and ownership transferred successfully!');
//         setFoundProduct(null);
//         setSearchUid("");
//         setTransportFee("");
//         loadOwnedProducts(); // Refresh the list of owned products
//     } catch (error) {
//         setMessage(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div className="glass-card">
//       <h2>🚚 Distributor Dashboard</h2>
//       <p>Welcome, {user.name}!</p>

//       {/* --- Search Form --- */}
//       <form onSubmit={handleSearch} style={{ margin: '30px 0' }}>
//         <h3>🔍 Search for a Product to Acquire</h3>
//         <div style={{ display: 'flex', gap: '10px' }}>
//           <input
//             type="text"
//             value={searchUid}
//             onChange={(e) => setSearchUid(e.target.value)}
//             placeholder="Enter Product ID (e.g., PROD_...)"
//             required
//           />
//           <button type="submit" className="button-primary" disabled={isLoading}>
//             {isLoading ? 'Searching...' : 'Search'}
//           </button>
//         </div>
//       </form>

//       {message && <p style={{ color: 'red' }}>{message}</p>}

//       {/* --- Found Product Section --- */}
//       {foundProduct && (
//         <div className="card" style={{ background: '#e8f5e9', textAlign: 'left' }}>
//             <h4>Acquire Product</h4>
//             <p><strong>Name:</strong> {foundProduct.name}</p>
//             <p><strong>Current Owner:</strong> {foundProduct.current_owner}</p>
//             <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
//                  <input
//                     type="number"
//                     value={transportFee}
//                     onChange={(e) => setTransportFee(e.target.value)}
//                     placeholder="Enter Transport Fee (₹)"
//                     min="0"
//                     step="0.01"
//                     required
//                 />
//                 <button onClick={handleAddFee} className="button-primary">
//                     Add Fee & Acquire
//                 </button>
//             </div>
//         </div>
//       )}

//       {/* --- Owned Products Table --- */}
//       <h3>Your Current Inventory</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Product ID</th>
//             <th>Name</th>
//             <th>Transport Fee (₹)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ownedProducts.length > 0 ? (
//             ownedProducts.map((p) => (
//               <tr key={p.product_uid}>
//                 <td>{p.product_uid}</td>
//                 <td>{p.name}</td>
//                 <td>{parseFloat(p.transport_fee || 0).toFixed(2)}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3">You do not own any products yet.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
      
//       <button onClick={onLogout} className="button-secondary" style={{marginTop: '20px'}}>Logout</button>
//     </div>
//   );
// };

// export default DistributorDashboard;

// import React, { useState, useEffect } from "react";
// import { getProductsByOwner, searchAllProducts, acquireProduct } from "../api";

// const DistributorDashboard = ({ user, onLogout }) => {
//   const [inventory, setInventory] = useState([]);
//   const [searchId, setSearchId] = useState("");
//   const [foundProduct, setFoundProduct] = useState(null);
//   const [transportFee, setTransportFee] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const loadInventory = async () => {
//     const data = await getProductsByOwner(user.public_id);
//     setInventory(Array.isArray(data) ? data : []);
//   };

//   useEffect(() => {
//     loadInventory();
//   }, []);

//   const handleSearch = async () => {
//     if (!searchId.trim()) return;
//     setIsLoading(true);
//     setError("");
//     setFoundProduct(null);
//     try {
//       const allProducts = await searchAllProducts();
//       const product = allProducts.find(p => p.product_uid.toLowerCase() === searchId.trim().toLowerCase());

//       if (product) {
//         if (product.current_owner === user.public_id) {
//           setError("You already own this product.");
//         } else {
//           setFoundProduct(product);
//         }
//       } else {
//         setError("Product ID not found.");
//       }
//     } catch (err) {
//       setError("Failed to search for products.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAcquire = async () => {
//     if (!foundProduct) return;
//     const fee = parseFloat(transportFee);
//     if (isNaN(fee) || fee <= 0) {
//       setError("Please enter a valid, positive transport fee.");
//       return;
//     }
//     setIsLoading(true);
//     setError("");
//     try {
//       await acquireProduct(foundProduct.product_uid, user.public_id, fee);
//       alert(`Successfully acquired ${foundProduct.name}!`);
//       // Reset state and reload inventory
//       setFoundProduct(null);
//       setSearchId("");
//       setTransportFee("");
//       loadInventory();
//     } catch (err) {
//       setError("Failed to acquire product. It might have been acquired by someone else.");
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//         <div style={styles.navbar}>
//             <div style={styles.navBrand}>AgriChain</div>
//             <div>
//                 <span style={styles.navWelcome}>Welcome, {user.name}!</span>
//                 <button style={styles.logoutButtonNav} onClick={onLogout}>Logout</button>
//             </div>
//         </div>

//         <div style={styles.container}>
//             <h2 style={styles.title}>🚚 Distributor Dashboard</h2>

//             {/* --- Search Section --- */}
//             <div style={styles.section}>
//                 <h3 style={styles.subHeader}>Search for a Product to Acquire</h3>
//                 <div style={styles.inputGroup}>
//                     <input
//                         style={styles.input}
//                         type="text"
//                         placeholder="Enter Product ID from Farmer"
//                         value={searchId}
//                         onChange={(e) => setSearchId(e.target.value)}
//                     />
//                     <button style={styles.buttonPrimary} onClick={handleSearch} disabled={isLoading}>
//                         {isLoading ? "Searching..." : "Search"}
//                     </button>
//                 </div>
//             </div>

//             {error && <p style={styles.errorText}>{error}</p>}

//             {/* --- Acquire Section --- */}
//             {foundProduct && (
//                 <div style={{...styles.section, background: '#e8f5e9'}}>
//                     <h3 style={styles.subHeader}>Acquire Product</h3>
//                     <p><strong>Name:</strong> {foundProduct.name}</p>
//                     <p><strong>Current Owner:</strong> {foundProduct.current_owner}</p>
//                     <div style={styles.inputGroup}>
//                         <input
//                             style={styles.input}
//                             type="number"
//                             placeholder="Enter Transport Fee (₹)"
//                             value={transportFee}
//                             onChange={(e) => setTransportFee(e.target.value)}
//                             min="0.01"
//                             step="0.01"
//                         />
//                         <button style={styles.buttonSuccess} onClick={handleAcquire} disabled={isLoading}>
//                            {isLoading ? "Acquiring..." : "Add Fee & Acquire"}
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* --- Inventory Section --- */}
//             <div style={styles.section}>
//                 <h3 style={styles.subHeader}>Your Current Inventory</h3>
//                 <div style={styles.tableContainer}>
//                     <table style={styles.table}>
//                         <thead>
//                             <tr>
//                                 <th style={styles.th}>Product ID</th>
//                                 <th style={styles.th}>Name</th>
//                                 <th style={styles.th}>Transport Fee (₹)</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {inventory.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="3" style={styles.tdCenter}>You do not own any products yet.</td>
//                                 </tr>
//                             ) : (
//                                 inventory.map((p) => (
//                                     <tr key={p.product_uid}>
//                                         <td style={styles.td}>{p.product_uid}</td>
//                                         <td style={styles.td}>{p.name}</td>
//                                         <td style={styles.td}>₹{Number(p.transport_fee).toFixed(2)}</td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
            
//             <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
//         </div>
//     </div>
//   );
// };

// // --- STYLES ---
// const styles = {
//     page: { background: '#f0f4f8', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" },
//     navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '15px 40px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%', boxSizing: 'border-box' },
//     navBrand: { fontSize: '1.5rem', fontWeight: 'bold', color: '#2e7d32' },
//     navWelcome: { marginRight: '20px', fontWeight: '500' },
//     logoutButtonNav: { background: '#d32f2f', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
//     container: { maxWidth: 900, margin: '40px auto', padding: '20px' },
//     title: { color: '#2e7d32', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
//     section: { background: 'white', borderRadius: '12px', padding: '25px', marginBottom: '25px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' },
//     subHeader: { color: '#388e3c', fontWeight: 700, borderBottom: '2px solid #e0e0e0', paddingBottom: '10px', marginBottom: '20px' },
//     inputGroup: { display: 'flex', gap: '15px', alignItems: 'center' },
//     input: { flex: 1, padding: '12px 15px', fontSize: '1rem', borderRadius: 8, border: '1.5px solid #ccc' },
//     buttonPrimary: { background: '#1976d2', color: 'white', border: 'none', padding: '12px 25px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 },
//     buttonSuccess: { background: '#2e7d32', color: 'white', border: 'none', padding: '12px 25px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 },
//     errorText: { color: '#d32f2f', background: '#ffebee', border: '1px solid #d32f2f', padding: '10px', borderRadius: '8px', textAlign: 'center', marginBottom: '20px' },
//     tableContainer: { overflowX: 'auto' },
//     table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
//     th: { background: '#f1f8e9', color: '#33691e', padding: '12px 15px', textAlign: 'left', fontWeight: 'bold' },
//     td: { padding: '12px 15px', borderBottom: '1px solid #e0e0e0', color: '#333' },
//     tdCenter: { padding: '20px', textAlign: 'center', color: '#777' },
//     logoutButton: { display: 'block', margin: '30px auto 0 auto', background: '#757575', color: 'white', border: 'none', padding: '12px 30px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '1rem' },
// };


// export default DistributorDashboard;
// import React, { useState, useEffect } from "react";
// import { getProducts, searchAllProducts, acquireProduct } from "../api";

// const DistributorDashboard = ({ user, onLogout }) => {
//   const [inventory, setInventory] = useState([]);
//   const [searchId, setSearchId] = useState("");
//   const [foundProduct, setFoundProduct] = useState(null);
//   const [transportFee, setTransportFee] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const loadInventory = async () => {
//     const data = await getProducts(user.public_id);
//     setInventory(Array.isArray(data) ? data : []);
//   };

//   useEffect(() => {
//     loadInventory();
//   }, [user]);

//   const handleSearch = async () => {
//     if (!searchId.trim()) return;
//     setIsLoading(true);
//     setError("");
//     setFoundProduct(null);
//     try {
//       const allProducts = await searchAllProducts();
//       const product = allProducts.find(p => p.product_uid.toLowerCase() === searchId.trim().toLowerCase());

//       if (product) {
//         if (product.current_owner === user.public_id) {
//           setError("You already own this product.");
//         } else {
//           setFoundProduct(product);
//         }
//       } else {
//         setError("Product ID not found.");
//       }
//     } catch (err) {
//       setError("Failed to search for products.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAcquire = async () => {
//     if (!foundProduct) return;
//     const fee = parseFloat(transportFee);
//     if (isNaN(fee) || fee <= 0) {
//       setError("Please enter a valid, positive transport fee.");
//       return;
//     }
//     setIsLoading(true);
//     setError("");
//     try {
//       await acquireProduct(foundProduct.product_uid, user.public_id, fee);
//       alert(`Successfully acquired ${foundProduct.name}!`);
//       setFoundProduct(null);
//       setSearchId("");
//       setTransportFee("");
//       loadInventory();
//     } catch (err) {
//       setError("Failed to acquire product. It might have been acquired by someone else.");
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//         {/* The Navbar component is now simplified */}
//         {/* <Navbar user={user} onLogout={onLogout} /> */}

//         <div style={styles.container}>
//             <h2 style={styles.title}>🚚 Distributor Dashboard</h2>

//             <div style={styles.section}>
//                 <h3 style={styles.subHeader}>Search for a Product to Acquire</h3>
//                 <div style={styles.inputGroup}>
//                     <input
//                         style={styles.input}
//                         type="text"
//                         placeholder="Enter Product ID from Farmer"
//                         value={searchId}
//                         onChange={(e) => setSearchId(e.target.value)}
//                     />
//                     <button style={styles.buttonPrimary} onClick={handleSearch} disabled={isLoading}>
//                         {isLoading ? "Searching..." : "Search"}
//                     </button>
//                 </div>
//             </div>

//             {error && <p style={styles.errorText}>{error}</p>}

//             {foundProduct && (
//                 <div style={{...styles.section, background: '#e8f5e9'}}>
//                     <h3 style={styles.subHeader}>Acquire Product</h3>
//                     <p><strong>Name:</strong> {foundProduct.name}</p>
//                     <p><strong>Current Owner:</strong> {foundProduct.current_owner}</p>
//                     <div style={styles.inputGroup}>
//                         <input
//                             style={styles.input}
//                             type="number"
//                             placeholder="Enter Transport Fee (₹)"
//                             value={transportFee}
//                             onChange={(e) => setTransportFee(e.target.value)}
//                             min="0.01"
//                             step="0.01"
//                         />
//                         <button style={styles.buttonSuccess} onClick={handleAcquire} disabled={isLoading}>
//                            {isLoading ? "Acquiring..." : "Add Fee & Acquire"}
//                         </button>
//                     </div>
//                 </div>
//             )}

//             <div style={styles.section}>
//                 <h3 style={styles.subHeader}>Your Current Inventory</h3>
//                 <div style={styles.tableContainer}>
//                     <table style={styles.table}>
//                         <thead>
//                             <tr>
//                                 <th style={styles.th}>Product ID</th>
//                                 <th style={styles.th}>Name</th>
//                                 <th style={styles.th}>Transport Fee (₹)</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {inventory.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="3" style={styles.tdCenter}>You do not own any products yet.</td>
//                                 </tr>
//                             ) : (
//                                 inventory.map((p) => (
//                                     <tr key={p.product_uid}>
//                                         <td style={styles.td}>{p.product_uid}</td>
//                                         <td style={styles.td}>{p.name}</td>
//                                         <td style={styles.td}>
//                                           {p.transport_fee ? `₹${Number(p.transport_fee).toFixed(2)}` : 'N/A'}
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     </div>
//   );
// };

// // --- STYLES ---
// const styles = {
//     page: { background: '#f0f4f8', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" },
//     container: { maxWidth: 900, margin: '40px auto', padding: '20px' },
//     title: { color: '#2e7d32', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
//     section: { background: 'white', borderRadius: '12px', padding: '25px', marginBottom: '25px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' },
//     subHeader: { color: '#388e3c', fontWeight: 700, borderBottom: '2px solid #e0e0e0', paddingBottom: '10px', marginBottom: '20px' },
//     inputGroup: { display: 'flex', gap: '15px', alignItems: 'center' },
//     // **FIXED**: Input boxes are now larger
//     input: { 
//         flex: 1, 
//         padding: '14px 18px', // Increased padding
//         fontSize: '1.1rem',      // Increased font size
//         borderRadius: 8, 
//         border: '1.5px solid #ccc' 
//     },
//     buttonPrimary: { background: '#1976d2', color: 'white', border: 'none', padding: '14px 28px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '1rem' },
//     buttonSuccess: { background: '#2e7d32', color: 'white', border: 'none', padding: '14px 28px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '1rem' },
//     errorText: { color: '#d32f2f', background: '#ffebee', border: '1px solid #d32f2f', padding: '10px', borderRadius: '8px', textAlign: 'center', marginBottom: '20px' },
//     tableContainer: { overflowX: 'auto' },
//     table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
//     th: { background: '#f1f8e9', color: '#33691e', padding: '12px 15px', textAlign: 'left', fontWeight: 'bold' },
//     td: { padding: '12px 15px', borderBottom: '1px solid #e0e0e0', color: '#333' },
//     tdCenter: { padding: '20px', textAlign: 'center', color: '#777' },
// };

// export default DistributorDashboard;

// import React, { useState, useEffect } from "react";
// import { getProducts, searchAllProducts, acquireProduct } from "../api";

// const DistributorDashboard = ({ user, onLogout }) => {
//   const [inventory, setInventory] = useState([]);
//   const [searchId, setSearchId] = useState("");
//   const [foundProduct, setFoundProduct] = useState(null);
//   const [transportFee, setTransportFee] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const loadInventory = async () => {
//     const data = await getProducts(user.public_id);
//     setInventory(Array.isArray(data) ? data : []);
//   };

//   useEffect(() => {
//     loadInventory();
//   }, [user]);

//   const handleSearch = async () => {
//     if (!searchId.trim()) return;
//     setIsLoading(true);
//     setError("");
//     setFoundProduct(null);
//     try {
//       const allProducts = await searchAllProducts();
//       const product = allProducts.find(p => p.product_uid.toLowerCase() === searchId.trim().toLowerCase());

//       if (product) {
//         if (product.current_owner === user.public_id) {
//           setError("You already own this product.");
//         } else {
//           setFoundProduct(product);
//         }
//       } else {
//         setError("Product ID not found.");
//       }
//     } catch (err) {
//       setError("Failed to search for products.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAcquire = async () => {
//     if (!foundProduct) return;
//     const fee = parseFloat(transportFee);
//     if (isNaN(fee) || fee <= 0) {
//       setError("Please enter a valid, positive transport fee.");
//       return;
//     }
//     setIsLoading(true);
//     setError("");
//     try {
//       await acquireProduct(foundProduct.product_uid, user.public_id, fee);
//       alert(`Successfully acquired ${foundProduct.name}!`);
//       setFoundProduct(null);
//       setSearchId("");
//       setTransportFee("");
//       loadInventory();
//     } catch (err) {
//       setError("Failed to acquire product. It might have been acquired by someone else.");
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//         <div style={styles.container}>
//             <h2 style={styles.title}>🚚 Distributor Dashboard</h2>

//             <div style={styles.section}>
//                 <h3 style={styles.subHeader}>Search for a Product to Acquire</h3>
//                 <div style={styles.inputGroup}>
//                     <input
//                         style={styles.input}
//                         type="text"
//                         placeholder="Enter Product ID from Farmer"
//                         value={searchId}
//                         onChange={(e) => setSearchId(e.target.value)}
//                     />
//                     <button style={styles.buttonPrimary} onClick={handleSearch} disabled={isLoading}>
//                         {isLoading ? "Searching..." : "Search"}
//                     </button>
//                 </div>
//             </div>

//             {error && <p style={styles.errorText}>{error}</p>}

//             {foundProduct && (
//                 <div style={{...styles.section, background: '#e8f5e9'}}>
//                     <h3 style={styles.subHeader}>Acquire Product</h3>
//                     <p><strong>Name:</strong> {foundProduct.name}</p>
//                     {/* **ADDED**: Quantity is now shown when searching */}
//                     <p><strong>Quantity:</strong> {foundProduct.quantity} units</p> 
//                     <p><strong>Current Owner:</strong> {foundProduct.current_owner}</p>
//                     <div style={styles.inputGroup}>
//                         <input
//                             style={styles.input}
//                             type="number"
//                             placeholder="Enter Transport Fee (₹)"
//                             value={transportFee}
//                             onChange={(e) => setTransportFee(e.target.value)}
//                             min="0.01"
//                             step="0.01"
//                         />
//                         <button style={styles.buttonSuccess} onClick={handleAcquire} disabled={isLoading}>
//                            {isLoading ? "Acquiring..." : "Add Fee & Acquire"}
//                         </button>
//                     </div>
//                 </div>
//             )}

//             <div style={styles.section}>
//                 <h3 style={styles.subHeader}>Your Current Inventory</h3>
//                 <div style={styles.tableContainer}>
//                     <table style={styles.table}>
//                         <thead>
//                             <tr>
//                                 <th style={styles.th}>Product ID</th>
//                                 <th style={styles.th}>Name</th>
//                                 {/* **ADDED**: Quantity column in the table */}
//                                 <th style={styles.th}>Quantity</th>
//                                 <th style={styles.th}>Transport Fee (₹)</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {inventory.length === 0 ? (
//                                 <tr>
//                                     {/* **UPDATED**: Colspan is now 4 */}
//                                     <td colSpan="4" style={styles.tdCenter}>You do not own any products yet.</td>
//                                 </tr>
//                             ) : (
//                                 inventory.map((p) => (
//                                     <tr key={p.product_uid}>
//                                         <td style={styles.td}>{p.product_uid}</td>
//                                         <td style={styles.td}>{p.name}</td>
//                                         {/* **ADDED**: Quantity data in the table row */}
//                                         <td style={styles.td}>{p.quantity}</td>
//                                         <td style={styles.td}>
//                                           {p.transport_fee ? `₹${Number(p.transport_fee).toFixed(2)}` : 'N/A'}
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     </div>
//   );
// };

// // --- STYLES ---
// const styles = {
//     page: { background: '#f0f4f8', minHeight: 'calc(100vh - 80px)', paddingTop: '40px' },
//     container: { maxWidth: 900, margin: 'auto', padding: '20px' },
//     title: { color: '#2e7d32', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
//     section: { background: 'white', borderRadius: '12px', padding: '25px', marginBottom: '25px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' },
//     subHeader: { color: '#388e3c', fontWeight: 700, borderBottom: '2px solid #e0e0e0', paddingBottom: '10px', marginBottom: '20px' },
//     inputGroup: { display: 'flex', gap: '15px', alignItems: 'center' },
//     input: { 
//         flex: 1, 
//         padding: '14px 18px',
//         fontSize: '1.1rem',
//         borderRadius: 8, 
//         border: '1.5px solid #ccc',
//         minWidth: '350px',
//     },
//     buttonPrimary: { background: '#1976d2', color: 'white', border: 'none', padding: '14px 28px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '1rem' },
//     buttonSuccess: { background: '#2e7d32', color: 'white', border: 'none', padding: '14px 28px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '1rem' },
//     errorText: { color: '#d32f2f', background: '#ffebee', border: '1px solid #d32f2f', padding: '10px', borderRadius: '8px', textAlign: 'center', marginBottom: '20px' },
//     tableContainer: { overflowX: 'auto' },
//     table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
//     th: { background: '#f1f8e9', color: '#33691e', padding: '12px 15px', textAlign: 'left', fontWeight: 'bold' },
//     td: { padding: '12px 15px', borderBottom: '1px solid #e0e0e0', color: '#333' },
//     tdCenter: { padding: '20px', textAlign: 'center', color: '#777' },
// };

// export default DistributorDashboard;

import React, { useState, useEffect } from "react";
import { getProducts, searchAllProducts, acquireProduct, requestTransferToRetailer, acknowledgeRejection } from "../api";

const DistributorDashboard = ({ user, onLogout }) => {
  const [inventory, setInventory] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [foundProduct, setFoundProduct] = useState(null);
  const [transportFee, setTransportFee] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sellingProduct, setSellingProduct] = useState(null);
  const [retailerId, setRetailerId] = useState("");

  const loadInventory = async () => {
    if (user?.public_id) {
      try {
        const data = await getProducts(user.public_id);
        setInventory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load inventory:", err);
      }
    }
  };

  useEffect(() => {
    loadInventory();
  }, [user]);

  const handleSearch = async () => {
    if (!searchId.trim()) return;
    setIsLoading(true);
    setError("");
    setFoundProduct(null);
    try {
      const allProducts = await searchAllProducts();
      const product = allProducts.find(p => p.product_uid.toLowerCase() === searchId.trim().toLowerCase());
      if (product) {
        product.current_owner === user.public_id ? setError("You already own this product.") : setFoundProduct(product);
      } else {
        setError("Product ID not found.");
      }
    } catch (err) {
      setError("Failed to search for products.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcquire = async () => {
    if (!foundProduct) return;
    const fee = parseFloat(transportFee);
    if (isNaN(fee) || fee <= 0) {
      setError("Please enter a valid, positive transport fee.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await acquireProduct(foundProduct.product_uid, user.public_id, fee);
      alert(`Successfully acquired ${foundProduct.name}!`);
      setFoundProduct(null);
      setSearchId("");
      setTransportFee("");
      loadInventory();
    } catch (err) {
      setError("Failed to acquire product.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSellToRetailer = (product) => {
    setSellingProduct(product);
  };

  const handleConfirmSale = async () => {
    if (!retailerId || !retailerId.trim()) {
      return alert("Retailer ID cannot be empty.");
    }
    try {
      await requestTransferToRetailer(sellingProduct.product_uid, retailerId.trim(), user.public_id);
      alert("Transfer request sent successfully!");
      loadInventory();
    } catch (err) {
      alert("Failed to send transfer request.");
    }
    setSellingProduct(null);
    setRetailerId("");
  };

  const handleCancelSale = () => {
    setSellingProduct(null);
    setRetailerId("");
  };

  const handleAcknowledgeRejection = async (productUid) => {
    try {
      await acknowledgeRejection(productUid, user.public_id);
      alert("Rejection acknowledged. The product is available again.");
      loadInventory();
    } catch (err) {
      alert("Failed to acknowledge rejection.");
    }
  };

  const renderProductActions = (product) => {
    switch (product.status) {
      case 'PENDING_APPROVAL':
        return <span style={styles.statusPending}>Pending by {product.pending_retailer_id}</span>;
      case 'REJECTED':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={styles.statusRejected}>❌ Rejected by {product.pending_retailer_id}</span>
            <button style={styles.buttonAcknowledge} onClick={() => handleAcknowledgeRejection(product.product_uid)}>Make Available</button>
          </div>
        );
      case 'AVAILABLE':
      default:
        return <button style={styles.buttonSell} onClick={() => handleSellToRetailer(product)}>Sell to Retailer</button>;
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>🚚 Distributor Dashboard</h2>

        <div style={styles.section}>
          <h3 style={styles.subHeader}>Search for a Product to Acquire</h3>
          <div style={styles.inputGroup}>
            <input style={styles.input} type="text" placeholder="Enter Product ID from Farmer" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
            <button style={styles.buttonPrimary} onClick={handleSearch} disabled={isLoading}>{isLoading ? "Searching..." : "Search"}</button>
          </div>
        </div>

        {error && <p style={styles.errorText}>{error}</p>}

        {foundProduct && (
          <div style={{...styles.section, background: '#e8f5e9'}}>
            <h3 style={styles.subHeader}>Acquire Product</h3>
            <p><strong>Name:</strong> {foundProduct.name}</p>
            <p><strong>Quantity:</strong> {foundProduct.quantity} units</p>
            <p><strong>Current Owner:</strong> {foundProduct.current_owner}</p>
            <div style={styles.inputGroup}>
              <input style={styles.input} type="number" placeholder="Enter Transport Fee (₹)" value={transportFee} onChange={(e) => setTransportFee(e.target.value)} min="0.01" step="0.01" />
              <button style={styles.buttonSuccess} onClick={handleAcquire} disabled={isLoading}>{isLoading ? "Acquiring..." : "Add Fee & Acquire"}</button>
            </div>
          </div>
        )}

        <div style={styles.section}>
          <h3 style={styles.subHeader}>Your Current Inventory</h3>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Product ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Quantity</th>
                  <th style={styles.th}>Status / Action</th>
                </tr>
              </thead>
              <tbody>
                {inventory.length === 0 ? (
                  <tr><td colSpan="4" style={styles.tdCenter}>You do not own any products yet.</td></tr>
                ) : (
                  inventory.map((p) => (
                    <tr key={p.product_uid}>
                      <td style={styles.td}>{p.product_uid}</td>
                      <td style={styles.td}>{p.name}</td>
                      <td style={styles.td}>{p.quantity}</td>
                      <td style={styles.td}>{renderProductActions(p)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {sellingProduct && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Sell Product to Retailer</h3>
            <p><strong>Product:</strong> {sellingProduct.name}</p>
            <p><strong>Quantity:</strong> {sellingProduct.quantity} units</p>
            <input style={{...styles.input, width: '100%', boxSizing: 'border-box'}} type="text" placeholder="Enter Retailer's Public ID" value={retailerId} onChange={(e) => setRetailerId(e.target.value)} />
            <div style={styles.modalActions}>
              <button style={styles.buttonCancel} onClick={handleCancelSale}>Cancel</button>
              <button style={styles.buttonConfirm} onClick={handleConfirmSale}>Confirm Sale Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- STYLES ---
const styles = {
    page: { background: '#f0f4f8', minHeight: 'calc(100vh - 70px)', paddingTop: '20px' },
    container: { maxWidth: 900, margin: '40px auto', padding: '20px' },
    title: { color: '#2e7d32', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
    section: { background: 'white', borderRadius: '12px', padding: '25px', marginBottom: '25px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' },
    subHeader: { color: '#388e3c', fontWeight: 700, borderBottom: '2px solid #e0e0e0', paddingBottom: '10px', marginBottom: '20px' },
    inputGroup: { display: 'flex', gap: '15px', alignItems: 'center' },
    input: { flex: 1, padding: '14px 18px', fontSize: '1.1rem', borderRadius: 8, border: '1.5px solid #ccc', minWidth: '350px' },
    buttonPrimary: { background: '#1976d2', color: 'white', border: 'none', padding: '14px 28px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '1rem' },
    buttonSuccess: { background: '#2e7d32', color: 'white', border: 'none', padding: '14px 28px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '1rem' },
    errorText: { color: '#d32f2f', background: '#ffebee', border: '1px solid #d32f2f', padding: '10px', borderRadius: '8px', textAlign: 'center', marginBottom: '20px' },
    tableContainer: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
    th: { background: '#f1f8e9', color: '#33691e', padding: '12px 15px', textAlign: 'left', fontWeight: 'bold' },
    td: { padding: '15px', borderBottom: '1px solid #e0e0e0', color: '#333', verticalAlign: 'middle' },
    tdCenter: { padding: '20px', textAlign: 'center', color: '#777' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modalContent: { background: 'white', padding: '30px', borderRadius: '12px', width: 'clamp(300px, 90%, 500px)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' },
    modalTitle: { color: '#2e7d32', fontWeight: 700, marginBottom: '20px', textAlign: 'center' },
    modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' },
    buttonConfirm: { background: '#2e7d32', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
    buttonCancel: { background: '#7f8c8d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
    buttonSell: { background: '#e67e22', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    buttonAcknowledge: { background: '#3498db', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    statusPending: { fontStyle: 'italic', color: '#f39c12' },
    statusRejected: { fontWeight: 'bold', color: '#e74c3c' },
};

export default DistributorDashboard;