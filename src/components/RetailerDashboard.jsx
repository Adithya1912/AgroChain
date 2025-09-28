    // // // // import React, { useState, useEffect } from "react";
    // // // // import { getProducts, transferOwnership } from "../api";

    // // // // const RetailerDashboard = ({ user, onLogout }) => {
    // // // //   const [products, setProducts] = useState([]);

    // // // //   useEffect(() => {
    // // // //     loadProducts();
    // // // //   }, []);

    // // // //   const loadProducts = async () => {
    // // // //     const data = await getProducts();
    // // // //     setProducts(Array.isArray(data) ? data : []);
    // // // //   };

    // // // //   const handleSell = async (productUid) => {
    // // // //     const consumerId = prompt("Enter Consumer Public ID:");
    // // // //     if (!consumerId) return;
    // // // //     await transferOwnership(productUid, consumerId);
    // // // //     loadProducts();
    // // // //   };

    // // // //   return (
    // // // //     <div className="glass-card">
    // // // //       <h2>🏬 Retailer Dashboard</h2>
    // // // //       <p>Welcome, {user.name} (ID: {user.public_id})</p>

    // // // //       <h3>Your Products</h3>
    // // // //       <ul className="activity-list">
    // // // //         {products.filter(p => p.current_owner === user.public_id).map(p => (
    // // // //           <li key={p.product_uid}>
    // // // //             <span className="badge purple-badge">Retailer</span> {p.name}
    // // // //             <button
    // // // //               onClick={() => handleSell(p.product_uid)}
    // // // //               className="button-primary"
    // // // //               style={{ marginLeft: 8 }}
    // // // //             >
    // // // //               Sell to Consumer
    // // // //             </button>
    // // // //           </li>
    // // // //         ))}
    // // // //       </ul>

    // // // //       <button onClick={onLogout} className="button-secondary">Logout</button>
    // // // //     </div>
    // // // //   );
    // // // // };

    // // // // export default RetailerDashboard;

    // // // // import React, { useState, useEffect } from "react";
    // // // // import { getProducts, getPendingRetailerRequests, respondToRetailerRequest } from "../api";

    // // // // const RetailerDashboard = ({ user, onLogout }) => {
    // // // //   const [inventory, setInventory] = useState([]);
    // // // //   const [pendingRequests, setPendingRequests] = useState([]);

    // // // //   const loadData = async () => {
    // // // //     if (user?.public_id) {
    // // // //       try {
    // // // //         const inventoryData = await getProducts(user.public_id);
    // // // //         const requestsData = await getPendingRetailerRequests(user.public_id);
    // // // //         setInventory(Array.isArray(inventoryData) ? inventoryData : []);
    // // // //         setPendingRequests(Array.isArray(requestsData) ? requestsData : []);
    // // // //       } catch (err) {
    // // // //         console.error("Failed to load data:", err);
    // // // //         alert("Could not load data. Please refresh.");
    // // // //       }
    // // // //     }
    // // // //   };

    // // // //   useEffect(() => {
    // // // //     loadData();
    // // // //   }, [user]);

    // // // //   const handleRespondToRequest = async (productUid, decision) => {
    // // // //     try {
    // // // //       await respondToRetailerRequest(productUid, user.public_id, decision);
    // // // //       alert(`Request successfully ${decision.toLowerCase()}ed!`);
    // // // //       loadData();
    // // // //     } catch (err) {
    // // // //       alert(`Failed to ${decision.toLowerCase()} request.`);
    // // // //       console.error(err);
    // // // //     }
    // // // //   };

    // // // //   return (
    // // // //     <div style={styles.page}>
    // // // //       <div style={styles.container}>
    // // // //         <h2 style={styles.title}>🏬 Retailer Dashboard</h2>

    // // // //         <div style={styles.section}>
    // // // //           <h3 style={styles.subHeader}>Incoming Transfer Requests</h3>
    // // // //           {pendingRequests.length === 0 ? (
    // // // //             <p style={styles.emptyText}>You have no pending transfer requests.</p>
    // // // //           ) : (
    // // // //             pendingRequests.map((req) => (
    // // // //               <div key={req.product_uid} style={styles.requestCard}>
    // // // //                 <div>
    // // // //                   <p style={styles.productName}>{req.name}</p>
    // // // //                   <p><strong>Quantity:</strong> {req.quantity} units</p>
    // // // //                   <p><strong>Base Price:</strong> ₹{Number(req.price).toFixed(2)}</p>
    // // // //                   <p><strong>Transport Fee:</strong> ₹{Number(req.transport_fee).toFixed(2)}</p>
    // // // //                 </div>
    // // // //                 <div style={styles.buttonGroup}>
    // // // //                   <button 
    // // // //                     style={styles.buttonReject}
    // // // //                     onClick={() => handleRespondToRequest(req.product_uid, 'REJECT')}
    // // // //                   >
    // // // //                     Reject
    // // // //                   </button>
    // // // //                   <button 
    // // // //                     style={styles.buttonAccept}
    // // // //                     onClick={() => handleRespondToRequest(req.product_uid, 'ACCEPT')}
    // // // //                   >
    // // // //                     Accept
    // // // //                   </button>
    // // // //                 </div>
    // // // //               </div>
    // // // //             ))
    // // // //           )}
    // // // //         </div>

    // // // //         <div style={styles.section}>
    // // // //           <h3 style={styles.subHeader}>Your Product Inventory</h3>
    // // // //           {inventory.length === 0 ? (
    // // // //             <p style={styles.emptyText}>You have no products in your inventory.</p>
    // // // //           ) : (
    // // // //             <table style={styles.table}>
    // // // //                 <thead>
    // // // //                     <tr>
    // // // //                         <th style={styles.th}>Product ID</th>
    // // // //                         <th style={styles.th}>Name</th>
    // // // //                         <th style={styles.th}>Quantity</th>
    // // // //                         <th style={styles.th}>Action</th>
    // // // //                     </tr>
    // // // //                 </thead>
    // // // //                 <tbody>
    // // // //                     {inventory.map(p => (
    // // // //                         <tr key={p.product_uid}>
    // // // //                             <td style={styles.td}>{p.product_uid}</td>
    // // // //                             <td style={styles.td}>{p.name}</td>
    // // // //                             <td style={styles.td}>{p.quantity}</td>
    // // // //                             <td style={styles.td}>
    // // // //                                 <button style={styles.buttonSell}>Sell to Consumer</button>
    // // // //                             </td>
    // // // //                         </tr>
    // // // //                     ))}
    // // // //                 </tbody>
    // // // //             </table>
    // // // //           )}
    // // // //         </div>
    // // // //       </div>
    // // // //     </div>
    // // // //   );
    // // // // };

    // // // // // --- STYLES ---
    // // // // const styles = {
    // // // //     page: { background: '#f0f4f8', minHeight: 'calc(100vh - 80px)', paddingTop: '40px' },
    // // // //     container: { maxWidth: 900, margin: 'auto', padding: '20px' },
    // // // //     title: { color: '#8e44ad', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
    // // // //     section: { background: 'white', borderRadius: '12px', padding: '25px', marginBottom: '25px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' },
    // // // //     subHeader: { color: '#8e44ad', fontWeight: 700, borderBottom: '2px solid #e0e0e0', paddingBottom: '10px', marginBottom: '20px' },
    // // // //     emptyText: { textAlign: 'center', color: '#777', padding: '20px 0' },
    // // // //     requestCard: {
    // // // //         display: 'flex',
    // // // //         justifyContent: 'space-between',
    // // // //         alignItems: 'center',
    // // // //         padding: '15px',
    // // // //         border: '1px solid #ddd',
    // // // //         borderRadius: '8px',
    // // // //         marginBottom: '10px'
    // // // //     },
    // // // //     productName: { fontWeight: 'bold', fontSize: '1.2rem', color: '#333' },
    // // // //     buttonGroup: { display: 'flex', gap: '10px' },
    // // // //     buttonAccept: { background: '#27ae60', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    // // // //     buttonReject: { background: '#c0392b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    // // // //     table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
    // // // //     th: { background: '#f5eef8', color: '#8e44ad', padding: '12px 15px', textAlign: 'left', fontWeight: 'bold' },
    // // // //     td: { padding: '12px 15px', borderBottom: '1px solid #e0e0e0' },
    // // // //     buttonSell: { background: '#9b59b6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
    // // // // };

    // // // // export default RetailerDashboard;

    // // // // import React, { useState, useEffect } from "react";
    // // // // import { getProducts, getPendingRetailerRequests, respondToRetailerRequest, getProductHistory, setRetailerPrice } from "../api";
    // // // // import QRCode from "qrcode.react"; // Import the QR Code component

    // // // // const RetailerDashboard = ({ user }) => {
    // // // //   const [inventory, setInventory] = useState([]);
    // // // //   const [pendingRequests, setPendingRequests] = useState([]);
    // // // //   const [viewingProduct, setViewingProduct] = useState(null);
    // // // //   const [productHistory, setProductHistory] = useState([]);
    // // // //   const [newPrice, setNewPrice] = useState("");
    // // // //   const [qrCodeValue, setQrCodeValue] = useState("");

    // // // //   const loadData = async () => { /* ... same as before ... */ };
    // // // //   useEffect(() => { loadData(); }, [user]);
    // // // //   const handleRespondToRequest = async (productUid, decision) => { /* ... same as before ... */ };

    // // // //   const handleViewClick = async (product) => {
    // // // //     const historyData = await getProductHistory(product.product_uid);
    // // // //     setProductHistory(Array.isArray(historyData) ? historyData : []);
    // // // //     setViewingProduct(product);
    // // // //   };

    // // // //   const handleGenerateQR = async () => {
    // // // //     if (!newPrice || isNaN(parseFloat(newPrice)) || parseFloat(newPrice) <= 0) {
    // // // //       return alert("Please enter a valid price.");
    // // // //     }
    // // // //     try {
    // // // //       await setRetailerPrice(viewingProduct.product_uid, user.public_id, newPrice);
    // // // //       const qrText = `Product: ${viewingProduct.name}\nID: ${viewingProduct.product_uid}\nPrice: ₹${Number(newPrice).toFixed(2)}\nSold by: ${user.name}`;
    // // // //       setQrCodeValue(qrText);
    // // // //       alert("Price set and QR Code generated!");
    // // // //       loadData();
    // // // //     } catch (err) {
    // // // //       alert("Failed to set price.");
    // // // //     }
    // // // //   };
    
    // // // //   const closeModal = () => {
    // // // //     setViewingProduct(null);
    // // // //     setProductHistory([]);
    // // // //     setNewPrice("");
    // // // //     setQrCodeValue("");
    // // // //   };

    // // // //   return (
    // // // //     <div style={styles.page}>
    // // // //       <div style={styles.container}>
    // // // //         <h2 style={styles.title}>🏬 Retailer Dashboard</h2>

    // // // //         <div style={styles.section}>
    // // // //           <h3 style={styles.subHeader}>Incoming Transfer Requests</h3>
    // // // //           {/* ... Incoming Requests section from before ... */}
    // // // //         </div>

    // // // //         <div style={styles.section}>
    // // // //           <h3 style={styles.subHeader}>Your Product Inventory</h3>
    // // // //           <div style={styles.tableContainer}>
    // // // //             <table style={styles.table}>
    // // // //                 <thead>
    // // // //                     <tr>
    // // // //                         <th style={styles.th}>Product ID</th>
    // // // //                         <th style={styles.th}>Name</th>
    // // // //                         <th style={styles.th}>Quantity</th>
    // // // //                         <th style={styles.th}>Action</th>
    // // // //                     </tr>
    // // // //                 </thead>
    // // // //                 <tbody>
    // // // //                     {inventory.map(p => (
    // // // //                         <tr key={p.product_uid}>
    // // // //                             <td style={styles.td}>{p.product_uid}</td>
    // // // //                             <td style={styles.td}>{p.name}</td>
    // // // //                             <td style={styles.td}>{p.quantity}</td>
    // // // //                             <td style={styles.td}>
    // // // //                                 <button style={styles.buttonView} onClick={() => handleViewClick(p)}>
    // // // //                                   View / Set Price
    // // // //                                 </button>
    // // // //                             </td>
    // // // //                         </tr>
    // // // //                     ))}
    // // // //                 </tbody>
    // // // //             </table>
    // // // //           </div>
    // // // //         </div>
    // // // //       </div>

    // // // //       {viewingProduct && (
    // // // //         <div style={styles.modalOverlay}>
    // // // //           <div style={styles.modalContent}>
    // // // //             <button style={styles.closeButton} onClick={closeModal}>×</button>
    // // // //             <h3 style={styles.modalTitle}>{viewingProduct.name}</h3>
                
    // // // //             <div style={styles.historySection}>
    // // // //               <h4>Product Journey:</h4>
    // // // //               {productHistory.map(act => (
    // // // //                 <p key={act.id}><strong>{act.action}:</strong> by {act.actor_id} on {new Date(act.created_at).toLocaleDateString()}</p>
    // // // //               ))}
    // // // //             </div>

    // // // //             {qrCodeValue ? (
    // // // //               <div style={styles.qrContainer}>
    // // // //                 <h4>Scan with Google Lens or Phone Camera</h4>
    // // // //                 <QRCode value={qrCodeValue} size={256} />
    // // // //                 <p style={styles.qrData}>{qrCodeValue.replace(/\n/g, ', ')}</p>
    // // // //               </div>
    // // // //             ) : (
    // // // //               <div style={styles.setPriceSection}>
    // // // //                 <h4>Set Final Price for Consumer:</h4>
    // // // //                 <div style={styles.inputGroup}>
    // // // //                   <span style={styles.currencySymbol}>₹</span>
    // // // //                   <input
    // // // //                     style={styles.priceInput}
    // // // //                     type="number"
    // // // //                     placeholder="e.g., 150.00"
    // // // //                     value={newPrice}
    // // // //                     onChange={(e) => setNewPrice(e.target.value)}
    // // // //                   />
    // // // //                   <button style={styles.buttonAccept} onClick={handleGenerateQR}>Generate QR Code</button>
    // // // //                 </div>
    // // // //               </div>
    // // // //             )}
    // // // //           </div>
    // // // //         </div>
    // // // //       )}
    // // // //     </div>
    // // // //   );
    // // // // };

    // // // // const styles = { /* ... styles from before ... */ };
    // // // // export default RetailerDashboard;

    // // // // import React, { useState, useEffect } from "react";
    // // // // import { getProducts, getPendingRetailerRequests, respondToRetailerRequest, getProductHistory, setRetailerPrice } from "../api";
    // // // // import QRCode from "qrcode.react"; // Corrected import

    // // // // const RetailerDashboard = ({ user }) => {
    // // // //   const [inventory, setInventory] = useState([]);
    // // // //   const [pendingRequests, setPendingRequests] = useState([]);
    // // // //   const [viewingProduct, setViewingProduct] = useState(null);
    // // // //   const [productHistory, setProductHistory] = useState([]);
    // // // //   const [newPrice, setNewPrice] = useState("");
    // // // //   const [qrCodeValue, setQrCodeValue] = useState("");

    // // // //   const loadData = async () => {
    // // // //     if (user?.public_id) {
    // // // //       const inventoryData = await getProducts(user.public_id);
    // // // //       const requestsData = await getPendingRetailerRequests(user.public_id);
    // // // //       setInventory(Array.isArray(inventoryData) ? inventoryData : []);
    // // // //       setPendingRequests(Array.isArray(requestsData) ? requestsData : []);
    // // // //     }
    // // // //   };

    // // // //   useEffect(() => {
    // // // //     loadData();
    // // // //   }, [user]);

    // // // //   const handleRespondToRequest = async (productUid, decision) => {
    // // // //     await respondToRetailerRequest(productUid, user.public_id, decision);
    // // // //     alert(`Request successfully ${decision.toLowerCase()}ed!`);
    // // // //     loadData();
    // // // //   };

    // // // //   const handleViewClick = async (product) => {
    // // // //     const historyData = await getProductHistory(product.product_uid);
    // // // //     setProductHistory(Array.isArray(historyData) ? historyData : []);
    // // // //     setViewingProduct(product);
    // // // //   };

    // // // //   const handleGenerateQR = async () => {
    // // // //     if (!newPrice || isNaN(parseFloat(newPrice)) || parseFloat(newPrice) <= 0) {
    // // // //       return alert("Please enter a valid price.");
    // // // //     }
    // // // //     try {
    // // // //       await setRetailerPrice(viewingProduct.product_uid, user.public_id, newPrice);
    // // // //       const qrText = `Product: ${viewingProduct.name}\nID: ${viewingProduct.product_uid}\nPrice: ₹${Number(newPrice).toFixed(2)}\nSold by: ${user.name}`;
    // // // //       setQrCodeValue(qrText);
    // // // //       alert("Price set and QR Code generated!");
    // // // //       loadData();
    // // // //     } catch (err) {
    // // // //       alert("Failed to set price.");
    // // // //     }
    // // // //   };
    
    // // // //   const closeModal = () => {
    // // // //     setViewingProduct(null);
    // // // //     setProductHistory([]);
    // // // //     setNewPrice("");
    // // // //     setQrCodeValue("");
    // // // //   };

    // // // //   return (
    // // // //     <div style={styles.page}>
    // // // //       <div style={styles.container}>
    // // // //         <h2 style={styles.title}>🏬 Retailer Dashboard</h2>

    // // // //         <div style={styles.section}>
    // // // //           <h3 style={styles.subHeader}>Incoming Transfer Requests</h3>
    // // // //           {/* ... Incoming Requests section ... */}
    // // // //         </div>
            
    // // // //         <div style={styles.section}>
    // // // //           <h3 style={styles.subHeader}>Your Product Inventory</h3>
    // // // //           <div style={styles.tableContainer}>
    // // // //             <table style={styles.table}>
    // // // //                 <thead>
    // // // //                     <tr>
    // // // //                         <th style={styles.th}>Product ID</th>
    // // // //                         <th style={styles.th}>Name</th>
    // // // //                         <th style={styles.th}>Quantity</th>
    // // // //                         <th style={styles.th}>Action</th>
    // // // //                     </tr>
    // // // //                 </thead>
    // // // //                 <tbody>
    // // // //                     {inventory.map(p => (
    // // // //                         <tr key={p.product_uid}>
    // // // //                             <td style={styles.td}>{p.product_uid}</td>
    // // // //                             <td style={styles.td}>{p.name}</td>
    // // // //                             <td style={styles.td}>{p.quantity}</td>
    // // // //                             <td style={styles.td}>
    // // // //                                 <button style={styles.buttonView} onClick={() => handleViewClick(p)}>
    // // // //                                   View / Set Price
    // // // //                                 </button>
    // // // //                             </td>
    // // // //                         </tr>
    // // // //                     ))}
    // // // //                 </tbody>
    // // // //             </table>
    // // // //           </div>
    // // // //         </div>
    // // // //       </div>

    // // // //       {viewingProduct && (
    // // // //         <div style={styles.modalOverlay}>
    // // // //           <div style={styles.modalContent}>
    // // // //             <button style={styles.closeButton} onClick={closeModal}>×</button>
    // // // //             <h3 style={styles.modalTitle}>{viewingProduct.name}</h3>
                
    // // // //             <div style={styles.historySection}>
    // // // //               <h4>Product Journey:</h4>
    // // // //               {productHistory.map(act => (
    // // // //                 <p key={act.id}><strong>{act.action}:</strong> by {act.actor_id} on {new Date(act.created_at).toLocaleDateString()}</p>
    // // // //               ))}
    // // // //             </div>

    // // // //             {qrCodeValue ? (
    // // // //               <div style={styles.qrContainer}>
    // // // //                 <h4>Scan with Google Lens or Phone Camera</h4>
    // // // //                 <QRCode value={qrCodeValue} size={256} />
    // // // //                 <p style={styles.qrData}>{qrCodeValue.replace(/\n/g, ', ')}</p>
    // // // //               </div>
    // // // //             ) : (
    // // // //               <div style={styles.setPriceSection}>
    // // // //                 <h4>Set Final Price for Consumer:</h4>
    // // // //                 <div style={styles.inputGroup}>
    // // // //                   <span style={styles.currencySymbol}>₹</span>
    // // // //                   <input
    // // // //                     style={styles.priceInput}
    // // // //                     type="number"
    // // // //                     placeholder="e.g., 150.00"
    // // // //                     value={newPrice}
    // // // //                     onChange={(e) => setNewPrice(e.target.value)}
    // // // //                   />
    // // // //                   <button style={styles.buttonAccept} onClick={handleGenerateQR}>Generate QR Code</button>
    // // // //                 </div>
    // // // //               </div>
    // // // //             )}
    // // // //           </div>
    // // // //         </div>
    // // // //       )}
    // // // //     </div>
    // // // //   );
    // // // // };

    // // // // // --- STYLES ---
    // // // // const styles = {
    // // // //     page: { background: '#f0f4f8', minHeight: 'calc(100vh - 70px)', paddingTop: '20px' },
    // // // //     container: { maxWidth: 900, margin: '40px auto', padding: '20px' },
    // // // //     title: { color: '#8e44ad', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
    // // // //     section: { background: 'white', borderRadius: '12px', padding: '25px', marginBottom: '25px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' },
    // // // //     // ... all other styles
    // // // // };

    // // // // export default RetailerDashboard;

    // // // // import React, { useState, useEffect } from "react";
    // // // // import {
    // // // //   getProducts,
    // // // //   getPendingRetailerRequests,
    // // // //   respondToRetailerRequest,
    // // // //   getProductHistory,
    // // // //   setRetailerPrice,
    // // // // } from "../api";
    // // // // import { QRCode } from "@qrcode/react"; // ✅ Corrected import for new package

    // // // // const RetailerDashboard = ({ user }) => {
    // // // //   const [inventory, setInventory] = useState([]);
    // // // //   const [pendingRequests, setPendingRequests] = useState([]);
    // // // //   const [viewingProduct, setViewingProduct] = useState(null);
    // // // //   const [productHistory, setProductHistory] = useState([]);
    // // // //   const [newPrice, setNewPrice] = useState("");
    // // // //   const [qrCodeValue, setQrCodeValue] = useState("");

    // // // //   const loadData = async () => {
    // // // //     if (user?.public_id) {
    // // // //       const inventoryData = await getProducts(user.public_id);
    // // // //       const requestsData = await getPendingRetailerRequests(user.public_id);
    // // // //       setInventory(Array.isArray(inventoryData) ? inventoryData : []);
    // // // //       setPendingRequests(Array.isArray(requestsData) ? requestsData : []);
    // // // //     }
    // // // //   };

    // // // //   useEffect(() => {
    // // // //     loadData();
    // // // //   }, [user]);

    // // // //   const handleRespondToRequest = async (productUid, decision) => {
    // // // //     await respondToRetailerRequest(productUid, user.public_id, decision);
    // // // //     alert(`Request successfully ${decision.toLowerCase()}ed!`);
    // // // //     loadData();
    // // // //   };

    // // // //   const handleViewClick = async (product) => {
    // // // //     const historyData = await getProductHistory(product.product_uid);
    // // // //     setProductHistory(Array.isArray(historyData) ? historyData : []);
    // // // //     setViewingProduct(product);
    // // // //   };

    // // // //   const handleGenerateQR = async () => {
    // // // //     if (!newPrice || isNaN(parseFloat(newPrice)) || parseFloat(newPrice) <= 0) {
    // // // //       return alert("Please enter a valid price.");
    // // // //     }
    // // // //     try {
    // // // //       await setRetailerPrice(
    // // // //         viewingProduct.product_uid,
    // // // //         user.public_id,
    // // // //         newPrice
    // // // //       );
    // // // //       const qrText = `Product: ${viewingProduct.name}\nID: ${viewingProduct.product_uid}\nPrice: ₹${Number(
    // // // //         newPrice
    // // // //       ).toFixed(2)}\nSold by: ${user.name}`;
    // // // //       setQrCodeValue(qrText);
    // // // //       alert("Price set and QR Code generated!");
    // // // //       loadData();
    // // // //     } catch (err) {
    // // // //       alert("Failed to set price.");
    // // // //     }
    // // // //   };

    // // // //   const closeModal = () => {
    // // // //     setViewingProduct(null);
    // // // //     setProductHistory([]);
    // // // //     setNewPrice("");
    // // // //     setQrCodeValue("");
    // // // //   };

    // // // //   return (
    // // // //     <div style={styles.page}>
    // // // //       <div style={styles.container}>
    // // // //         <h2 style={styles.title}>🏬 Retailer Dashboard</h2>

    // // // //         <div style={styles.section}>
    // // // //           <h3 style={styles.subHeader}>Incoming Transfer Requests</h3>
    // // // //           {/* TODO: Add incoming requests display */}
    // // // //         </div>

    // // // //         <div style={styles.section}>
    // // // //           <h3 style={styles.subHeader}>Your Product Inventory</h3>
    // // // //           <div style={styles.tableContainer}>
    // // // //             <table style={styles.table}>
    // // // //               <thead>
    // // // //                 <tr>
    // // // //                   <th style={styles.th}>Product ID</th>
    // // // //                   <th style={styles.th}>Name</th>
    // // // //                   <th style={styles.th}>Quantity</th>
    // // // //                   <th style={styles.th}>Action</th>
    // // // //                 </tr>
    // // // //               </thead>
    // // // //               <tbody>
    // // // //                 {inventory.map((p) => (
    // // // //                   <tr key={p.product_uid}>
    // // // //                     <td style={styles.td}>{p.product_uid}</td>
    // // // //                     <td style={styles.td}>{p.name}</td>
    // // // //                     <td style={styles.td}>{p.quantity}</td>
    // // // //                     <td style={styles.td}>
    // // // //                       <button
    // // // //                         style={styles.buttonView}
    // // // //                         onClick={() => handleViewClick(p)}
    // // // //                       >
    // // // //                         View / Set Price
    // // // //                       </button>
    // // // //                     </td>
    // // // //                   </tr>
    // // // //                 ))}
    // // // //               </tbody>
    // // // //             </table>
    // // // //           </div>
    // // // //         </div>
    // // // //       </div>

    // // // //       {viewingProduct && (
    // // // //         <div style={styles.modalOverlay}>
    // // // //           <div style={styles.modalContent}>
    // // // //             <button style={styles.closeButton} onClick={closeModal}>
    // // // //               ×
    // // // //             </button>
    // // // //             <h3 style={styles.modalTitle}>{viewingProduct.name}</h3>

    // // // //             <div style={styles.historySection}>
    // // // //               <h4>Product Journey:</h4>
    // // // //               {productHistory.map((act) => (
    // // // //                 <p key={act.id}>
    // // // //                   <strong>{act.action}:</strong> by {act.actor_id} on{" "}
    // // // //                   {new Date(act.created_at).toLocaleDateString()}
    // // // //                 </p>
    // // // //               ))}
    // // // //             </div>

    // // // //             {qrCodeValue ? (
    // // // //               <div style={styles.qrContainer}>
    // // // //                 <h4>Scan with Google Lens or Phone Camera</h4>
    // // // //                 <QRCode value={qrCodeValue} size={256} />
    // // // //                 <p style={styles.qrData}>
    // // // //                   {qrCodeValue.replace(/\n/g, ", ")}
    // // // //                 </p>
    // // // //               </div>
    // // // //             ) : (
    // // // //               <div style={styles.setPriceSection}>
    // // // //                 <h4>Set Final Price for Consumer:</h4>
    // // // //                 <div style={styles.inputGroup}>
    // // // //                   <span style={styles.currencySymbol}>₹</span>
    // // // //                   <input
    // // // //                     style={styles.priceInput}
    // // // //                     type="number"
    // // // //                     placeholder="e.g., 150.00"
    // // // //                     value={newPrice}
    // // // //                     onChange={(e) => setNewPrice(e.target.value)}
    // // // //                   />
    // // // //                   <button
    // // // //                     style={styles.buttonAccept}
    // // // //                     onClick={handleGenerateQR}
    // // // //                   >
    // // // //                     Generate QR Code
    // // // //                   </button>
    // // // //                 </div>
    // // // //               </div>
    // // // //             )}
    // // // //           </div>
    // // // //         </div>
    // // // //       )}
    // // // //     </div>
    // // // //   );
    // // // // };

    // // // // // --- STYLES ---
    // // // // const styles = {
    // // // //   page: {
    // // // //     background: "#f0f4f8",
    // // // //     minHeight: "calc(100vh - 70px)",
    // // // //     paddingTop: "20px",
    // // // //   },
    // // // //   container: {
    // // // //     maxWidth: 900,
    // // // //     margin: "40px auto",
    // // // //     padding: "20px",
    // // // //   },
    // // // //   title: {
    // // // //     color: "#8e44ad",
    // // // //     fontSize: "2.2rem",
    // // // //     fontWeight: 800,
    // // // //     textAlign: "center",
    // // // //     marginBottom: "30px",
    // // // //   },
    // // // //   section: {
    // // // //     background: "white",
    // // // //     borderRadius: "12px",
    // // // //     padding: "25px",
    // // // //     marginBottom: "25px",
    // // // //     boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    // // // //   },
    // // // //   tableContainer: { overflowX: "auto" },
    // // // //   table: { width: "100%", borderCollapse: "collapse" },
    // // // //   th: { textAlign: "left", padding: "10px", borderBottom: "2px solid #ddd" },
    // // // //   td: { padding: "10px", borderBottom: "1px solid #eee" },
    // // // //   buttonView: {
    // // // //     padding: "6px 12px",
    // // // //     background: "#3498db",
    // // // //     color: "white",
    // // // //     border: "none",
    // // // //     borderRadius: "6px",
    // // // //     cursor: "pointer",
    // // // //   },
    // // // //   modalOverlay: {
    // // // //     position: "fixed",
    // // // //     top: 0,
    // // // //     left: 0,
    // // // //     right: 0,
    // // // //     bottom: 0,
    // // // //     backgroundColor: "rgba(0,0,0,0.5)",
    // // // //     display: "flex",
    // // // //     justifyContent: "center",
    // // // //     alignItems: "center",
    // // // //   },
    // // // //   modalContent: {
    // // // //     background: "white",
    // // // //     borderRadius: "12px",
    // // // //     padding: "30px",
    // // // //     maxWidth: "600px",
    // // // //     width: "100%",
    // // // //     position: "relative",
    // // // //   },
    // // // //   closeButton: {
    // // // //     position: "absolute",
    // // // //     top: "10px",
    // // // //     right: "15px",
    // // // //     fontSize: "24px",
    // // // //     border: "none",
    // // // //     background: "transparent",
    // // // //     cursor: "pointer",
    // // // //   },
    // // // //   modalTitle: {
    // // // //     fontSize: "1.5rem",
    // // // //     fontWeight: "bold",
    // // // //     marginBottom: "20px",
    // // // //   },
    // // // //   historySection: { marginBottom: "20px" },
    // // // //   qrContainer: { textAlign: "center" },
    // // // //   qrData: { marginTop: "10px", fontSize: "0.9rem", color: "#555" },
    // // // //   setPriceSection: { marginTop: "20px" },

    // // // //   // 🔥 Improved input group
    // // // //   inputGroup: {
    // // // //     display: "flex",
    // // // //     alignItems: "center",
    // // // //     gap: "10px", // spacing between input and button
    // // // //     marginTop: "10px",
    // // // //   },
    // // // //   currencySymbol: {
    // // // //     fontWeight: "bold",
    // // // //     fontSize: "1.2rem",
    // // // //     color: "#333",
    // // // //   },
    // // // //   priceInput: {
    // // // //     flex: "0 0 150px", // fixed width input
    // // // //     padding: "10px 12px",
    // // // //     fontSize: "1rem",
    // // // //     border: "1px solid #ccc",
    // // // //     borderRadius: "6px",
    // // // //   },
    // // // //   buttonAccept: {
    // // // //     flex: "0 0 auto",
    // // // //     padding: "10px 18px",
    // // // //     fontSize: "1rem",
    // // // //     background: "#27ae60",
    // // // //     color: "white",
    // // // //     fontWeight: "600",
    // // // //     border: "none",
    // // // //     borderRadius: "6px",
    // // // //     cursor: "pointer",
    // // // //     transition: "background 0.2s ease",
    // // // //   },
    // // // // };

    // // // // export default RetailerDashboard;



    // // // // import React, { useState, useEffect } from "react";
    // // // // import {
    // // // //   getProducts,
    // // // //   getPendingRetailerRequests,
    // // // //   respondToRetailerRequest,
    // // // //   getProductHistory,
    // // // //   setRetailerPrice,
    // // // // } from "../api";
    // // // // import { QRCode } from "@qrcode/react"; // ✅ Option 2: modern package

    // // // // const RetailerDashboard = ({ user }) => {
    // // // //   const [inventory, setInventory] = useState([]);
    // // // //   const [pendingRequests, setPendingRequests] = useState([]);
    // // // //   const [viewingProduct, setViewingProduct] = useState(null);
    // // // //   const [productHistory, setProductHistory] = useState([]);
    // // // //   const [newPrice, setNewPrice] = useState("");
    // // // //   const [qrCodeValue, setQrCodeValue] = useState("");

    // // // //   const loadData = async () => {
    // // // //     if (user?.public_id) {
    // // // //       const inventoryData = await getProducts(user.public_id);
    // // // //       const requestsData = await getPendingRetailerRequests(user.public_id);
    // // // //       setInventory(Array.isArray(inventoryData) ? inventoryData : []);
    // // // //       setPendingRequests(Array.isArray(requestsData) ? requestsData : []);
    // // // //     }
    // // // //   };

    // // // //   useEffect(() => {
    // // // //     loadData();
    // // // //   }, [user]);

    // // // //   const handleRespondToRequest = async (productUid, decision) => {
    // // // //     await respondToRetailerRequest(productUid, user.public_id, decision);
    // // // //     alert(`Request successfully ${decision.toLowerCase()}ed!`);
    // // // //     loadData();
    // // // //   };

    // // // //   const handleViewClick = async (product) => {
    // // // //     const historyData = await getProductHistory(product.product_uid);
    // // // //     setProductHistory(Array.isArray(historyData) ? historyData : []);
    // // // //     setViewingProduct(product);
    // // // //   };

    // // // //   const handleGenerateQR = async () => {
    // // // //     if (!newPrice || isNaN(parseFloat(newPrice)) || parseFloat(newPrice) <= 0) {
    // // // //       return alert("Please enter a valid price.");
    // // // //     }
    // // // //     try {
    // // // //       await setRetailerPrice(
    // // // //         viewingProduct.product_uid,
    // // // //         user.public_id,
    // // // //         newPrice
    // // // //       );
    // // // //       const qrText = `Product: ${viewingProduct.name}\nID: ${
    // // // //         viewingProduct.product_uid
    // // // //       }\nPrice: ₹${Number(newPrice).toFixed(2)}\nSold by: ${user.name}`;
    // // // //       setQrCodeValue(qrText);
    // // // //       alert("Price set and QR Code generated!");
    // // // //       loadData();
    // // // //     } catch (err) {
    // // // //       alert("Failed to set price.");
    // // // //     }
    // // // //   };

    // // // //   const closeModal = () => {
    // // // //     setViewingProduct(null);
    // // // //     setProductHistory([]);
    // // // //     setNewPrice("");
    // // // //     setQrCodeValue("");
    // // // //   };

    // // // //   return (
    // // // //     <div style={styles.page}>
    // // // //       <div style={styles.container}>
    // // // //         <h2 style={styles.title}>🏬 Retailer Dashboard</h2>

    // // // //         <div style={styles.section}>
    // // // //           <h3 style={styles.subHeader}>Incoming Transfer Requests</h3>
    // // // //           {/* TODO: Add request handling UI */}
    // // // //         </div>

    // // // //         <div style={styles.section}>
    // // // //           <h3 style={styles.subHeader}>Your Product Inventory</h3>
    // // // //           <div style={styles.tableContainer}>
    // // // //             <table style={styles.table}>
    // // // //               <thead>
    // // // //                 <tr>
    // // // //                   <th style={styles.th}>Product ID</th>
    // // // //                   <th style={styles.th}>Name</th>
    // // // //                   <th style={styles.th}>Quantity</th>
    // // // //                   <th style={styles.th}>Action</th>
    // // // //                 </tr>
    // // // //               </thead>
    // // // //               <tbody>
    // // // //                 {inventory.map((p) => (
    // // // //                   <tr key={p.product_uid}>
    // // // //                     <td style={styles.td}>{p.product_uid}</td>
    // // // //                     <td style={styles.td}>{p.name}</td>
    // // // //                     <td style={styles.td}>{p.quantity}</td>
    // // // //                     <td style={styles.td}>
    // // // //                       <button
    // // // //                         style={styles.buttonView}
    // // // //                         onClick={() => handleViewClick(p)}
    // // // //                       >
    // // // //                         View / Set Price
    // // // //                       </button>
    // // // //                     </td>
    // // // //                   </tr>
    // // // //                 ))}
    // // // //               </tbody>
    // // // //             </table>
    // // // //           </div>
    // // // //         </div>
    // // // //       </div>

    // // // //       {viewingProduct && (
    // // // //         <div style={styles.modalOverlay}>
    // // // //           <div style={styles.modalContent}>
    // // // //             <button style={styles.closeButton} onClick={closeModal}>
    // // // //               ×
    // // // //             </button>
    // // // //             <h3 style={styles.modalTitle}>{viewingProduct.name}</h3>

    // // // //             <div style={styles.historySection}>
    // // // //               <h4>Product Journey:</h4>
    // // // //               {productHistory.map((act) => (
    // // // //                 <p key={act.id}>
    // // // //                   <strong>{act.action}:</strong> by {act.actor_id} on{" "}
    // // // //                   {new Date(act.created_at).toLocaleDateString()}
    // // // //                 </p>
    // // // //               ))}
    // // // //             </div>

    // // // //             {qrCodeValue ? (
    // // // //               <div style={styles.qrContainer}>
    // // // //                 <h4>Scan with Google Lens or Phone Camera</h4>
    // // // //                 <QRCode value={qrCodeValue} size={256} />
    // // // //                 <p style={styles.qrData}>
    // // // //                   {qrCodeValue.replace(/\n/g, ", ")}
    // // // //                 </p>
    // // // //               </div>
    // // // //             ) : (
    // // // //               <div style={styles.setPriceSection}>
    // // // //                 <h4>Set Final Price for Consumer:</h4>
    // // // //                 <div style={styles.inputGroup}>
    // // // //                   <span style={styles.currencySymbol}>₹</span>
    // // // //                   <input
    // // // //                     style={styles.priceInput}
    // // // //                     type="number"
    // // // //                     placeholder="e.g., 150.00"
    // // // //                     value={newPrice}
    // // // //                     onChange={(e) => setNewPrice(e.target.value)}
    // // // //                   />
    // // // //                   <button
    // // // //                     style={styles.buttonAccept}
    // // // //                     onClick={handleGenerateQR}
    // // // //                   >
    // // // //                     Generate QR Code
    // // // //                   </button>
    // // // //                 </div>
    // // // //               </div>
    // // // //             )}
    // // // //           </div>
    // // // //         </div>
    // // // //       )}
    // // // //     </div>
    // // // //   );
    // // // // };

    // // // // // --- STYLES ---
    // // // // const styles = {
    // // // //   page: {
    // // // //     background: "#f0f4f8",
    // // // //     minHeight: "calc(100vh - 70px)",
    // // // //     paddingTop: "20px",
    // // // //   },
    // // // //   container: {
    // // // //     maxWidth: 900,
    // // // //     margin: "40px auto",
    // // // //     padding: "20px",
    // // // //   },
    // // // //   title: {
    // // // //     color: "#8e44ad",
    // // // //     fontSize: "2.2rem",
    // // // //     fontWeight: 800,
    // // // //     textAlign: "center",
    // // // //     marginBottom: "30px",
    // // // //   },
    // // // //   section: {
    // // // //     background: "white",
    // // // //     borderRadius: "12px",
    // // // //     padding: "25px",
    // // // //     marginBottom: "25px",
    // // // //     boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    // // // //   },
    // // // //   tableContainer: { overflowX: "auto" },
    // // // //   table: { width: "100%", borderCollapse: "collapse" },
    // // // //   th: {
    // // // //     textAlign: "left",
    // // // //     padding: "10px",
    // // // //     background: "#eee",
    // // // //   },
    // // // //   td: { padding: "10px", borderBottom: "1px solid #ddd" },
    // // // //   buttonView: {
    // // // //     padding: "6px 12px",
    // // // //     background: "#2980b9",
    // // // //     color: "white",
    // // // //     border: "none",
    // // // //     borderRadius: "6px",
    // // // //     cursor: "pointer",
    // // // //   },
    // // // //   modalOverlay: {
    // // // //     position: "fixed",
    // // // //     top: 0,
    // // // //     left: 0,
    // // // //     right: 0,
    // // // //     bottom: 0,
    // // // //     backgroundColor: "rgba(0,0,0,0.5)",
    // // // //     display: "flex",
    // // // //     alignItems: "center",
    // // // //     justifyContent: "center",
    // // // //     zIndex: 1000,
    // // // //   },
    // // // //   modalContent: {
    // // // //     background: "white",
    // // // //     borderRadius: "12px",
    // // // //     padding: "20px",
    // // // //     width: "500px",
    // // // //     maxHeight: "80vh",
    // // // //     overflowY: "auto",
    // // // //     position: "relative",
    // // // //     boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    // // // //   },
    // // // //   closeButton: {
    // // // //     position: "absolute",
    // // // //     top: "10px",
    // // // //     right: "10px",
    // // // //     background: "none",
    // // // //     border: "none",
    // // // //     fontSize: "20px",
    // // // //     cursor: "pointer",
    // // // //   },
    // // // //   modalTitle: {
    // // // //     marginBottom: "15px",
    // // // //     fontSize: "1.5rem",
    // // // //     fontWeight: "bold",
    // // // //   },
    // // // //   historySection: {
    // // // //     marginBottom: "20px",
    // // // //     padding: "10px",
    // // // //     background: "#f9f9f9",
    // // // //     borderRadius: "8px",
    // // // //   },
    // // // //   setPriceSection: { marginTop: "20px" },
    // // // //   inputGroup: {
    // // // //     display: "flex",
    // // // //     alignItems: "center",
    // // // //     justifyContent: "center", // center the row
    // // // //     gap: "12px",
    // // // //     marginTop: "12px",
    // // // //   },
    // // // //   currencySymbol: {
    // // // //     fontWeight: "bold",
    // // // //     fontSize: "1.2rem",
    // // // //     color: "#333",
    // // // //   },
    // // // //   priceInput: {
    // // // //     width: "180px",
    // // // //     padding: "10px 12px",
    // // // //     fontSize: "1rem",
    // // // //     border: "1px solid #ccc",
    // // // //     borderRadius: "6px",
    // // // //   },
    // // // //   buttonAccept: {
    // // // //     padding: "10px 18px",
    // // // //     fontSize: "1rem",
    // // // //     background: "#27ae60",
    // // // //     color: "white",
    // // // //     fontWeight: "600",
    // // // //     border: "none",
    // // // //     borderRadius: "6px",
    // // // //     cursor: "pointer",
    // // // //     transition: "background 0.2s ease",
    // // // //     whiteSpace: "nowrap",
    // // // //     maxWidth: "200px", // prevent stretching
    // // // //   },
    // // // //   qrContainer: { textAlign: "center", marginTop: "20px" },
    // // // //   qrData: { marginTop: "10px", fontSize: "0.9rem", color: "#555" },
    // // // // };

    // // // // export default RetailerDashboard;


    // // // // import React, { useState, useEffect } from "react";
    // // // // import {
    // // // //   getProducts,
    // // // //   getPendingRetailerRequests,
    // // // //   respondToRetailerRequest,
    // // // //   getProductHistory,
    // // // //   setRetailerPrice,
    // // // // } from "../api";
    // // // // import { QRCode } from "@qrcode/react";

    // // // // const RetailerDashboard = ({ user }) => {
    // // // //   const [inventory, setInventory] = useState([]);
    // // // //   const [pendingRequests, setPendingRequests] = useState([]);
    // // // //   const [viewingProduct, setViewingProduct] = useState(null);
    // // // //   const [productHistory, setProductHistory] = useState([]);
    // // // //   const [newPrice, setNewPrice] = useState("");
    // // // //   const [qrCodeValue, setQrCodeValue] = useState("");

    // // // //   const loadData = async () => {
    // // // //     if (user?.public_id) {
    // // // //       const inventoryData = await getProducts(user.public_id);
    // // // //       const requestsData = await getPendingRetailerRequests(user.public_id);
    // // // //       setInventory(Array.isArray(inventoryData) ? inventoryData : []);
    // // // //       setPendingRequests(Array.isArray(requestsData) ? requestsData : []);
    // // // //     }
    // // // //   };

    // // // //   useEffect(() => {
    // // // //     loadData();
    // // // //   }, [user]);

    // // // //   const handleRespondToRequest = async (productUid, decision) => {
    // // // //     await respondToRetailerRequest(productUid, user.public_id, decision);
    // // // //     alert(`Request successfully ${decision.toLowerCase()}ed!`);
    // // // //     loadData();
    // // // //   };

    // // // //   const handleViewClick = async (product) => {
    // // // //     const historyData = await getProductHistory(product.product_uid);
    // // // //     setProductHistory(Array.isArray(historyData) ? historyData : []);
    // // // //     setViewingProduct(product);
    // // // //   };

    // // // //   const handleGenerateQR = async () => {
    // // // //     if (!newPrice || isNaN(parseFloat(newPrice)) || parseFloat(newPrice) <= 0) {
    // // // //       return alert("Please enter a valid price.");
    // // // //     }
    // // // //     try {
    // // // //       await setRetailerPrice(
    // // // //         viewingProduct.product_uid,
    // // // //         user.public_id,
    // // // //         newPrice
    // // // //       );
    // // // //       const qrText = `Product: ${viewingProduct.name}\nID: ${
    // // // //         viewingProduct.product_uid
    // // // //       }\nPrice: ₹${Number(newPrice).toFixed(2)}\nSold by: ${user.name}`;
    // // // //       setQrCodeValue(qrText);
    // // // //       alert("Price set and QR Code generated!");
    // // // //       loadData();
    // // // //     } catch (err) {
    // // // //       alert("Failed to set price.");
    // // // //     }
    // // // //   };

    // // // //   const closeModal = () => {
    // // // //     setViewingProduct(null);
    // // // //     setProductHistory([]);
    // // // //     setNewPrice("");
    // // // //     setQrCodeValue("");
    // // // //   };

    // // // //   return (
    // // // //     <div style={styles.page}>
    // // // //       <div style={styles.container}>
    // // // //         <h2 style={styles.title}>🏬 Retailer Dashboard</h2>

    // // // //         {/* ✅ Incoming Transfer Requests */}
    // // // //         <div style={styles.section}>
    // // // //           <h3 style={styles.subHeader}>Incoming Transfer Requests</h3>
    // // // //           {pendingRequests.length > 0 ? (
    // // // //             pendingRequests.map((req) => (
    // // // //               <div key={req.product_uid} style={styles.requestCard}>
    // // // //                 <div>
    // // // //                   <p style={styles.productName}>{req.name}</p>
    // // // //                   <p style={styles.detailsText}>
    // // // //                     <strong>Quantity:</strong> {req.quantity} units
    // // // //                   </p>
    // // // //                 </div>
    // // // //                 <div style={styles.buttonGroup}>
    // // // //                   <button
    // // // //                     style={styles.buttonReject}
    // // // //                     onClick={() =>
    // // // //                       handleRespondToRequest(req.product_uid, "REJECT")
    // // // //                     }
    // // // //                   >
    // // // //                     Reject
    // // // //                   </button>
    // // // //                   <button
    // // // //                     style={styles.buttonAccept}
    // // // //                     onClick={() =>
    // // // //                       handleRespondToRequest(req.product_uid, "ACCEPT")
    // // // //                     }
    // // // //                   >
    // // // //                     Accept
    // // // //                   </button>
    // // // //                 </div>
    // // // //               </div>
    // // // //             ))
    // // // //           ) : (
    // // // //             <p style={styles.emptyText}>
    // // // //               You have no pending transfer requests.
    // // // //             </p>
    // // // //           )}
    // // // //         </div>

    // // // //         {/* ✅ Product Inventory */}
    // // // //         <div style={styles.section}>
    // // // //           <h3 style={styles.subHeader}>Your Product Inventory</h3>
    // // // //           <div style={styles.tableContainer}>
    // // // //             <table style={styles.table}>
    // // // //               <thead>
    // // // //                 <tr>
    // // // //                   <th style={styles.th}>Product ID</th>
    // // // //                   <th style={styles.th}>Name</th>
    // // // //                   <th style={styles.th}>Quantity</th>
    // // // //                   <th style={styles.th}>Action</th>
    // // // //                 </tr>
    // // // //               </thead>
    // // // //               <tbody>
    // // // //                 {inventory.map((p) => (
    // // // //                   <tr key={p.product_uid}>
    // // // //                     <td style={styles.td}>{p.product_uid}</td>
    // // // //                     <td style={styles.td}>{p.name}</td>
    // // // //                     <td style={styles.td}>{p.quantity}</td>
    // // // //                     <td style={styles.td}>
    // // // //                       <button
    // // // //                         style={styles.buttonView}
    // // // //                         onClick={() => handleViewClick(p)}
    // // // //                       >
    // // // //                         View / Set Price
    // // // //                       </button>
    // // // //                     </td>
    // // // //                   </tr>
    // // // //                 ))}
    // // // //               </tbody>
    // // // //             </table>
    // // // //           </div>
    // // // //         </div>
    // // // //       </div>

    // // // //       {/* ✅ Modal for product view / QR generation */}
    // // // //       {viewingProduct && (
    // // // //         <div style={styles.modalOverlay}>
    // // // //           <div style={styles.modalContent}>
    // // // //             <button style={styles.closeButton} onClick={closeModal}>
    // // // //               ×
    // // // //             </button>
    // // // //             <h3 style={styles.modalTitle}>{viewingProduct.name}</h3>

    // // // //             <div style={styles.historySection}>
    // // // //               <h4>Product Journey:</h4>
    // // // //               {productHistory.map((act) => (
    // // // //                 <p key={act.id}>
    // // // //                   <strong>{act.action}:</strong> by {act.actor_id} on{" "}
    // // // //                   {new Date(act.created_at).toLocaleDateString()}
    // // // //                 </p>
    // // // //               ))}
    // // // //             </div>

    // // // //             {qrCodeValue ? (
    // // // //               <div style={styles.qrContainer}>
    // // // //                 <h4>Scan with Google Lens or Phone Camera</h4>
    // // // //                 <QRCode value={qrCodeValue} size={256} />
    // // // //                 <p style={styles.qrData}>
    // // // //                   {qrCodeValue.replace(/\n/g, ", ")}
    // // // //                 </p>
    // // // //               </div>
    // // // //             ) : (
    // // // //               <div style={styles.setPriceSection}>
    // // // //                 <h4>Set Final Price for Consumer:</h4>
    // // // //                 <div style={styles.inputGroup}>
    // // // //                   <span style={styles.currencySymbol}>₹</span>
    // // // //                   <input
    // // // //                     style={styles.priceInput}
    // // // //                     type="number"
    // // // //                     placeholder="e.g., 150.00"
    // // // //                     value={newPrice}
    // // // //                     onChange={(e) => setNewPrice(e.target.value)}
    // // // //                   />
    // // // //                   <button
    // // // //                     style={styles.buttonAccept}
    // // // //                     onClick={handleGenerateQR}
    // // // //                   >
    // // // //                     Generate QR Code
    // // // //                   </button>
    // // // //                 </div>
    // // // //               </div>
    // // // //             )}
    // // // //           </div>
    // // // //         </div>
    // // // //       )}
    // // // //     </div>
    // // // //   );
    // // // // };

    // // // // // --- STYLES ---
    // // // // const styles = {
    // // // //   page: {
    // // // //     background: "#f0f4f8",
    // // // //     minHeight: "calc(100vh - 70px)",
    // // // //     paddingTop: "20px",
    // // // //   },
    // // // //   container: {
    // // // //     maxWidth: 900,
    // // // //     margin: "40px auto",
    // // // //     padding: "20px",
    // // // //   },
    // // // //   title: {
    // // // //     color: "#8e44ad",
    // // // //     fontSize: "2.2rem",
    // // // //     fontWeight: 800,
    // // // //     textAlign: "center",
    // // // //     marginBottom: "30px",
    // // // //   },
    // // // //   section: {
    // // // //     background: "white",
    // // // //     borderRadius: "12px",
    // // // //     padding: "25px",
    // // // //     marginBottom: "25px",
    // // // //     boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    // // // //   },
    // // // //   tableContainer: { overflowX: "auto" },
    // // // //   table: { width: "100%", borderCollapse: "collapse" },
    // // // //   th: { textAlign: "left", padding: "10px", background: "#eee" },
    // // // //   td: { padding: "10px", borderBottom: "1px solid #ddd" },
    // // // //   buttonView: {
    // // // //     padding: "6px 12px",
    // // // //     background: "#2980b9",
    // // // //     color: "white",
    // // // //     border: "none",
    // // // //     borderRadius: "6px",
    // // // //     cursor: "pointer",
    // // // //   },

    // // // //   // ✅ Request styles
    // // // //   requestCard: {
    // // // //     display: "flex",
    // // // //     justifyContent: "space-between",
    // // // //     alignItems: "center",
    // // // //     padding: "15px",
    // // // //     marginBottom: "12px",
    // // // //     border: "1px solid #ddd",
    // // // //     borderRadius: "8px",
    // // // //     background: "#fafafa",
    // // // //   },
    // // // //   productName: { fontSize: "1.1rem", fontWeight: 600, marginBottom: "5px" },
    // // // //   detailsText: { fontSize: "0.95rem", color: "#555" },
    // // // //   buttonGroup: { display: "flex", gap: "10px" },
    // // // //   buttonReject: {
    // // // //     padding: "8px 14px",
    // // // //     fontSize: "0.9rem",
    // // // //     background: "#c0392b",
    // // // //     color: "white",
    // // // //     border: "none",
    // // // //     borderRadius: "6px",
    // // // //     cursor: "pointer",
    // // // //   },
    // // // //   buttonAccept: {
    // // // //     padding: "8px 14px",
    // // // //     fontSize: "0.9rem",
    // // // //     background: "#27ae60",
    // // // //     color: "white",
    // // // //     fontWeight: "600",
    // // // //     border: "none",
    // // // //     borderRadius: "6px",
    // // // //     cursor: "pointer",
    // // // //     transition: "background 0.2s ease",
    // // // //   },
    // // // //   emptyText: { fontSize: "0.95rem", color: "#666", marginTop: "10px" },

    // // // //   // ✅ Modal + QR
    // // // //   modalOverlay: {
    // // // //     position: "fixed",
    // // // //     top: 0,
    // // // //     left: 0,
    // // // //     right: 0,
    // // // //     bottom: 0,
    // // // //     backgroundColor: "rgba(0,0,0,0.5)",
    // // // //     display: "flex",
    // // // //     alignItems: "center",
    // // // //     justifyContent: "center",
    // // // //     zIndex: 1000,
    // // // //   },
    // // // //   modalContent: {
    // // // //     background: "white",
    // // // //     borderRadius: "12px",
    // // // //     padding: "20px",
    // // // //     width: "500px",
    // // // //     maxHeight: "80vh",
    // // // //     overflowY: "auto",
    // // // //     position: "relative",
    // // // //     boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    // // // //   },
    // // // //   closeButton: {
    // // // //     position: "absolute",
    // // // //     top: "10px",
    // // // //     right: "10px",
    // // // //     background: "none",
    // // // //     border: "none",
    // // // //     fontSize: "20px",
    // // // //     cursor: "pointer",
    // // // //   },
    // // // //   modalTitle: { marginBottom: "15px", fontSize: "1.5rem", fontWeight: "bold" },
    // // // //   historySection: {
    // // // //     marginBottom: "20px",
    // // // //     padding: "10px",
    // // // //     background: "#f9f9f9",
    // // // //     borderRadius: "8px",
    // // // //   },
    // // // //   setPriceSection: { marginTop: "20px" },
    // // // //   inputGroup: {
    // // // //     display: "flex",
    // // // //     alignItems: "center",
    // // // //     justifyContent: "center",
    // // // //     gap: "12px",
    // // // //     marginTop: "12px",
    // // // //   },
    // // // //   currencySymbol: {
    // // // //     fontWeight: "bold",
    // // // //     fontSize: "1.2rem",
    // // // //     color: "#333",
    // // // //   },
    // // // //   priceInput: {
    // // // //     width: "180px",
    // // // //     padding: "10px 12px",
    // // // //     fontSize: "1rem",
    // // // //     border: "1px solid #ccc",
    // // // //     borderRadius: "6px",
    // // // //   },
    // // // //   qrContainer: { textAlign: "center", marginTop: "20px" },
    // // // //   qrData: { marginTop: "10px", fontSize: "0.9rem", color: "#555" },
    // // // // };

    // // // // export default RetailerDashboard;

    // // // // import React, { useState, useEffect } from "react";
    // // // // import {
    // // // //   getProducts,
    // // // //   getPendingRetailerRequests,
    // // // //   respondToRetailerRequest,
    // // // //   getProductHistory,
    // // // //   setRetailerPrice,
    // // // // } from "../api";
    // // // // import QRCode from "qrcode.react";

    // // // // const RetailerDashboard = ({ user }) => {
    // // // //   const [inventory, setInventory] = useState([]);
    // // // //   const [pendingRequests, setPendingRequests] = useState([]);
    // // // //   const [viewingProduct, setViewingProduct] = useState(null);
    // // // //   const [productHistory, setProductHistory] = useState([]);
    // // // //   const [newPrice, setNewPrice] = useState("");
    // // // //   const [qrCodeValue, setQrCodeValue] = useState("");

    // // // //   const loadData = async () => {
    // // // //     if (user?.public_id) {
    // // // //       const inventoryData = await getProducts(user.public_id);
    // // // //       const requestsData = await getPendingRetailerRequests(user.public_id);
    // // // //       setInventory(Array.isArray(inventoryData) ? inventoryData : []);
    // // // //       setPendingRequests(Array.isArray(requestsData) ? requestsData : []);
    // // // //     }
    // // // //   };

    // // // //   useEffect(() => {
    // // // //     loadData();
    // // // //   }, [user]);

    // // // //   const handleRespondToRequest = async (productUid, decision) => {
    // // // //     await respondToRetailerRequest(productUid, user.public_id, decision);
    // // // //     alert(`Request successfully ${decision.toLowerCase()}ed!`);
    // // // //     loadData();
    // // // //   };

    // // // //   const handleViewClick = async (product) => {
    // // // //     const historyData = await getProductHistory(product.product_uid);
    // // // //     setProductHistory(Array.isArray(historyData) ? historyData : []);
    // // // //     setViewingProduct(product);
    // // // //   };

    // // // //   const handleGenerateQR = async () => {
    // // // //     if (!newPrice || isNaN(parseFloat(newPrice)) || parseFloat(newPrice) <= 0) {
    // // // //       return alert("Please enter a valid price.");
    // // // //     }
    // // // //     try {
    // // // //       await setRetailerPrice(
    // // // //         viewingProduct.product_uid,
    // // // //         user.public_id,
    // // // //         newPrice
    // // // //       );
    // // // //       const qrText = `Product: ${viewingProduct.name}\nID: ${
    // // // //         viewingProduct.product_uid
    // // // //       }\nPrice: ₹${Number(newPrice).toFixed(2)}\nSold by: ${user.name}`;
    // // // //       setQrCodeValue(qrText);
    // // // //       alert("Price set and QR Code generated!");
    // // // //       loadData();
    // // // //     } catch (err) {
    // // // //       alert("Failed to set price.");
    // // // //     }
    // // // //   };

    // // // //   const closeModal = () => {
    // // // //     setViewingProduct(null);
    // // // //     setProductHistory([]);
    // // // //     setNewPrice("");
    // // // //     setQrCodeValue("");
    // // // //   };

    // // // //   return (
    // // // //     <div style={styles.page}>
    // // // //       <div style={styles.container}>
    // // // //         <h2 style={styles.title}>🏬 Retailer Dashboard</h2>

    // // // //         <div style={styles.section}>
    // // // //           <h3 style={styles.subHeader}>Incoming Transfer Requests</h3>
    // // // //           {/* --- THIS SECTION HAS BEEN ADDED --- */}
    // // // //           {pendingRequests.length > 0 ? (
    // // // //             pendingRequests.map((req) => (
    // // // //               <div key={req.product_uid} style={styles.requestCard}>
    // // // //                 <div>
    // // // //                   <p style={styles.productName}>{req.name}</p>
    // // // //                   <p style={styles.detailsText}><strong>Quantity:</strong> {req.quantity} units</p>
    // // // //                 </div>
    // // // //                 <div style={styles.buttonGroup}>
    // // // //                   <button style={styles.buttonReject} onClick={() => handleRespondToRequest(req.product_uid, "REJECT")}>Reject</button>
    // // // //                   <button style={styles.buttonAccept} onClick={() => handleRespondToRequest(req.product_uid, "ACCEPT")}>Accept</button>
    // // // //                 </div>
    // // // //               </div>
    // // // //             ))
    // // // //           ) : (
    // // // //             <p style={styles.emptyText}>You have no pending transfer requests.</p>
    // // // //           )}
    // // // //         </div>

    // // // //         <div style={styles.section}>
    // // // //           <h3 style={styles.subHeader}>Your Product Inventory</h3>
    // // // //           <div style={styles.tableContainer}>
    // // // //             <table style={styles.table}>
    // // // //               <thead>
    // // // //                 <tr>
    // // // //                   <th style={styles.th}>Product ID</th>
    // // // //                   <th style={styles.th}>Name</th>
    // // // //                   <th style={styles.th}>Quantity</th>
    // // // //                   <th style={styles.th}>Action</th>
    // // // //                 </tr>
    // // // //               </thead>
    // // // //               <tbody>
    // // // //                 {inventory.map((p) => (
    // // // //                   <tr key={p.product_uid}>
    // // // //                     <td style={styles.td}>{p.product_uid}</td>
    // // // //                     <td style={styles.td}>{p.name}</td>
    // // // //                     <td style={styles.td}>{p.quantity}</td>
    // // // //                     <td style={styles.td}>
    // // // //                       <button style={styles.buttonView} onClick={() => handleViewClick(p)}>
    // // // //                         View / Set Price
    // // // //                       </button>
    // // // //                     </td>
    // // // //                   </tr>
    // // // //                 ))}
    // // // //               </tbody>
    // // // //             </table>
    // // // //           </div>
    // // // //         </div>
    // // // //       </div>

    // // // //       {viewingProduct && (
    // // // //         <div style={styles.modalOverlay}>
    // // // //           <div style={styles.modalContent}>
    // // // //             <button style={styles.closeButton} onClick={closeModal}>×</button>
    // // // //             <h3 style={styles.modalTitle}>{viewingProduct.name}</h3>

    // // // //             <div style={styles.historySection}>
    // // // //               <h4>Product Journey:</h4>
    // // // //               {productHistory.map((act) => (
    // // // //                  <div key={act.id} style={styles.historyItem}>
    // // // //                     <strong style={styles.historyAction}>{act.action.replace(/_/g, ' ')}:</strong>
    // // // //                     <span> by {act.actor_id} on {new Date(act.created_at).toLocaleDateString()}</span>
    // // // //                  </div>
    // // // //               ))}
    // // // //             </div>

    // // // //             {qrCodeValue ? (
    // // // //               <div style={styles.qrContainer}>
    // // // //                 <h4>Scan with Google Lens or Phone Camera</h4>
    // // // //                 <div style={styles.qrCodeWrapper}>
    // // // //                   <QRCode value={qrCodeValue} size={256} />
    // // // //                 </div>
    // // // //                 <p style={styles.qrData}>{qrCodeValue.replace(/\n/g, ", ")}</p>
    // // // //               </div>
    // // // //             ) : (
    // // // //               <div style={styles.setPriceSection}>
    // // // //                 <h4>Set Final Price for Consumer:</h4>
    // // // //                 <div style={styles.inputGroup}>
    // // // //                   <span style={styles.currencySymbol}>₹</span>
    // // // //                   <input
    // // // //                     style={styles.priceInput}
    // // // //                     type="number"
    // // // //                     placeholder="e.g., 150.00"
    // // // //                     value={newPrice}
    // // // //                     onChange={(e) => setNewPrice(e.target.value)}
    // // // //                   />
    // // // //                   <button style={styles.buttonGenerate} onClick={handleGenerateQR}>
    // // // //                     Generate QR Code
    // // // //                   </button>
    // // // //                 </div>
    // // // //               </div>
    // // // //             )}
    // // // //           </div>
    // // // //         </div>
    // // // //       )}
    // // // //     </div>
    // // // //   );
    // // // // };

    // // // // // --- YOUR STYLES HAVE BEEN REPLACED WITH THE NEW DESIGN ---
    // // // // const styles = {
    // // // //     page: { background: '#f0f4f8', minHeight: 'calc(100vh - 70px)', paddingTop: '20px', fontFamily: "'Segoe UI', sans-serif" },
    // // // //     container: { maxWidth: 900, margin: '40px auto', padding: '20px' },
    // // // //     title: { color: '#8e44ad', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
    // // // //     section: { background: 'white', borderRadius: '12px', padding: '30px', marginBottom: '25px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
    // // // //     subHeader: { color: '#8e44ad', fontWeight: 700, borderBottom: '2px solid #f0e6f6', paddingBottom: '15px', marginBottom: '20px', fontSize: '1.2rem' },
    // // // //     tableContainer: { overflowX: 'auto' },
    // // // //     table: { width: '100%', borderCollapse: 'collapse' },
    // // // //     th: { background: '#f5eef8', color: '#8e44ad', padding: '12px 15px', textAlign: 'left', fontWeight: 'bold' },
    // // // //     td: { padding: '15px', borderBottom: '1px solid #e0e0e0', verticalAlign: 'middle' },
    // // // //     buttonView: { background: '#3498db', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    // // // //     modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    // // // //     modalContent: { background: 'white', borderRadius: '12px', padding: '30px 40px', maxWidth: '600px', width: '90%', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' },
    // // // //     closeButton: { position: 'absolute', top: '15px', right: '20px', fontSize: '2rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#aaa', lineHeight: 1 },
    // // // //     modalTitle: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '25px', textAlign: 'center', color: '#8e44ad' },
    // // // //     historySection: { marginBottom: '25px' },
    // // // //     historyItem: { background: '#fafafa', border: '1px solid #eee', borderRadius: '8px', padding: '12px', marginBottom: '8px', fontSize: '0.95rem' },
    // // // //     historyAction: { color: '#333', textTransform: 'capitalize', fontWeight: '600' },
    // // // //     qrContainer: { textAlign: 'center', marginTop: '20px' },
    // // // //     qrCodeWrapper: { padding: '15px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', display: 'inline-block' },
    // // // //     qrData: { marginTop: '15px', fontSize: '0.9rem', color: '#555', background: '#f4f4f4', padding: '10px', borderRadius: '6px' },
    // // // //     setPriceSection: { marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #eee' },
    // // // //     inputGroup: { display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' },
    // // // //     currencySymbol: { fontWeight: 'bold', fontSize: '1.8rem', color: '#333' },
    // // // //     priceInput: { flex: 1, padding: '12px 15px', fontSize: '1.2rem', border: '2px solid #ccc', borderRadius: '8px', textAlign: 'center' },
    // // // //     buttonGenerate: { padding: '12px 25px', fontSize: '1rem', background: '#27ae60', color: 'white', fontWeight: '600', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    // // // //     requestCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px' },
    // // // //     productName: { fontWeight: 'bold', fontSize: '1.2rem', color: '#333' },
    // // // //     detailsText: { margin: '2px 0', color: '#555' },
    // // // //     buttonGroup: { display: 'flex', gap: '10px' },
    // // // //     buttonAccept: { background: '#27ae60', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    // // // //     buttonReject: { background: '#c0392b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    // // // //     emptyText: { textAlign: 'center', color: '#777', padding: '20px 0' },
    // // // // };

    // // // // export default RetailerDashboard;

    // // // import React, { useState, useEffect } from "react";
    // // // import { getProducts, getPendingRetailerRequests, respondToRetailerRequest, getProductHistory, setRetailerPrice } from "../api";
    // // // // import QRCode from "qrcode.react";
    // // // // import { QRCode } from "qrcode.react";
    // // // import QRCode from "react-qr-code"; // This now imports from the new, better library

    // // // const RetailerDashboard = ({ user }) => {
    // // //   const [inventory, setInventory] = useState([]);
    // // //   const [pendingRequests, setPendingRequests] = useState([]);
    // // //   const [viewingProduct, setViewingProduct] = useState(null);
    // // //   const [productHistory, setProductHistory] = useState([]);
    // // //   const [newPrice, setNewPrice] = useState("");
    // // //   const [qrCodeValue, setQrCodeValue] = useState("");

    // // //   const loadData = async () => {
    // // //     if (user?.public_id) {
    // // //       try {
    // // //         const inventoryData = await getProducts(user.public_id);
    // // //         const requestsData = await getPendingRetailerRequests(user.public_id);
    // // //         setInventory(Array.isArray(inventoryData) ? inventoryData : []);
    // // //         setPendingRequests(Array.isArray(requestsData) ? requestsData : []);
    // // //       } catch (err) {
    // // //         console.error("Failed to load data:", err);
    // // //       }
    // // //     }
    // // //   };

    // // //   useEffect(() => {
    // // //     loadData();
    // // //   }, [user]);

    // // //   const handleRespondToRequest = async (productUid, decision) => {
    // // //     try {
    // // //       await respondToRetailerRequest(productUid, user.public_id, decision);
    // // //       alert(`Request successfully ${decision.toLowerCase()}ed!`);
    // // //       loadData();
    // // //     } catch (err) {
    // // //       alert(`Failed to ${decision.toLowerCase()} request.`);
    // // //     }
    // // //   };

    // // //   const handleViewClick = async (product) => {
    // // //     try {
    // // //       const historyData = await getProductHistory(product.product_uid);
    // // //       setProductHistory(Array.isArray(historyData) ? historyData : []);
    // // //       setViewingProduct(product);
    // // //     } catch (err) {
    // // //       alert("Could not fetch product history.");
    // // //     }
    // // //   };

    // // //   const handleGenerateQR = async () => {
    // // //     if (!newPrice || isNaN(parseFloat(newPrice)) || parseFloat(newPrice) <= 0) {
    // // //       return alert("Please enter a valid price.");
    // // //     }
    // // //     try {
    // // //       await setRetailerPrice(viewingProduct.product_uid, user.public_id, newPrice);
    // // //       const qrText = `Product: ${viewingProduct.name}\nID: ${viewingProduct.product_uid}\nPrice: ₹${Number(newPrice).toFixed(2)}\nSold by: ${user.name}`;
    // // //       setQrCodeValue(qrText);
    // // //       alert("Price set and QR Code generated!");
    // // //       loadData();
    // // //     } catch (err) {
    // // //       alert("Failed to set price.");
    // // //     }
    // // //   };

    // // //   const closeModal = () => {
    // // //     setViewingProduct(null);
    // // //     setProductHistory([]);
    // // //     setNewPrice("");
    // // //     setQrCodeValue("");
    // // //   };

    // // //   return (
    // // //     <div style={styles.page}>
    // // //       <div style={styles.container}>
    // // //         <h2 style={styles.title}>🏬 Retailer Dashboard</h2>

    // // //         <div style={styles.section}>
    // // //           <h3 style={styles.subHeader}>Incoming Transfer Requests</h3>
    // // //           {pendingRequests.length > 0 ? (
    // // //             pendingRequests.map((req) => (
    // // //               <div key={req.product_uid} style={styles.requestCard}>
    // // //                 <div>
    // // //                   <p style={styles.productName}>{req.name}</p>
    // // //                   <p style={styles.detailsText}><strong>Quantity:</strong> {req.quantity} units</p>
    // // //                 </div>
    // // //                 <div style={styles.buttonGroup}>
    // // //                   <button style={styles.buttonReject} onClick={() => handleRespondToRequest(req.product_uid, 'REJECT')}>Reject</button>
    // // //                   <button style={styles.buttonAccept} onClick={() => handleRespondToRequest(req.product_uid, 'ACCEPT')}>Accept</button>
    // // //                 </div>
    // // //               </div>
    // // //             ))
    // // //           ) : (
    // // //             <p style={styles.emptyText}>You have no pending transfer requests.</p>
    // // //           )}
    // // //         </div>

    // // //         <div style={styles.section}>
    // // //           <h3 style={styles.subHeader}>Your Product Inventory</h3>
    // // //           <div style={styles.tableContainer}>
    // // //             <table style={styles.table}>
    // // //               <thead>
    // // //                 <tr>
    // // //                   <th style={styles.th}>Product ID</th>
    // // //                   <th style={styles.th}>Name</th>
    // // //                   <th style={styles.th}>Quantity</th>
    // // //                   <th style={styles.th}>Action</th>
    // // //                 </tr>
    // // //               </thead>
    // // //               <tbody>
    // // //                 {inventory.map((p) => (
    // // //                   <tr key={p.product_uid}>
    // // //                     <td style={styles.td}>{p.product_uid}</td>
    // // //                     <td style={styles.td}>{p.name}</td>
    // // //                     <td style={styles.td}>{p.quantity}</td>
    // // //                     <td style={styles.td}>
    // // //                       <button style={styles.buttonView} onClick={() => handleViewClick(p)}>
    // // //                         View / Set Price
    // // //                       </button>
    // // //                     </td>
    // // //                   </tr>
    // // //                 ))}
    // // //               </tbody>
    // // //             </table>
    // // //           </div>
    // // //         </div>
    // // //       </div>

    // // //       {viewingProduct && (
    // // //         <div style={styles.modalOverlay}>
    // // //           <div style={styles.modalContent}>
    // // //             <button style={styles.closeButton} onClick={closeModal}>×</button>
    // // //             <h3 style={styles.modalTitle}>{viewingProduct.name}</h3>

    // // //             <div style={styles.historySection}>
    // // //               <h4>Product Journey</h4>
    // // //               {productHistory.map((act) => (
    // // //                 <div key={act.id} style={styles.historyItem}>
    // // //                   <strong style={styles.historyAction}>{act.action.replace(/_/g, ' ')}:</strong>
    // // //                   <span> by {act.actor_id} on {new Date(act.created_at).toLocaleDateString()}</span>
    // // //                 </div>
    // // //               ))}
    // // //             </div>

    // // //             {qrCodeValue ? (
    // // //               <div style={styles.qrContainer}>
    // // //                 <h4>Scan with a Phone Camera</h4>
    // // //                 <div style={styles.qrCodeWrapper}>
    // // //                   <QRCode value={qrCodeValue} size={256} />
    // // //                 </div>
    // // //                 <p style={styles.qrData}>{qrCodeValue.replace(/\n/g, ", ")}</p>
    // // //               </div>
    // // //             ) : (
    // // //               <div style={styles.setPriceSection}>
    // // //                 <h4>Set Final Price for Consumer</h4>
    // // //                 <div style={styles.inputGroup}>
    // // //                   <span style={styles.currencySymbol}>₹</span>
    // // //                   <input
    // // //                     style={styles.priceInput}
    // // //                     type="number"
    // // //                     placeholder="e.g., 150.00"
    // // //                     value={newPrice}
    // // //                     onChange={(e) => setNewPrice(e.target.value)}
    // // //                   />
    // // //                   <button style={styles.buttonGenerate} onClick={handleGenerateQR}>
    // // //                     Generate QR Code
    // // //                   </button>
    // // //                 </div>
    // // //               </div>
    // // //             )}
    // // //           </div>
    // // //         </div>
    // // //       )}
    // // //     </div>
    // // //   );
    // // // };

    // // // // --- STYLES ---
    // // // const styles = {
    // // //     page: { background: '#f0f4f8', minHeight: 'calc(100vh - 70px)', paddingTop: '20px', fontFamily: "'Segoe UI', sans-serif" },
    // // //     container: { maxWidth: 900, margin: '40px auto', padding: '20px' },
    // // //     title: { color: '#8e44ad', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
    // // //     section: { background: 'white', borderRadius: '12px', padding: '30px', marginBottom: '25px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
    // // //     subHeader: { color: '#8e44ad', fontWeight: 700, borderBottom: '2px solid #f0e6f6', paddingBottom: '15px', marginBottom: '20px', fontSize: '1.2rem' },
    // // //     tableContainer: { overflowX: 'auto' },
    // // //     table: { width: '100%', borderCollapse: 'collapse' },
    // // //     th: { background: '#f5eef8', color: '#8e44ad', padding: '12px 15px', textAlign: 'left', fontWeight: 'bold' },
    // // //     td: { padding: '15px', borderBottom: '1px solid #e0e0e0', verticalAlign: 'middle' },
    // // //     buttonView: { background: '#3498db', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    // // //     modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    // // //     modalContent: { background: 'white', borderRadius: '12px', padding: '30px 40px', maxWidth: '600px', width: '90%', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' },
    // // //     closeButton: { position: 'absolute', top: '15px', right: '20px', fontSize: '2rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#aaa', lineHeight: 1 },
    // // //     modalTitle: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '25px', textAlign: 'center', color: '#8e44ad' },
    // // //     historySection: { marginBottom: '25px' },
    // // //     historyItem: { background: '#fafafa', border: '1px solid #eee', borderRadius: '8px', padding: '12px', marginBottom: '8px', fontSize: '0.95rem' },
    // // //     historyAction: { color: '#333', textTransform: 'capitalize', fontWeight: '600' },
    // // //     qrContainer: { textAlign: 'center', marginTop: '20px' },
    // // //     qrCodeWrapper: { padding: '15px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', display: 'inline-block' },
    // // //     qrData: { marginTop: '15px', fontSize: '0.9rem', color: '#555', background: '#f4f4f4', padding: '10px', borderRadius: '6px' },
    // // //     setPriceSection: { marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #eee' },
    // // //     inputGroup: { display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' },
    // // //     currencySymbol: { fontWeight: 'bold', fontSize: '1.8rem', color: '#333' },
    // // //     priceInput: { flex: 1, padding: '12px 15px', fontSize: '1.2rem', border: '2px solid #ccc', borderRadius: '8px', textAlign: 'center' },
    // // //     buttonGenerate: { padding: '12px 25px', fontSize: '1rem', background: '#27ae60', color: 'white', fontWeight: '600', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    // // //     requestCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px' },
    // // //     productName: { fontWeight: 'bold', fontSize: '1.2rem', color: '#333' },
    // // //     detailsText: { margin: '2px 0', color: '#555' },
    // // //     buttonGroup: { display: 'flex', gap: '10px' },
    // // //     buttonAccept: { background: '#27ae60', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    // // //     buttonReject: { background: '#c0392b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    // // //     emptyText: { textAlign: 'center', color: '#777', padding: '20px 0' },
    // // // };

    // // // export default RetailerDashboard;


    // // import React, { useState, useEffect, useRef } from "react";
    // // import { 
    // //   getProducts, 
    // //   getPendingRetailerRequests, 
    // //   respondToRetailerRequest, 
    // //   getProductHistory, 
    // //   setRetailerPrice 
    // // } from "../api";
    // // import QRCode from "react-qr-code"; // ✅ using react-qr-code

    // // const RetailerDashboard = ({ user }) => {
    // //   const [inventory, setInventory] = useState([]);
    // //   const [pendingRequests, setPendingRequests] = useState([]);
    // //   const [viewingProduct, setViewingProduct] = useState(null);
    // //   const [productHistory, setProductHistory] = useState([]);
    // //   const [newPrice, setNewPrice] = useState("");
    // //   const [qrCodeValue, setQrCodeValue] = useState("");
    // //   const qrRef = useRef(); // ref to capture QRCode

    // //   const loadData = async () => {
    // //     if (user?.public_id) {
    // //       try {
    // //         const inventoryData = await getProducts(user.public_id);
    // //         const requestsData = await getPendingRetailerRequests(user.public_id);
    // //         setInventory(Array.isArray(inventoryData) ? inventoryData : []);
    // //         setPendingRequests(Array.isArray(requestsData) ? requestsData : []);
    // //       } catch (err) {
    // //         console.error("Failed to load data:", err);
    // //       }
    // //     }
    // //   };

    // //   useEffect(() => {
    // //     loadData();
    // //   }, [user]);

    // //   const handleRespondToRequest = async (productUid, decision) => {
    // //     try {
    // //       await respondToRetailerRequest(productUid, user.public_id, decision);
    // //       alert(`Request successfully ${decision.toLowerCase()}ed!`);
    // //       loadData();
    // //     } catch (err) {
    // //       alert(`Failed to ${decision.toLowerCase()} request.`);
    // //     }
    // //   };

    // //   const handleViewClick = async (product) => {
    // //     try {
    // //       const historyData = await getProductHistory(product.product_uid);
    // //       setProductHistory(Array.isArray(historyData) ? historyData : []);
    // //       setViewingProduct(product);
    // //     } catch (err) {
    // //       alert("Could not fetch product history.");
    // //     }
    // //   };

    // //   const handleGenerateQR = async () => {
    // //     if (!newPrice || isNaN(parseFloat(newPrice)) || parseFloat(newPrice) <= 0) {
    // //       return alert("Please enter a valid price.");
    // //     }
    // //     try {
    // //       await setRetailerPrice(viewingProduct.product_uid, user.public_id, newPrice);
    // //       const qrText = `Product: ${viewingProduct.name}\nID: ${viewingProduct.product_uid}\nPrice: ₹${Number(newPrice).toFixed(2)}\nSold by: ${user.name}`;
    // //       setQrCodeValue(qrText);
    // //       alert("Price set and QR Code generated!");
    // //       loadData();
    // //     } catch (err) {
    // //       alert("Failed to set price.");
    // //     }
    // //   };

    // //   const handleDownloadQR = () => {
    // //     const svg = qrRef.current.querySelector("svg");
    // //     if (!svg) return;

    // //     const svgData = new XMLSerializer().serializeToString(svg);
    // //     const canvas = document.createElement("canvas");
    // //     const ctx = canvas.getContext("2d");
    // //     const img = new Image();

    // //     const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    // //     const url = URL.createObjectURL(svgBlob);

    // //     img.onload = () => {
    // //       canvas.width = img.width;
    // //       canvas.height = img.height;
    // //       ctx.drawImage(img, 0, 0);
    // //       URL.revokeObjectURL(url);

    // //       const imgURI = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    // //       const a = document.createElement("a");
    // //       a.setAttribute("download", `${viewingProduct?.name || "qr-code"}.png`);
    // //       a.setAttribute("href", imgURI);
    // //       a.click();
    // //     };
    // //     img.src = url;
    // //   };

    // //   const closeModal = () => {
    // //     setViewingProduct(null);
    // //     setProductHistory([]);
    // //     setNewPrice("");
    // //     setQrCodeValue("");
    // //   };

    // //   return (
    // //     <div style={styles.page}>
    // //       <div style={styles.container}>
    // //         <h2 style={styles.title}>🏬 Retailer Dashboard</h2>

    // //         {/* Pending Requests */}
    // //         <div style={styles.section}>
    // //           <h3 style={styles.subHeader}>Incoming Transfer Requests</h3>
    // //           {pendingRequests.length > 0 ? (
    // //             pendingRequests.map((req) => (
    // //               <div key={req.product_uid} style={styles.requestCard}>
    // //                 <div>
    // //                   <p style={styles.productName}>{req.name}</p>
    // //                   <p style={styles.detailsText}><strong>Quantity:</strong> {req.quantity} units</p>
    // //                 </div>
    // //                 <div style={styles.buttonGroup}>
    // //                   <button style={styles.buttonReject} onClick={() => handleRespondToRequest(req.product_uid, 'REJECT')}>Reject</button>
    // //                   <button style={styles.buttonAccept} onClick={() => handleRespondToRequest(req.product_uid, 'ACCEPT')}>Accept</button>
    // //                 </div>
    // //               </div>
    // //             ))
    // //           ) : (
    // //             <p style={styles.emptyText}>You have no pending transfer requests.</p>
    // //           )}
    // //         </div>

    // //         {/* Inventory */}
    // //         <div style={styles.section}>
    // //           <h3 style={styles.subHeader}>Your Product Inventory</h3>
    // //           <div style={styles.tableContainer}>
    // //             <table style={styles.table}>
    // //               <thead>
    // //                 <tr>
    // //                   <th style={styles.th}>Product ID</th>
    // //                   <th style={styles.th}>Name</th>
    // //                   <th style={styles.th}>Quantity</th>
    // //                   <th style={styles.th}>Action</th>
    // //                 </tr>
    // //               </thead>
    // //               <tbody>
    // //                 {inventory.map((p) => (
    // //                   <tr key={p.product_uid}>
    // //                     <td style={styles.td}>{p.product_uid}</td>
    // //                     <td style={styles.td}>{p.name}</td>
    // //                     <td style={styles.td}>{p.quantity}</td>
    // //                     <td style={styles.td}>
    // //                       <button style={styles.buttonView} onClick={() => handleViewClick(p)}>
    // //                         View / Set Price
    // //                       </button>
    // //                     </td>
    // //                   </tr>
    // //                 ))}
    // //               </tbody>
    // //             </table>
    // //           </div>
    // //         </div>
    // //       </div>

    // //       {/* Modal */}
    // //       {viewingProduct && (
    // //         <div style={styles.modalOverlay}>
    // //           <div style={styles.modalContent}>
    // //             <button style={styles.closeButton} onClick={closeModal}>×</button>
    // //             <h3 style={styles.modalTitle}>{viewingProduct.name}</h3>

    // //             {/* Product History */}
    // //             <div style={styles.historySection}>
    // //               <h4>Product Journey</h4>
    // //               {productHistory.map((act) => (
    // //                 <div key={act.id} style={styles.historyItem}>
    // //                   <strong style={styles.historyAction}>{act.action.replace(/_/g, ' ')}:</strong>
    // //                   <span> by {act.actor_id} on {new Date(act.created_at).toLocaleDateString()}</span>
    // //                 </div>
    // //               ))}
    // //             </div>

    // //             {/* QR Code or Price Input */}
    // //             {qrCodeValue ? (
    // //               <div style={styles.qrContainer}>
    // //                 <h4>Scan with a Phone Camera</h4>
    // //                 <div ref={qrRef} style={styles.qrCodeWrapper}>
    // //                   <QRCode value={qrCodeValue} size={256} />
    // //                 </div>
    // //                 <p style={styles.qrData}>{qrCodeValue.replace(/\n/g, ", ")}</p>
    // //                 <button style={styles.buttonGenerate} onClick={handleDownloadQR}>
    // //                   ⬇️ Download QR Code
    // //                 </button>
    // //               </div>
    // //             ) : (
    // //               <div style={styles.setPriceSection}>
    // //                 <h4>Set Final Price for Consumer</h4>
    // //                 <div style={styles.inputGroup}>
    // //                   <span style={styles.currencySymbol}>₹</span>
    // //                   <input
    // //                     style={styles.priceInput}
    // //                     type="number"
    // //                     placeholder="e.g., 150.00"
    // //                     value={newPrice}
    // //                     onChange={(e) => setNewPrice(e.target.value)}
    // //                   />
    // //                   <button style={styles.buttonGenerate} onClick={handleGenerateQR}>
    // //                     Generate QR Code
    // //                   </button>
    // //                 </div>
    // //               </div>
    // //             )}
    // //           </div>
    // //         </div>
    // //       )}
    // //     </div>
    // //   );
    // // };

    // // // --- STYLES ---
    // // const styles = {
    // //     page: { background: '#f0f4f8', minHeight: 'calc(100vh - 70px)', paddingTop: '20px', fontFamily: "'Segoe UI', sans-serif" },
    // //     container: { maxWidth: 900, margin: '40px auto', padding: '20px' },
    // //     title: { color: '#8e44ad', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
    // //     section: { background: 'white', borderRadius: '12px', padding: '30px', marginBottom: '25px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
    // //     subHeader: { color: '#8e44ad', fontWeight: 700, borderBottom: '2px solid #f0e6f6', paddingBottom: '15px', marginBottom: '20px', fontSize: '1.2rem' },
    // //     tableContainer: { overflowX: 'auto' },
    // //     table: { width: '100%', borderCollapse: 'collapse' },
    // //     th: { background: '#f5eef8', color: '#8e44ad', padding: '12px 15px', textAlign: 'left', fontWeight: 'bold' },
    // //     td: { padding: '15px', borderBottom: '1px solid #e0e0e0', verticalAlign: 'middle' },
    // //     buttonView: { background: '#3498db', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    // //     modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    // //     modalContent: { background: 'white', borderRadius: '12px', padding: '30px 40px', maxWidth: '600px', width: '90%', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' },
    // //     closeButton: { position: 'absolute', top: '15px', right: '20px', fontSize: '2rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#aaa', lineHeight: 1 },
    // //     modalTitle: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '25px', textAlign: 'center', color: '#8e44ad' },
    // //     historySection: { marginBottom: '25px' },
    // //     historyItem: { background: '#fafafa', border: '1px solid #eee', borderRadius: '8px', padding: '12px', marginBottom: '8px', fontSize: '0.95rem' },
    // //     historyAction: { color: '#333', textTransform: 'capitalize', fontWeight: '600' },
    // //     qrContainer: { textAlign: 'center', marginTop: '20px' },
    // //     qrCodeWrapper: { padding: '15px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', display: 'inline-block' },
    // //     qrData: { marginTop: '15px', fontSize: '0.9rem', color: '#555', background: '#f4f4f4', padding: '10px', borderRadius: '6px' },
    // //     setPriceSection: { marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #eee' },
    // //     inputGroup: { display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' },
    // //     currencySymbol: { fontWeight: 'bold', fontSize: '1.8rem', color: '#333' },
    // //     priceInput: { flex: 1, padding: '12px 15px', fontSize: '1.2rem', border: '2px solid #ccc', borderRadius: '8px', textAlign: 'center' },
    // //     buttonGenerate: { padding: '12px 25px', fontSize: '1rem', background: '#27ae60', color: 'white', fontWeight: '600', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    // //     requestCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px' },
    // //     productName: { fontWeight: 'bold', fontSize: '1.2rem', color: '#333' },
    // //     detailsText: { margin: '2px 0', color: '#555' },
    // //     buttonGroup: { display: 'flex', gap: '10px' },
    // //     buttonAccept: { background: '#27ae60', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    // //     buttonReject: { background: '#c0392b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    // //     emptyText: { textAlign: 'center', color: '#777', padding: '20px 0' },
    // // };

    // // export default RetailerDashboard;

    // import React, { useState, useEffect, useRef } from "react";
    // import { 
    //   getProducts, 
    //   getPendingRetailerRequests, 
    //   respondToRetailerRequest, 
    //   getProductHistory, 
    //   setRetailerPrice 
    // } from "../api";
    // import QRCode from "react-qr-code";

    // const RetailerDashboard = ({ user }) => {
    //   const [inventory, setInventory] = useState([]);
    //   const [pendingRequests, setPendingRequests] = useState([]);
    //   const [viewingProduct, setViewingProduct] = useState(null);
    //   const [productHistory, setProductHistory] = useState([]);
    //   const [newPrice, setNewPrice] = useState("");
    //   const [qrCodeValue, setQrCodeValue] = useState("");
    //   const qrRef = useRef(null); // Ref for QR code wrapper

    //   const loadData = async () => {
    //     if (user?.public_id) {
    //       try {
    //         const inventoryData = await getProducts(user.public_id);
    //         const requestsData = await getPendingRetailerRequests(user.public_id);
    //         setInventory(Array.isArray(inventoryData) ? inventoryData : []);
    //         setPendingRequests(Array.isArray(requestsData) ? requestsData : []);
    //       } catch (err) {
    //         console.error("Failed to load data:", err);
    //       }
    //     }
    //   };

    //   useEffect(() => {
    //     loadData();
    //   }, [user]);

    //   const handleRespondToRequest = async (productUid, decision) => {
    //     try {
    //       await respondToRetailerRequest(productUid, user.public_id, decision);
    //       alert(`Request successfully ${decision.toLowerCase()}ed!`);
    //       loadData();
    //     } catch (err) {
    //       alert(`Failed to ${decision.toLowerCase()} request.`);
    //     }
    //   };

    //   const handleViewClick = async (product) => {
    //     try {
    //       const historyData = await getProductHistory(product.product_uid);
    //       setProductHistory(Array.isArray(historyData) ? historyData : []);
    //       setViewingProduct(product);
    //     } catch (err) {
    //       alert("Could not fetch product history.");
    //     }
    //   };

    //   const handleGenerateQR = async () => {
    //     if (!newPrice || isNaN(parseFloat(newPrice)) || parseFloat(newPrice) <= 0) {
    //       return alert("Please enter a valid price.");
    //     }
    //     try {
    //       await setRetailerPrice(viewingProduct.product_uid, user.public_id, newPrice);
    //       const qrText = `Product: ${viewingProduct.name}\nID: ${viewingProduct.product_uid}\nPrice: ₹${Number(newPrice).toFixed(2)}\nSold by: ${user.name}`;
    //       setQrCodeValue(qrText);
    //       alert("Price set and QR Code generated!");
    //       loadData();
    //     } catch (err) {
    //       alert("Failed to set price.");
    //     }
    //   };

    //   const handleDownloadQR = () => {
    //     const svg = qrRef.current.querySelector("svg");
    //     if (!svg) return;

    //     const svgData = new XMLSerializer().serializeToString(svg);
    //     const canvas = document.createElement("canvas");
    //     const ctx = canvas.getContext("2d");
    //     const img = new Image();

    //     const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    //     const url = URL.createObjectURL(svgBlob);

    //     img.onload = () => {
    //       canvas.width = img.width;
    //       canvas.height = img.height;
    //       ctx.drawImage(img, 0, 0);
    //       URL.revokeObjectURL(url);

    //       const imgURI = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    //       const a = document.createElement("a");
    //       a.setAttribute("download", `${viewingProduct?.name || "qr-code"}.png`);
    //       a.setAttribute("href", imgURI);
    //       a.click();
    //     };
    //     img.src = url;
    //   };

    //   const closeModal = () => {
    //     setViewingProduct(null);
    //     setProductHistory([]);
    //     setNewPrice("");
    //     setQrCodeValue("");
    //   };

    //   return (
    //     <div style={styles.page}>
    //       <div style={styles.container}>
    //         <h2 style={styles.title}>🏬 Retailer Dashboard</h2>

    //         {/* Pending Requests */}
    //         <div style={styles.section}>
    //           <h3 style={styles.subHeader}>Incoming Transfer Requests</h3>
    //           {pendingRequests.length > 0 ? (
    //             pendingRequests.map((req) => (
    //               <div key={req.product_uid} style={styles.requestCard}>
    //                 <div>
    //                   <p style={styles.productName}>{req.name}</p>
    //                   <p style={styles.detailsText}><strong>Quantity:</strong> {req.quantity} units</p>
    //                 </div>
    //                 <div style={styles.buttonGroup}>
    //                   <button style={styles.buttonReject} onClick={() => handleRespondToRequest(req.product_uid, 'REJECT')}>Reject</button>
    //                   <button style={styles.buttonAccept} onClick={() => handleRespondToRequest(req.product_uid, 'ACCEPT')}>Accept</button>
    //                 </div>
    //               </div>
    //             ))
    //           ) : (
    //             <p style={styles.emptyText}>You have no pending transfer requests.</p>
    //           )}
    //         </div>

    //         {/* Inventory */}
    //         <div style={styles.section}>
    //           <h3 style={styles.subHeader}>Your Product Inventory</h3>
    //           <div style={styles.tableContainer}>
    //             <table style={styles.table}>
    //               <thead>
    //                 <tr>
    //                   <th style={styles.th}>Product ID</th>
    //                   <th style={styles.th}>Name</th>
    //                   <th style={styles.th}>Quantity</th>
    //                   <th style={styles.th}>Action</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {inventory.map((p) => (
    //                   <tr key={p.product_uid}>
    //                     <td style={styles.td}>{p.product_uid}</td>
    //                     <td style={styles.td}>{p.name}</td>
    //                     <td style={styles.td}>{p.quantity}</td>
    //                     <td style={styles.td}>
    //                       <button style={styles.buttonView} onClick={() => handleViewClick(p)}>
    //                         View / Set Price
    //                       </button>
    //                     </td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //             </table>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Modal */}
    //       {viewingProduct && (
    //         <div style={styles.modalOverlay}>
    //           <div style={styles.modalContent}>
    //             <button style={styles.closeButton} onClick={closeModal}>×</button>
    //             <h3 style={styles.modalTitle}>{viewingProduct.name}</h3>

    //             {/* Product History */}
    //             <div style={styles.historySection}>
    //               <h4>Product Journey</h4>
    //               {productHistory.map((act) => (
    //                 <div key={act.id} style={styles.historyItem}>
    //                   <strong style={styles.historyAction}>{act.action.replace(/_/g, ' ')}:</strong>
    //                   <span> by {act.actor_id} on {new Date(act.created_at).toLocaleDateString()}</span>
    //                 </div>
    //               ))}
    //             </div>

    //             {/* QR Code or Price Input */}
    //             {qrCodeValue ? (
    //               <div style={styles.qrContainer}>
    //                 <h4>Scan with a Phone Camera</h4>
    //                 <div ref={qrRef} style={styles.qrCodeWrapper}>
    //                   <QRCode value={qrCodeValue} size={256} />
    //                 </div>
    //                 <p style={styles.qrData}>{qrCodeValue.replace(/\n/g, ", ")}</p>
    //                 <button style={styles.buttonGenerate} onClick={handleDownloadQR}>
    //                   ⬇️ Download QR Code
    //                 </button>
    //               </div>
    //             ) : (
    //               <div style={styles.setPriceSection}>
    //                 <h4>Set Final Price for Consumer</h4>
    //                 <div style={styles.inputGroup}>
    //                   <span style={styles.currencySymbol}>₹</span>
    //                   <input
    //                     style={styles.priceInput}
    //                     type="number"
    //                     placeholder="e.g., 150.00"
    //                     value={newPrice}
    //                     onChange={(e) => setNewPrice(e.target.value)}
    //                   />
    //                   <button style={styles.buttonGenerate} onClick={handleGenerateQR}>
    //                     Generate QR Code
    //                   </button>
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   );
    // };

    // // --- STYLES (unchanged) ---
    // const styles = {
    //   page: { background: '#f0f4f8', minHeight: 'calc(100vh - 70px)', paddingTop: '20px', fontFamily: "'Segoe UI', sans-serif" },
    //   container: { maxWidth: 900, margin: '40px auto', padding: '20px' },
    //   title: { color: '#8e44ad', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
    //   section: { background: 'white', borderRadius: '12px', padding: '30px', marginBottom: '25px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
    //   subHeader: { color: '#8e44ad', fontWeight: 700, borderBottom: '2px solid #f0e6f6', paddingBottom: '15px', marginBottom: '20px', fontSize: '1.2rem' },
    //   tableContainer: { overflowX: 'auto' },
    //   table: { width: '100%', borderCollapse: 'collapse' },
    //   th: { background: '#f5eef8', color: '#8e44ad', padding: '12px 15px', textAlign: 'left', fontWeight: 'bold' },
    //   td: { padding: '15px', borderBottom: '1px solid #e0e0e0', verticalAlign: 'middle' },
    //   buttonView: { background: '#3498db', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    //   modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    //   modalContent: { background: 'white', borderRadius: '12px', padding: '30px 40px', maxWidth: '600px', width: '90%', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' },
    //   closeButton: { position: 'absolute', top: '15px', right: '20px', fontSize: '2rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#aaa', lineHeight: 1 },
    //   modalTitle: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '25px', textAlign: 'center', color: '#8e44ad' },
    //   historySection: { marginBottom: '25px' },
    //   historyItem: { background: '#fafafa', border: '1px solid #eee', borderRadius: '8px', padding: '12px', marginBottom: '8px', fontSize: '0.95rem' },
    //   historyAction: { color: '#333', textTransform: 'capitalize', fontWeight: '600' },
    //   qrContainer: { textAlign: 'center', marginTop: '20px' },
    //   qrCodeWrapper: { padding: '15px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', display: 'inline-block' },
    //   qrData: { marginTop: '15px', fontSize: '0.9rem', color: '#555', background: '#f4f4f4', padding: '10px', borderRadius: '6px' },
    //   setPriceSection: { marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #eee' },
    //   inputGroup: { display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' },
    //   currencySymbol: { fontWeight: 'bold', fontSize: '1.8rem', color: '#333' },
    //   priceInput: { flex: 1, padding: '12px 15px', fontSize: '1.2rem', border: '2px solid #ccc', borderRadius: '8px', textAlign: 'center' },
    //   buttonGenerate: { padding: '12px 25px', fontSize: '1rem', background: '#27ae60', color: 'white', fontWeight: '600', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    //   requestCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px' },
    //   productName: { fontWeight: 'bold', fontSize: '1.2rem', color: '#333' },
    //   detailsText: { margin: '2px 0', color: '#555' },
    //   buttonGroup: { display: 'flex', gap: '10px' },
    //   buttonAccept: { background: '#27ae60', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    //   buttonReject: { background: '#c0392b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    //   emptyText: { textAlign: 'center', color: '#777', padding: '20px 0' },
    // };

    // export default RetailerDashboard;
    // CORRECT

    // import React, { useState, useEffect, useRef } from "react";
    // import { 
    //   getProducts, 
    //   getPendingRetailerRequests, 
    //   respondToRetailerRequest, 
    //   getProductHistory, 
    //   setRetailerPrice 
    // } from "../api";
    // import QRCode from "react-qr-code";

    // const RetailerDashboard = ({ user }) => {
    //   const [inventory, setInventory] = useState([]);
    //   const [pendingRequests, setPendingRequests] = useState([]);
    //   const [viewingProduct, setViewingProduct] = useState(null);
    //   const [productHistory, setProductHistory] = useState([]);
    //   const [newPrice, setNewPrice] = useState("");
    //   const [qrCodeValue, setQrCodeValue] = useState("");
    //   const qrRef = useRef(null); // Ref for QR code wrapper

    //   const loadData = async () => {
    //     if (user?.public_id) {
    //       try {
    //         const inventoryData = await getProducts(user.public_id);
    //         const requestsData = await getPendingRetailerRequests(user.public_id);
    //         setInventory(Array.isArray(inventoryData) ? inventoryData : []);
    //         setPendingRequests(Array.isArray(requestsData) ? requestsData : []);
    //       } catch (err) {
    //         console.error("Failed to load data:", err);
    //       }
    //     }
    //   };

    //   useEffect(() => {
    //     loadData();
    //   }, [user]);

    //   const handleRespondToRequest = async (productUid, decision) => {
    //     try {
    //       await respondToRetailerRequest(productUid, user.public_id, decision);
    //       alert(`Request successfully ${decision.toLowerCase()}ed!`);
    //       loadData();
    //     } catch (err) {
    //       alert(`Failed to ${decision.toLowerCase()} request.`);
    //     }
    //   };

    //   const handleViewClick = async (product) => {
    //     try {
    //       const historyData = await getProductHistory(product.product_uid);
    //       setProductHistory(Array.isArray(historyData) ? historyData : []);
    //       setViewingProduct(product);
    //     } catch (err) {
    //       alert("Could not fetch product history.");
    //     }
    //   };

    //   const handleGenerateQR = async () => {
    //     if (!newPrice || isNaN(parseFloat(newPrice)) || parseFloat(newPrice) <= 0) {
    //       return alert("Please enter a valid price.");
    //     }
    //     try {
    //       await setRetailerPrice(viewingProduct.product_uid, user.public_id, newPrice);
    //       const qrText = `Product: ${viewingProduct.name}\nID: ${viewingProduct.product_uid}\nPrice: ₹${Number(newPrice).toFixed(2)}\nSold by: ${user.name}`;
    //       setQrCodeValue(qrText);
    //       alert("Price set and QR Code generated!");
    //       loadData();
    //     } catch (err) {
    //       alert("Failed to set price.");
    //     }
    //   };

    //   const handleDownloadQR = () => {
    //     const svg = qrRef.current.querySelector("svg");
    //     if (!svg) return;

    //     const svgData = new XMLSerializer().serializeToString(svg);
    //     const canvas = document.createElement("canvas");
    //     const ctx = canvas.getContext("2d");
    //     const img = new Image();

    //     const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    //     const url = URL.createObjectURL(svgBlob);

    //     img.onload = () => {
    //       canvas.width = img.width;
    //       canvas.height = img.height;
    //       ctx.drawImage(img, 0, 0);
    //       URL.revokeObjectURL(url);

    //       const imgURI = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    //       const a = document.createElement("a");
    //       a.setAttribute("download", `${viewingProduct?.name || "qr-code"}.png`);
    //       a.setAttribute("href", imgURI);
    //       a.click();
    //     };
    //     img.src = url;
    //   };

    //   const closeModal = () => {
    //     setViewingProduct(null);
    //     setProductHistory([]);
    //     setNewPrice("");
    //     setQrCodeValue("");
    //   };

    //   return (
    //     <div style={styles.page}>
    //       <div style={styles.container}>
    //         <h2 style={styles.title}>🏬 Retailer Dashboard</h2>

    //         {/* Pending Requests */}
    //         <div style={styles.section}>
    //           <h3 style={styles.subHeader}>Incoming Transfer Requests</h3>
    //           {pendingRequests.length > 0 ? (
    //             pendingRequests.map((req) => (
    //               <div key={req.product_uid} style={styles.requestCard}>
    //                 <div>
    //                   <p style={styles.productName}>{req.name}</p>
    //                   <p style={styles.detailsText}><strong>Quantity:</strong> {req.quantity} units</p>
    //                 </div>
    //                 <div style={styles.buttonGroup}>
    //                   <button style={styles.buttonReject} onClick={() => handleRespondToRequest(req.product_uid, 'REJECT')}>Reject</button>
    //                   <button style={styles.buttonAccept} onClick={() => handleRespondToRequest(req.product_uid, 'ACCEPT')}>Accept</button>
    //                 </div>
    //               </div>
    //             ))
    //           ) : (
    //             <p style={styles.emptyText}>You have no pending transfer requests.</p>
    //           )}
    //         </div>

    //         {/* Inventory */}
    //         <div style={styles.section}>
    //           <h3 style={styles.subHeader}>Your Product Inventory</h3>
    //           <div style={styles.tableContainer}>
    //             <table style={styles.table}>
    //               <thead>
    //                 <tr>
    //                   <th style={styles.th}>Product ID</th>
    //                   <th style={styles.th}>Name</th>
    //                   <th style={styles.th}>Quantity</th>
    //                   <th style={styles.th}>Action</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {inventory.map((p) => (
    //                   <tr key={p.product_uid}>
    //                     <td style={styles.td}>{p.product_uid}</td>
    //                     <td style={styles.td}>{p.name}</td>
    //                     <td style={styles.td}>{p.quantity}</td>
    //                     <td style={styles.td}>
    //                       <button style={styles.buttonView} onClick={() => handleViewClick(p)}>
    //                         View / Set Price
    //                       </button>
    //                     </td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //             </table>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Modal */}
    //       {viewingProduct && (
    //         <div style={styles.modalOverlay}>
    //           <div style={styles.modalContent}>
    //             <button style={styles.closeButton} onClick={closeModal}>×</button>
    //             <h3 style={styles.modalTitle}>{viewingProduct.name}</h3>

    //             {/* Product History */}
    //             <div style={styles.historySection}>
    //               <h4>Product Journey</h4>
    //               {productHistory.map((act) => (
    //                 <div key={act.id} style={styles.historyItem}>
    //                   <strong style={styles.historyAction}>{act.action.replace(/_/g, ' ')}:</strong>
    //                   <span> by {act.actor_id} on {new Date(act.created_at).toLocaleDateString()}</span>
    //                 </div>
    //               ))}
    //             </div>

    //             {/* QR Code or Price Input */}
    //             {qrCodeValue ? (
    //               <div style={styles.qrContainer}>
    //                 <h4>Scan with a Phone Camera</h4>
    //                 <div ref={qrRef} style={styles.qrCodeWrapper}>
    //                   <QRCode value={qrCodeValue} size={256} />
    //                 </div>
    //                 <p style={styles.qrData}>{qrCodeValue.replace(/\n/g, ", ")}</p>
    //                 <button
    //                   style={{ ...styles.buttonGenerate, marginTop: '15px', width: '100%' }}
    //                   onClick={handleDownloadQR}
    //                 >
    //                   ⬇️ Download QR Code
    //                 </button>
    //               </div>
    //             ) : (
    //               <div style={styles.setPriceSection}>
    //                 <h4>Set Final Price for Consumer</h4>
    //                 <div style={styles.inputGroup}>
    //                   <span style={styles.currencySymbol}>₹</span>
    //                   <input
    //                     style={styles.priceInput}
    //                     type="number"
    //                     placeholder="e.g., 150.00"
    //                     value={newPrice}
    //                     onChange={(e) => setNewPrice(e.target.value)}
    //                   />
    //                   <button style={styles.buttonGenerate} onClick={handleGenerateQR}>
    //                     Generate QR Code
    //                   </button>
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   );
    // };

    // // --- STYLES (updated modal styles) ---
    // const styles = {
    //   page: { background: '#f0f4f8', minHeight: 'calc(100vh - 70px)', paddingTop: '20px', fontFamily: "'Segoe UI', sans-serif" },
    //   container: { maxWidth: 900, margin: '40px auto', padding: '20px' },
    //   title: { color: '#8e44ad', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
    //   section: { background: 'white', borderRadius: '12px', padding: '30px', marginBottom: '25px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
    //     subHeader: { color: '#8e44ad', fontWeight: 700, borderBottom: '2px solid #f0e6f6', paddingBottom: '15px', marginBottom: '20px', fontSize: '1.2rem' },
    //   tableContainer: { overflowX: 'auto' },
    //   table: { width: '100%', borderCollapse: 'collapse' },
    //   th: { background: '#f5eef8', color: '#8e44ad', padding: '12px 15px', textAlign: 'left', fontWeight: 'bold' },
    //   td: { padding: '15px', borderBottom: '1px solid #e0e0e0', verticalAlign: 'middle' },
    //   buttonView: { background: '#3498db', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    
    //   modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    //   modalContent: { 
    //     background: 'white', 
    //     borderRadius: '12px', 
    //     padding: '30px 40px', 
    //     maxWidth: '600px', 
    //     width: '90%', 
    //     maxHeight: '90vh',       // ✅ scrollable modal for desktop
    //     overflowY: 'auto',       // ✅ allows scrolling
    //     position: 'relative', 
    //     boxShadow: '0 10px 40px rgba(0,0,0,0.2)' 
    //   },
    //   closeButton: { position: 'absolute', top: '15px', right: '20px', fontSize: '2rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#aaa', lineHeight: 1 },
    //   modalTitle: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '25px', textAlign: 'center', color: '#8e44ad' },
    //   historySection: { marginBottom: '25px' },
    //   historyItem: { background: '#fafafa', border: '1px solid #eee', borderRadius: '8px', padding: '12px', marginBottom: '8px', fontSize: '0.95rem' },
    //   historyAction: { color: '#333', textTransform: 'capitalize', fontWeight: '600' },
    
    //   qrContainer: { textAlign: 'center', marginTop: '20px', paddingBottom: '20px' }, // ✅ extra padding for download button
    //   qrCodeWrapper: { padding: '15px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', display: 'inline-block' },
    //   qrData: { marginTop: '15px', fontSize: '0.9rem', color: '#555', background: '#f4f4f4', padding: '10px', borderRadius: '6px' },
    
    //   setPriceSection: { marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #eee' },
    //   inputGroup: { display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' },
    //   currencySymbol: { fontWeight: 'bold', fontSize: '1.8rem', color: '#333' },
    //   priceInput: { flex: 1, padding: '12px 15px', fontSize: '1.2rem', border: '2px solid #ccc', borderRadius: '8px', textAlign: 'center' },
    //   buttonGenerate: { padding: '12px 25px', fontSize: '1rem', background: '#27ae60', color: 'white', fontWeight: '600', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    
    //   requestCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px' },
    //   productName: { fontWeight: 'bold', fontSize: '1.2rem', color: '#333' },
    //   detailsText: { margin: '2px 0', color: '#555' },
    //   buttonGroup: { display: 'flex', gap: '10px' },
    //   buttonAccept: { background: '#27ae60', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    //   buttonReject: { background: '#c0392b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    //   emptyText: { textAlign: 'center', color: '#777', padding: '20px 0' },
    // };

    // export default RetailerDashboard;

    import React, { useState, useEffect, useRef } from "react";
    import {
    getProducts,
    getPendingRetailerRequests,
    respondToRetailerRequest,
    getProductHistory,
    setRetailerPrice,
    } from "../api";
    import QRCode from "react-qr-code";

    const RetailerDashboard = ({ user }) => {
    const [inventory, setInventory] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [viewingProduct, setViewingProduct] = useState(null);
    const [productHistory, setProductHistory] = useState([]);
    const [newPrice, setNewPrice] = useState("");
    const [qrCodeValue, setQrCodeValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const qrRef = useRef(null);

    const loadData = async () => {
        if (user?.public_id) {
        try {
            const inventoryData = await getProducts(user.public_id);
            const requestsData = await getPendingRetailerRequests(user.public_id);
            setInventory(Array.isArray(inventoryData) ? inventoryData : []);
            setPendingRequests(Array.isArray(requestsData) ? requestsData : []);
        } catch (err) {
            console.error("Failed to load data:", err);
        }
        }
    };

    useEffect(() => { loadData(); }, [user]);

    const handleRespondToRequest = async (productUid, decision) => {
        try {
        await respondToRetailerRequest(productUid, user.public_id, decision);
        alert(`Request successfully ${decision.toLowerCase()}ed!`);
        loadData();
        } catch (err) {
        alert(`Failed to ${decision.toLowerCase()} request.`);
        }
    };

    const handleViewClick = async (product) => {
        try {
        const historyData = await getProductHistory(product.product_uid);
        setProductHistory(Array.isArray(historyData) ? historyData : []);
        setViewingProduct(product);
        } catch (err) {
        alert("Could not fetch product history.");
        }
    };

    const handleGenerateQR = async () => {
        // Improved input validation
        const price = parseFloat(newPrice);
        if (!newPrice || newPrice.trim() === '' || isNaN(price) || price <= 0) {
        alert("Please enter a valid price greater than 0.");
        return;
        }
        
        setIsLoading(true);
        console.log("--- START API CALL ---");
        console.log("Product UID:", viewingProduct.product_uid);
        console.log("Retailer ID:", user.public_id);
        console.log("Price Value:", price);
        
        try {
        await setRetailerPrice(viewingProduct.product_uid, user.public_id, price);
        
        const qrText = `AgriChainProduct|ID:${viewingProduct.product_uid}|Price:INR${price.toFixed(2)}`;
        setQrCodeValue(qrText);
        alert("Price set and QR Code generated!");
        loadData();
        } catch (err) {
        console.error("API Error when setting price:", err);
        const errorMessage = err.message || err.toString() || 'Unknown error occurred';
        alert(`Failed to set price: ${errorMessage}`);
        } finally {
        setIsLoading(false);
        }
        console.log("--- END API CALL ---");
    };

    const handleDownloadQR = () => {
        const svg = qrRef.current?.querySelector("svg");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
        canvas.width = 256;
        canvas.height = 256;
        ctx.drawImage(img, 0, 0, 256, 256);
        URL.revokeObjectURL(url);
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${viewingProduct.product_uid}-qrcode.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        };
        img.src = url;
    };

    const closeModal = () => {
        setViewingProduct(null);
        setProductHistory([]);
        setNewPrice("");
        setQrCodeValue("");
        setIsLoading(false);
    };

    return (
        <div style={styles.page}>
        <div style={styles.container}>
            <h2 style={styles.title}>🏬 Retailer Dashboard</h2>

            <div style={styles.section}>
            <h3 style={styles.subHeader}>Incoming Transfer Requests</h3>
            {pendingRequests.length > 0 ? (
                pendingRequests.map((req) => (
                <div key={req.product_uid} style={styles.requestCard}>
                    <div>
                    <p style={styles.productName}>{req.name}</p>
                    <p style={styles.detailsText}><strong>Quantity:</strong> {req.quantity} units</p>
                    </div>
                    <div style={styles.buttonGroup}>
                    <button style={styles.buttonReject} onClick={() => handleRespondToRequest(req.product_uid, 'REJECT')}>Reject</button>
                    <button style={styles.buttonAccept} onClick={() => handleRespondToRequest(req.product_uid, 'ACCEPT')}>Accept</button>
                    </div>
                </div>
                ))
            ) : (
                <p style={styles.emptyText}>You have no pending transfer requests.</p>
            )}
            </div>

            <div style={styles.section}>
            <h3 style={styles.subHeader}>Your Product Inventory</h3>
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                <thead>
                    <tr>
                    <th style={styles.th}>Product ID</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Quantity</th>
                    <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((p) => (
                    <tr key={p.product_uid}>
                        <td style={styles.td}>{p.product_uid}</td>
                        <td style={styles.td}>{p.name}</td>
                        <td style={styles.td}>{p.quantity}</td>
                        <td style={styles.td}>
                        <button style={styles.buttonView} onClick={() => handleViewClick(p)}>
                            View / Set Price
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>

        {viewingProduct && (
            <div style={styles.modalOverlay} onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
            }}>
            <div style={styles.modalContent}>
                <button style={styles.closeButton} onClick={closeModal}>×</button>
                <h3 style={styles.modalTitle}>{viewingProduct.name}</h3>

                <div style={styles.historySection}>
                <h4>Product Journey</h4>
                {productHistory.map((act) => (
                    <div key={act.id} style={styles.historyItem}>
                    <strong style={styles.historyAction}>{act.action.replace(/_/g, ' ')}:</strong>
                    <span> by <strong>{act.actor_name}</strong> ({act.actor_id}) on {new Date(act.created_at).toLocaleDateString()}</span>
                    </div>
                ))}
                </div>

                {qrCodeValue ? (
                <div style={styles.qrContainer}>
                    <h4>Scan with a Phone Camera</h4>
                    <div ref={qrRef} style={styles.qrCodeWrapper}>
                    <QRCode value={qrCodeValue} size={256} />
                    </div>
                    <button style={styles.buttonDownload} onClick={handleDownloadQR}>Download QR</button>
                </div>
                ) : (
                <div style={styles.setPriceSection}>
                    <h4>Set Final Price for Consumer</h4>
                    <div style={styles.inputGroup}>
                    <span style={styles.currencySymbol}>₹</span>
                    <div style={styles.inputWrapper}>
                        <input
                        style={styles.priceInput}
                        type="text"
                        inputMode="decimal"
                        placeholder="Enter price"
                        value={newPrice}
                        onChange={(e) => {
                            console.log('Input changed:', e.target.value);
                            setNewPrice(e.target.value);
                        }}
                        onFocus={(e) => {
                            console.log('Input focused');
                            e.target.style.borderColor = '#3498db';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#3498db';
                        }}
                        disabled={isLoading}
                        autoComplete="off"
                        />
                        
                    </div>
                    <button 
                        style={isLoading ? styles.buttonGenerateDisabled : styles.buttonGenerate} 
                        onClick={handleGenerateQR}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Setting Price...' : 'Generate QR Code'}
                    </button>
                    </div>
                </div>
                )}
            </div>
            </div>
        )}
        </div>
    );
    };

    // --- FIXED STYLES ---
    const styles = {
    page: { background: '#f0f4f8', minHeight: 'calc(100vh - 70px)', paddingTop: '20px', fontFamily: "'Segoe UI', sans-serif" },
    container: { maxWidth: 900, margin: '40px auto', padding: '20px' },
    title: { color: '#8e44ad', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
    section: { background: 'white', borderRadius: '12px', padding: '30px', marginBottom: '25px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
    subHeader: { color: '#8e44ad', fontWeight: 700, borderBottom: '2px solid #f0e6f6', paddingBottom: '15px', marginBottom: '20px', fontSize: '1.2rem' },
    tableContainer: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { background: '#f5eef8', color: '#8e44ad', padding: '12px 15px', textAlign: 'left', fontWeight: 'bold' },
    td: { padding: '15px', borderBottom: '1px solid #e0e0e0', verticalAlign: 'middle' },
    buttonView: { background: '#3498db', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    modalOverlay: { 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(0,0,0,0.6)', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        zIndex: 1000,
        pointerEvents: 'auto'
    },
    modalContent: { 
        background: 'white', 
        borderRadius: '12px', 
        padding: '30px 40px', 
        maxWidth: '600px', 
        width: '90%', 
        position: 'relative', 
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)', 
        maxHeight: '90vh', 
        overflowY: 'auto',
        pointerEvents: 'auto'
    },
    closeButton: { position: 'absolute', top: '15px', right: '20px', fontSize: '2rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#aaa', lineHeight: 1 },
    modalTitle: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '25px', textAlign: 'center', color: '#8e44ad' },
    historySection: { marginBottom: '25px' },
    historyItem: { background: '#fafafa', border: '1px solid #eee', borderRadius: '8px', padding: '12px', marginBottom: '8px', fontSize: '0.95rem' },
    historyAction: { color: '#333', textTransform: 'capitalize', fontWeight: '600' },
    qrContainer: { textAlign: 'center', marginTop: '20px' },
    qrCodeWrapper: { padding: '15px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', display: 'inline-block' },
    setPriceSection: { marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #eee' },
    inputGroup: { 
        display: 'flex', 
        alignItems: 'stretch', 
        gap: '15px', 
        marginTop: '15px',
        position: 'relative',
        zIndex: '5'
    },
    currencySymbol: { 
        fontWeight: 'bold', 
        fontSize: '1.8rem', 
        color: '#333',
        alignSelf: 'center',
        minWidth: '30px'
    },
    priceInput: { 
        flex: 1, 
        padding: '15px 20px', 
        fontSize: '1 rem', 
        border: '3px solid #3498db', 
        borderRadius: '10px', 
        textAlign: 'center', 
        backgroundColor: '#ffffff',
        color: '#000000',
        fontWeight: 'bold',
        cursor: 'text',
        pointerEvents: 'all',
        outline: 'none',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease',
        WebkitAppearance: 'none',
        MozAppearance: 'textfield',
        zIndex: '10'
    },
    buttonGenerate: { 
        padding: '12px 25px', 
        fontSize: '1rem', 
        background: '#27ae60', 
        color: 'white', 
        fontWeight: '600', 
        border: 'none', 
        borderRadius: '8px', 
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
    },
    buttonGenerateDisabled: { 
        padding: '12px 25px', 
        fontSize: '1rem', 
        background: '#95a5a6', 
        color: 'white', 
        fontWeight: '600', 
        border: 'none', 
        borderRadius: '8px', 
        cursor: 'not-allowed'
    },
    requestCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px' },
    productName: { fontWeight: 'bold', fontSize: '1.2rem', color: '#333' },
    detailsText: { margin: '2px 0', color: '#555' },
    buttonGroup: { display: 'flex', gap: '10px' },
    buttonAccept: { background: '#27ae60', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    buttonReject: { background: '#c0392b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    emptyText: { textAlign: 'center', color: '#777', padding: '20px 0' },
    buttonDownload: { marginTop: '15px', padding: '10px 20px', fontSize: '1rem', background: '#3498db', color: 'white', fontWeight: '600', border: 'none', borderRadius: '6px', cursor: 'pointer' },
    };

    export default RetailerDashboard;