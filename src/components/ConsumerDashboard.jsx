// // // // import React, { useState, useEffect } from "react";
// // // // import { getProducts } from "../api";

// // // // const ConsumerDashboard = ({ user, onLogout }) => {
// // // //   const [products, setProducts] = useState([]);

// // // //   useEffect(() => {
// // // //     loadProducts();
// // // //   }, []);

// // // //   const loadProducts = async () => {
// // // //     const data = await getProducts();
// // // //     setProducts(Array.isArray(data) ? data : []);
// // // //   };

// // // //   return (
// // // //     <div className="glass-card">
// // // //       <h2>🛒 Consumer Dashboard</h2>
// // // //       <p>Welcome, {user.name} (ID: {user.public_id})</p>

// // // //       <h3>Your Purchased Products</h3>
// // // //       <ul className="activity-list">
// // // //         {products.filter(p => p.current_owner === user.public_id).map(p => (
// // // //           <li key={p.product_uid}>
// // // //             <span className="badge orange-badge">Consumer</span> {p.name}
// // // //             <small> (UID: {p.product_uid})</small>
// // // //           </li>
// // // //         ))}
// // // //       </ul>

// // // //       <button onClick={onLogout} className="button-secondary">Logout</button>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ConsumerDashboard;

// // // import React, { useState, useEffect } from "react";
// // // import { getProducts } from "../api";
// // // import QRCode from "react-qr-code"; // ✅ make sure you installed this package

// // // const ConsumerDashboard = ({ user, onLogout }) => {
// // //   const [products, setProducts] = useState([]);

// // //   useEffect(() => {
// // //     loadProducts();
// // //   }, []);

// // //   const loadProducts = async () => {
// // //     const data = await getProducts();
// // //     setProducts(Array.isArray(data) ? data : []);
// // //   };

// // //   return (
// // //     <div className="glass-card">
// // //       <h2>🛒 Consumer Dashboard</h2>
// // //       <p>Welcome, {user.name} (ID: {user.public_id})</p>

// // //       <h3>Your Purchased Products</h3>
// // //       <ul className="activity-list">
// // //         {products
// // //           .filter((p) => p.current_owner === user.public_id)
// // //           .map((p) => (
// // //             <li key={p.product_uid} style={{ marginBottom: "20px" }}>
// // //               <span className="badge orange-badge">Consumer</span> {p.name}
// // //               <small> (UID: {p.product_uid})</small>
// // //               <div style={{ marginTop: "10px" }}>
// // //                 <QRCode value={p.product_uid} size={128} />
// // //               </div>
// // //             </li>
// // //           ))}
// // //       </ul>

// // //       <button onClick={onLogout} className="button-secondary">
// // //         Logout
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default ConsumerDashboard;


// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { getProducts } from '../api';

// // const ConsumerDashboard = ({ user }) => {
// //     const [purchasedProducts, setPurchasedProducts] = useState([]);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const loadPurchasedProducts = async () => {
// //             if (user?.public_id) {
// //                 try {
// //                     const data = await getProducts(user.public_id);
// //                     setPurchasedProducts(Array.isArray(data) ? data : []);
// //                 } catch (error) {
// //                     console.error("Failed to load purchased products:", error);
// //                 }
// //             }
// //         };

// //         loadPurchasedProducts();
// //     }, [user]);

// //     const handleTrace = (productId) => {
// //         // Navigate to the public trace page with the product ID
// //         navigate(`/trace?id=${productId}`);
// //     };

// //     return (
// //         <div style={styles.page}>
// //             <div style={styles.container}>
// //                 <h2 style={styles.title}>🛒 Consumer Dashboard</h2>
// //                 <div style={styles.section}>
// //                     <h3 style={styles.subHeader}>Your Purchased Products</h3>
// //                     {purchasedProducts.length === 0 ? (
// //                         <p style={styles.emptyText}>You have not purchased any products yet.</p>
// //                     ) : (
// //                         <div style={styles.tableContainer}>
// //                             <table style={styles.table}>
// //                                 <thead>
// //                                     <tr>
// //                                         <th style={styles.th}>Product ID</th>
// //                                         <th style={styles.th}>Name</th>
// //                                         <th style={styles.th}>Action</th>
// //                                     </tr>
// //                                 </thead>
// //                                 <tbody>
// //                                     {purchasedProducts.map((p) => (
// //                                         <tr key={p.product_uid}>
// //                                             <td style={styles.td}>{p.product_uid}</td>
// //                                             <td style={styles.td}>{p.name}</td>
// //                                             <td style={styles.td}>
// //                                                 <button style={styles.buttonTrace} onClick={() => handleTrace(p.product_uid)}>
// //                                                     Trace Product
// //                                                 </button>
// //                                             </td>
// //                                         </tr>
// //                                     ))}
// //                                 </tbody>
// //                             </table>
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // const styles = {
// //     page: { background: '#f0f4f8', minHeight: 'calc(100vh - 70px)', paddingTop: '20px', fontFamily: "'Segoe UI', sans-serif" },
// //     container: { maxWidth: 900, margin: '40px auto', padding: '20px' },
// //     title: { color: '#0288d1', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
// //     section: { background: 'white', borderRadius: '12px', padding: '30px', marginBottom: '25px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
// //     subHeader: { color: '#0288d1', fontWeight: 700, borderBottom: '2px solid #e1f5fe', paddingBottom: '15px', marginBottom: '20px', fontSize: '1.2rem' },
// //     emptyText: { textAlign: 'center', color: '#777', padding: '20px 0' },
// //     tableContainer: { overflowX: 'auto' },
// //     table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
// //     th: { background: '#e1f5fe', color: '#01579b', padding: '12px 15px', textAlign: 'left', fontWeight: 'bold' },
// //     td: { padding: '15px', borderBottom: '1px solid #e0e0e0', verticalAlign: 'middle' },
// //     buttonTrace: { background: '#03a9f4', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
// // };

// // export default ConsumerDashboard;

// import React, { useState, useEffect, useRef } from 'react';
// import { getProducts, getProductHistory } from '../api';
// import jsQR from 'jsqr';

// const ConsumerDashboard = ({ user }) => {
//     const [purchasedProducts, setPurchasedProducts] = useState([]);
//     const [history, setHistory] = useState([]);
//     const [error, setError] = useState('');
//     const [searchedProduct, setSearchedProduct] = useState(null);
//     const [uploadedImage, setUploadedImage] = useState(null);
//     const fileInputRef = useRef(null);

//     const loadPurchasedProducts = async () => {
//         if (user?.public_id) {
//             try {
//                 const data = await getProducts(user.public_id);
//                 setPurchasedProducts(Array.isArray(data) ? data : []);
//             } catch (error) {
//                 console.error("Failed to load purchased products:", error);
//             }
//         }
//     };

//     useEffect(() => {
//         loadPurchasedProducts();
//     }, [user]);

//     const fetchHistory = async (id) => {
//         if (!id) return;
//         try {
//             const data = await getProductHistory(id);
//             if (data.length > 0) {
//                 setHistory(data);
//                 const creationRecord = data.find(act => act.action === 'CREATED');
//                 const priceRecord = data.find(act => act.action === 'PRICE_SET');
//                 let name = creationRecord ? (creationRecord.details.match(/units of (.*?)\s/) || [])[1] : 'Unknown';
//                 setSearchedProduct({
//                     name: name,
//                     id: id,
//                     price: priceRecord ? priceRecord.details.split('₹')[1] : 'Not set',
//                 });
//                 setError('');
//             } else {
//                 setError('No history found for this Product ID.');
//                 setHistory([]);
//                 setSearchedProduct(null);
//             }
//         } catch (err) {
//             setError('An error occurred. Please check the Product ID.');
//         }
//     };

//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const imageUrl = e.target.result;
//                 setUploadedImage(imageUrl);
//                 decodeQrCode(imageUrl);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const decodeQrCode = (imageUrl) => {
//         const image = new Image();
//         image.src = imageUrl;
//         image.onload = () => {
//             const canvas = document.createElement('canvas');
//             const context = canvas.getContext('2d');
//             canvas.width = image.width;
//             canvas.height = image.height;
//             context.drawImage(image, 0, 0, image.width, image.height);
//             const imageData = context.getImageData(0, 0, image.width, image.height);
//             const code = jsQR(imageData.data, imageData.width, imageData.height);
//             if (code) {
//                 const idMatch = code.data.match(/ID:\s*(PROD_[a-zA-Z0-9_]+)/);
//                 if (idMatch && idMatch[1]) {
//                     fetchHistory(idMatch[1]);
//                 } else {
//                     setError('QR code scanned, but could not extract a valid Product ID.');
//                 }
//             } else {
//                 setError('No QR code was detected in the uploaded image.');
//             }
//         };
//     };

//     return (
//         <div style={styles.page}>
//             <div style={styles.container}>
//                 <h2 style={styles.title}>🛒 Consumer Dashboard</h2>

//                 <div style={styles.section}>
//                     <h3 style={styles.subHeader}>Trace a New Product</h3>
//                     <p style={styles.subtitle}>Upload a QR code image to instantly trace its journey.</p>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileUpload}
//                         ref={fileInputRef}
//                         style={{ display: 'none' }}
//                     />
//                     <button style={styles.button} onClick={() => fileInputRef.current.click()}>
//                         Upload & Scan QR Code
//                     </button>
//                     {uploadedImage && <img src={uploadedImage} alt="QR Preview" style={styles.imagePreview} />}
//                 </div>

//                 {error && <p style={styles.errorText}>{error}</p>}

//                 {history.length > 0 && searchedProduct && (
//                     <div style={styles.resultsSection}>
//                         {/* ... Results Display ... */}
//                     </div>
//                 )}
                
//                 <div style={styles.section}>
//                     <h3 style={styles.subHeader}>Your Past Purchases</h3>
//                     {/* ... Table of previously purchased products ... */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     page: { background: '#f0f4f8', minHeight: 'calc(100vh - 70px)', paddingTop: '20px', fontFamily: "'Segoe UI', sans-serif" },
//     container: { maxWidth: 900, margin: '40px auto', padding: '20px' },
//     title: { color: '#0288d1', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
//     section: { background: 'white', borderRadius: '12px', padding: '30px', marginBottom: '25px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
//     subHeader: { color: '#0288d1', fontWeight: 700, borderBottom: '2px solid #e1f5fe', paddingBottom: '15px', marginBottom: '20px', fontSize: '1.2rem' },
//     subtitle: { textAlign: 'center', color: '#666', marginTop: '-15px', marginBottom: '20px' },
//     button: { display: 'block', margin: 'auto', background: '#03a9f4', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' },
//     imagePreview: { marginTop: '20px', maxHeight: '150px', maxWidth: '150px', border: '2px solid #eee', borderRadius: '8px' },
//     errorText: { color: '#d32f2f', textAlign: 'center', marginTop: '20px', fontSize: '1.1rem' },
//     resultsSection: { background: 'white', padding: '30px', borderRadius: '12px', marginTop: '30px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
//     // ... other styles for timeline, table etc.
// };

// export default ConsumerDashboard;


// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getProducts, getProductHistory } from '../api';
// import jsQR from 'jsqr';

// const ConsumerDashboard = ({ user }) => {
//     const [purchasedProducts, setPurchasedProducts] = useState([]);
//     const [history, setHistory] = useState([]);
//     const [error, setError] = useState('');
//     const [searchedProduct, setSearchedProduct] = useState(null);
//     const [uploadedImage, setUploadedImage] = useState(null);
//     const fileInputRef = useRef(null);
//     const navigate = useNavigate();

//     const loadPurchasedProducts = async () => {
//         if (!user?.public_id) return;
//         try {
//             const data = await getProducts(user.public_id);
//             setPurchasedProducts(Array.isArray(data) ? data : []);
//         } catch (err) {
//             console.error("Failed to load purchased products:", err);
//         }
//     };

//     useEffect(() => {
//         loadPurchasedProducts();
//     }, [user]);

//     const fetchHistory = async (productId) => {
//         if (!productId) return;
//         try {
//             const data = await getProductHistory(productId);
//             if (data.length > 0) {
//                 setHistory(data);

//                 const creationRecord = data.find(act => act.action === 'CREATED');
//                 const priceRecord = data.find(act => act.action === 'PRICE_SET');
//                 const name = creationRecord ? (creationRecord.details.match(/units of (.*?)\s/) || [])[1] : 'Unknown';

//                 setSearchedProduct({
//                     name,
//                     id: productId,
//                     price: priceRecord ? priceRecord.details.split('₹')[1] : 'Not set',
//                 });
//                 setError('');
//             } else {
//                 setError('No history found for this Product ID.');
//                 setHistory([]);
//                 setSearchedProduct(null);
//             }
//         } catch (err) {
//             setError('An error occurred while fetching product history.');
//         }
//     };

//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const imageUrl = e.target.result;
//             setUploadedImage(imageUrl);
//             decodeQrCode(imageUrl);
//         };
//         reader.readAsDataURL(file);
//     };

//     const decodeQrCode = (imageUrl) => {
//         const image = new Image();
//         image.src = imageUrl;
//         image.onload = () => {
//             const canvas = document.createElement('canvas');
//             const ctx = canvas.getContext('2d');
//             canvas.width = image.width;
//             canvas.height = image.height;
//             ctx.drawImage(image, 0, 0, image.width, image.height);

//             const imageData = ctx.getImageData(0, 0, image.width, image.height);
//             const code = jsQR(imageData.data, imageData.width, imageData.height);

//             if (!code) {
//                 setError('No QR code could be detected in the image.');
//                 return;
//             }

//             // ✅ Take the full QR content as product UID directly
//             const productId = code.data.trim();
//             if (productId) {
//                 fetchHistory(productId);
//             } else {
//                 setError('QR code is empty or invalid.');
//             }
//         };
//     };

//     const handleTrace = (productId) => {
//         navigate(`/trace?id=${productId}`);
//     };

//     return (
//         <div style={styles.page}>
//             <div style={styles.container}>
//                 <h2 style={styles.title}>🛒 Consumer Dashboard</h2>

//                 {/* QR Upload Section */}
//                 <div style={styles.section}>
//                     <h3 style={styles.subHeader}>Trace a New Product</h3>
//                     <p style={styles.subtitle}>Upload a QR code image to trace its journey.</p>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileUpload}
//                         ref={fileInputRef}
//                         style={{ display: 'none' }}
//                     />
//                     <button style={styles.button} onClick={() => fileInputRef.current.click()}>
//                         Upload & Scan QR Code
//                     </button>
//                     {uploadedImage && <img src={uploadedImage} alt="QR Preview" style={styles.imagePreview} />}
//                 </div>

//                 {error && <p style={styles.errorText}>{error}</p>}

//                 {history.length > 0 && searchedProduct && (
//                     <div style={styles.resultsSection}>
//                         <h3 style={styles.productTitle}>{searchedProduct.name}</h3>
//                         <div style={styles.productDetails}>
//                             <span><strong>ID:</strong> {searchedProduct.id}</span>
//                             <span><strong>Final Price:</strong> ₹{searchedProduct.price}</span>
//                         </div>
//                         <h4 style={styles.journeyHeader}>Product Journey</h4>
//                         <div style={styles.timeline}>
//                             {history.map((act) => (
//                                 <div key={act.id} style={styles.timelineItem}>
//                                     <div style={styles.timelineIcon}></div>
//                                     <div style={styles.timelineContent}>
//                                         <span style={styles.timelineAction}>{act.action.replace(/_/g, ' ')}</span>
//                                         <p style={styles.timelineDetails}>by <strong>{act.actor_name}</strong> ({act.actor_id})</p>
//                                         <span style={styles.timelineDate}>{new Date(act.created_at).toLocaleString()}</span>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Past Purchases */}
//                 <div style={styles.section}>
//                     <h3 style={styles.subHeader}>Your Past Purchases</h3>
//                     {purchasedProducts.length === 0 ? (
//                         <p style={styles.emptyText}>You have not purchased any products yet.</p>
//                     ) : (
//                         <div style={styles.tableContainer}>
//                             <table style={styles.table}>
//                                 <thead>
//                                     <tr>
//                                         <th style={styles.th}>Product ID</th>
//                                         <th style={styles.th}>Name</th>
//                                         <th style={styles.th}>Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {purchasedProducts.map((p) => (
//                                         <tr key={p.product_uid}>
//                                             <td style={styles.td}>{p.product_uid}</td>
//                                             <td style={styles.td}>{p.name}</td>
//                                             <td style={styles.td}>
//                                                 <button style={styles.buttonTrace} onClick={() => handleTrace(p.product_uid)}>
//                                                     Trace Product
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     page: { background: '#f0f4f8', minHeight: 'calc(100vh - 70px)', paddingTop: '20px', fontFamily: "'Segoe UI', sans-serif" },
//     container: { maxWidth: 900, margin: '40px auto', padding: '20px' },
//     title: { color: '#0288d1', fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
//     section: { background: 'white', borderRadius: '12px', padding: '30px', marginBottom: '25px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
//     subHeader: { color: '#0288d1', fontWeight: 700, borderBottom: '2px solid #e1f5fe', paddingBottom: '15px', marginBottom: '20px', fontSize: '1.2rem' },
//     subtitle: { textAlign: 'center', color: '#666', marginTop: '-15px', marginBottom: '20px' },
//     button: { display: 'block', margin: 'auto', background: '#03a9f4', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' },
//     imagePreview: { marginTop: '20px', maxHeight: '150px', maxWidth: '150px', border: '2px solid #eee', borderRadius: '8px' },
//     errorText: { color: '#d32f2f', textAlign: 'center', marginTop: '20px', fontSize: '1.1rem' },
//     resultsSection: { background: 'white', padding: '30px', borderRadius: '12px', marginTop: '30px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
//     productTitle: { fontSize: '2rem', textAlign: 'center', color: '#333', marginBottom: '10px' },
//     productDetails: { display: 'flex', justifyContent: 'space-around', background: '#f9f9f9', padding: '10px', borderRadius: '8px', marginBottom: '30px' },
//     journeyHeader: { color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px', marginBottom: '20px' },
//     timeline: { position: 'relative', padding: '0 0 0 20px', borderLeft: '3px solid #27ae60' },
//     timelineItem: { marginBottom: '20px', position: 'relative' },
//     timelineIcon: { position: 'absolute', left: '-31px', top: '0px', width: '18px', height: '18px', background: 'white', border: '3px solid #27ae60', borderRadius: '50%' },
//     timelineContent: { marginLeft: '10px' },
//     timelineAction: { fontWeight: 'bold', textTransform: 'capitalize', fontSize: '1.1rem', color: '#27ae60' },
//     timelineDetails: { margin: '5px 0', color: '#555' },
//     timelineDate: { fontSize: '0.85rem', color: '#888' },
//     emptyText: { textAlign: 'center', color: '#777', padding: '20px 0' },
//     tableContainer: { overflowX: 'auto' },
//     table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
//     th: { background: '#e1f5fe', color: '#01579b', padding: '12px 15px', textAlign: 'left', fontWeight: 'bold' },
//     td: { padding: '15px', borderBottom: '1px solid #e0e0e0', verticalAlign: 'middle' },
//     buttonTrace: { background: '#03a9f4', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
// };

// export default ConsumerDashboard;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, getProductHistory } from '../api';
import jsQR from 'jsqr';

const ConsumerDashboard = ({ user }) => {
    const [history, setHistory] = useState([]);
    const [error, setError] = useState('');
    const [searchedProduct, setSearchedProduct] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // Fetch product history
    const fetchHistory = async (productId) => {
        if (!productId) return;
        try {
            const data = await getProductHistory(productId);
            if (data.length > 0) {
                setHistory(data);

                const creationRecord = data.find(act => act.action === 'CREATED');
                const priceRecord = data.find(act => act.action === 'PRICE_SET');
                const name = creationRecord ? (creationRecord.details.match(/units of (.*?)\s/) || [])[1] : 'Unknown';

                setSearchedProduct({
                    name,
                    id: productId,
                    price: priceRecord ? priceRecord.details.split('₹')[1] : 'Not set',
                });
                setError('');
            } else {
                setError('No history found for this Product ID.');
                setHistory([]);
                setSearchedProduct(null);
            }
        } catch (err) {
            setError('An error occurred while fetching product history.');
        }
    };

    // Handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            decodeQrCode(imageUrl);
        };
        reader.readAsDataURL(file);
    };

    // Decode QR
    const decodeQrCode = (imageUrl) => {
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);

            const imageData = ctx.getImageData(0, 0, image.width, image.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (!code) {
                setError('No QR code could be detected in the image.');
                return;
            }

            // Extract product UID from QR string
            // Expected format: "AgriChainProduct|ID:<product_uid>|Price:INR..."
            const match = code.data.trim().match(/ID:([A-Za-z0-9_-]+)/);
            if (match && match[1]) {
                const productId = match[1];
                fetchHistory(productId);
            } else {
                setError('Invalid QR format.');
            }
        };
    };

    const handleTrace = (productId) => {
        navigate(`/trace?id=${productId}`);
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h2 style={styles.title}>🛒 Consumer Dashboard</h2>

                {/* QR Upload Section */}
                <div style={styles.section}>
                    <h3 style={styles.subHeader}>Trace a New Product</h3>
                    <p style={styles.subtitle}>Upload a QR code image to trace its journey.</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                    <button style={styles.button} onClick={() => fileInputRef.current.click()}>
                        Upload & Scan QR Code
                    </button>
                </div>

                {error && <p style={styles.errorText}>{error}</p>}

                {/* Display scanned product info */}
                {history.length > 0 && searchedProduct && (
                    <div style={styles.resultsSection}>
                        <h3 style={styles.productTitle}>{searchedProduct.name}</h3>
                        <div style={styles.productDetails}>
                            <span><strong>ID:</strong> {searchedProduct.id}</span>
                            <span><strong>Final Price:</strong> ₹{searchedProduct.price}</span>
                        </div>
                        <h4 style={styles.journeyHeader}>Product Journey</h4>
                        <div style={styles.timeline}>
                            {history.map((act) => (
                                <div key={act.id} style={styles.timelineItem}>
                                    <div style={styles.timelineIcon}></div>
                                    <div style={styles.timelineContent}>
                                        <span style={styles.timelineAction}>{act.action.replace(/_/g, ' ')}</span>
                                        <p style={styles.timelineDetails}>by <strong>{act.actor_name}</strong> ({act.actor_id})</p>
                                        <span style={styles.timelineDate}>{new Date(act.created_at).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- STYLES ---
const styles = {
    page: {
        background: '#f0f4f8',
        minHeight: 'calc(100vh - 70px)',
        paddingTop: '20px',
        fontFamily: "'Segoe UI', sans-serif",
        overflowY: 'auto',
    },
    container: {
        maxWidth: 900,
        margin: '40px auto',
        padding: '20px',
    },
    title: {
        color: '#0288d1',
        fontSize: '2.2rem',
        fontWeight: 800,
        textAlign: 'center',
        marginBottom: '30px',
    },
    section: {
        background: 'white',
        borderRadius: '12px',
        padding: '30px',
        marginBottom: '25px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
    },
    subHeader: {
        color: '#0288d1',
        fontWeight: 700,
        borderBottom: '2px solid #e1f5fe',
        paddingBottom: '15px',
        marginBottom: '20px',
        fontSize: '1.2rem',
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        marginTop: '-15px',
        marginBottom: '20px',
    },
    button: {
        display: 'block',
        margin: 'auto',
        background: '#03a9f4',
        color: 'white',
        border: 'none',
        padding: '12px 25px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1.1rem',
    },
    errorText: {
        color: '#d32f2f',
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '1.1rem',
    },
    resultsSection: {
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        marginTop: '30px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
    },
    productTitle: {
        fontSize: '2rem',
        textAlign: 'center',
        color: '#333',
        marginBottom: '10px',
    },
    productDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        background: '#f9f9f9',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '30px',
    },
    journeyHeader: {
        color: '#333',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '10px',
        marginBottom: '20px',
    },
    timeline: {
        position: 'relative',
        padding: '0 0 0 20px',
        borderLeft: '3px solid #27ae60',
    },
    timelineItem: {
        marginBottom: '20px',
        position: 'relative',
    },
    timelineIcon: {
        position: 'absolute',
        left: '-31px',
        top: '0px',
        width: '18px',
        height: '18px',
        background: 'white',
        border: '3px solid #27ae60',
        borderRadius: '50%',
    },
    timelineContent: {
        marginLeft: '10px',
    },
    timelineAction: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: '1.1rem',
        color: '#27ae60',
    },
    timelineDetails: {
        margin: '5px 0',
        color: '#555',
    },
    timelineDate: {
        fontSize: '0.85rem',
        color: '#888',
    },
};

export default ConsumerDashboard;
