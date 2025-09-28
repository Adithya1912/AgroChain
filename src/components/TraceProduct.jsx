// import React, { useState, useEffect, useRef } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { getProductHistory } from '../api';
// import jsQR from 'jsqr'; // Import the QR code scanner library

// const TraceProduct = () => {
//     const [searchParams] = useSearchParams();
//     const [productId, setProductId] = useState(searchParams.get('id') || '');
//     const [history, setHistory] = useState([]);
//     const [error, setError] = useState('');
//     const [searchedProduct, setSearchedProduct] = useState(null);
//     const [uploadedImage, setUploadedImage] = useState(null); // To store the uploaded image URL

//     const fileInputRef = useRef(null); // Reference for the hidden file input

//     const fetchHistory = async (id) => {
//         if (!id) {
//             setError('No Product ID found in the QR code.');
//             setHistory([]);
//             setSearchedProduct(null);
//             return;
//         }
//         try {
//             const data = await getProductHistory(id);
//             if (data.length > 0) {
//                 setHistory(data);
//                 // Extract product details from the history
//                 const creationRecord = data.find(act => act.action === 'CREATED');
//                 const priceRecord = data.find(act => act.action === 'PRICE_SET');
                
//                 let name = 'Unknown Product';
//                 if (creationRecord) {
//                     const nameMatch = creationRecord.details.match(/units of (.*?)\s/);
//                     if (nameMatch) name = nameMatch[1];
//                 }

//                 setSearchedProduct({
//                     name: name,
//                     id: id,
//                     // Use a more robust way to get price, in case format changes
//                     price: priceRecord ? `₹${parseFloat(priceRecord.details.split('₹')[1]).toFixed(2)}` : 'Not set',
//                 });
//                 setError('');
//             } else {
//                 setError('No history found for this Product ID.');
//                 setHistory([]);
//                 setSearchedProduct(null);
//             }
//         } catch (err) {
//             console.error("Error fetching product history:", err);
//             setError('An error occurred while fetching product details. Please try again.');
//             setHistory([]);
//             setSearchedProduct(null);
//         }
//     };

//     useEffect(() => {
//         const initialId = searchParams.get('id');
//         if (initialId) {
//             fetchHistory(initialId);
//         }
//     }, [searchParams]);

//     // Function to handle file upload
//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const imageUrl = e.target.result;
//                 setUploadedImage(imageUrl); // Display the image
//                 decodeQrCode(imageUrl); // Decode the QR code
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // Function to decode QR code from an image URL
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
//                 const qrData = code.data;
//                 console.log("QR Code Data:", qrData);
//                 // Attempt to parse Product ID from QR data
//                 // Assuming QR data format: "Product: <name>\nID: <product_uid>\nPrice: <price>\nSold by: <retailer_name>"
//                 const idMatch = qrData.match(/ID:\s*(PROD_[a-zA-Z0-9_]+)/);
//                 if (idMatch && idMatch[1]) {
//                     setProductId(idMatch[1]); // Set product ID for fetching
//                     fetchHistory(idMatch[1]);
//                 } else {
//                     setError('QR code scanned, but could not extract Product ID. Ensure it\'s a valid AgriChain QR.');
//                     setHistory([]);
//                     setSearchedProduct(null);
//                 }
//             } else {
//                 setError('No QR code detected in the uploaded image.');
//                 setHistory([]);
//                 setSearchedProduct(null);
//             }
//         };
//         image.onerror = () => {
//             setError('Failed to load image for QR code scanning.');
//         };
//     };

//     const triggerFileInput = () => {
//         fileInputRef.current.click(); // Programmatically click the hidden file input
//     };

//     const resetSearch = () => {
//         setProductId('');
//         setHistory([]);
//         setError('');
//         setSearchedProduct(null);
//         setUploadedImage(null);
//         if (fileInputRef.current) {
//             fileInputRef.current.value = ''; // Clear the file input
//         }
//     };

//     return (
//         <div style={styles.page}>
//             <div style={styles.topBar}>
//                 <h1 style={styles.brand}>AgriChain</h1>
//                 <button style={styles.resetButton} onClick={resetSearch}>New Scan</button>
//             </div>
//             <div style={styles.container}>
//                 <div style={styles.searchSection}>
//                     <h2 style={styles.title}>Scan to Trace Produce</h2>
//                     <p style={styles.subtitle}>Upload a QR code image to instantly trace your product's journey.</p>
                    
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileUpload}
//                         style={{ display: 'none' }} // Hide the actual file input
//                         ref={fileInputRef}
//                     />
//                     <button style={styles.uploadButton} onClick={triggerFileInput}>
//                         Upload QR Code Image
//                     </button>

//                     {uploadedImage && (
//                         <div style={styles.imagePreviewContainer}>
//                             <img src={uploadedImage} alt="Uploaded QR Code" style={styles.uploadedImage} />
//                             <p style={styles.imageCaption}>Scanning this image...</p>
//                         </div>
//                     )}
//                 </div>

//                 {error && <p style={styles.errorText}>{error}</p>}

//                 {history.length > 0 && searchedProduct && (
//                     <div style={styles.resultsSection}>
//                         <h3 style={styles.productTitle}>{searchedProduct.name}</h3>
//                         <div style={styles.productDetails}>
//                             <span><strong>ID:</strong> {searchedProduct.id}</span>
//                             <span><strong>Final Price:</strong> {searchedProduct.price}</span>
//                         </div>
//                         <h4 style={styles.journeyHeader}>Product Journey</h4>
//                         <div style={styles.timeline}>
//                             {history.map((act, index) => (
//                                 <div key={act.id} style={styles.timelineItem}>
//                                     <div style={styles.timelineIcon}></div>
//                                     <div style={styles.timelineContent}>
//                                         <span style={styles.timelineAction}>{act.action.replace(/_/g, ' ')}</span>
//                                         <p style={styles.timelineDetails}>by <strong>{act.actor_name}</strong> {act.public_id ? `(${act.public_id})` : ''}</p>
//                                         <span style={styles.timelineDate}>{new Date(act.created_at).toLocaleString()}</span>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// const styles = {
//     page: { background: '#f0f4f8', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" },
//     topBar: { background: 'white', padding: '15px 40px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
//     brand: { color: '#2e7d32', margin: 0, fontSize: '1.8rem' },
//     resetButton: { background: '#f44336', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
//     container: { maxWidth: 800, margin: '40px auto', padding: '0 20px' },
//     searchSection: { background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
//     title: { fontSize: '2.5rem', color: '#333', margin: '0 0 10px 0' },
//     subtitle: { fontSize: '1.1rem', color: '#666', marginBottom: '25px' },
//     uploadButton: { background: '#2e7d32', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '15px' },
//     imagePreviewContainer: { marginTop: '30px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px', display: 'inline-block' },
//     uploadedImage: { maxWidth: '100%', maxHeight: '250px', objectFit: 'contain', borderRadius: '5px' },
//     imageCaption: { marginTop: '10px', fontSize: '0.9rem', color: '#555' },
//     errorText: { color: '#d32f2f', textAlign: 'center', marginTop: '20px', fontSize: '1.1rem', background: '#ffebee', padding: '10px', borderRadius: '8px' },
//     resultsSection: { background: 'white', padding: '30px', borderRadius: '12px', marginTop: '30px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
//     productTitle: { fontSize: '2rem', textAlign: 'center', color: '#333', marginBottom: '10px' },
//     productDetails: { display: 'flex', justifyContent: 'space-around', background: '#f9f9f9', padding: '10px', borderRadius: '8px', marginBottom: '30px', flexWrap: 'wrap', gap: '10px' },
//     journeyHeader: { color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px', marginBottom: '20px' },
//     timeline: { position: 'relative', padding: '0 0 0 20px', borderLeft: '3px solid #27ae60' },
//     timelineItem: { marginBottom: '20px', position: 'relative' },
//     timelineIcon: { position: 'absolute', left: '-31px', top: '0px', width: '18px', height: '18px', background: 'white', border: '3px solid #27ae60', borderRadius: '50%' },
//     timelineContent: { marginLeft: '10px' },
//     timelineAction: { fontWeight: 'bold', textTransform: 'capitalize', fontSize: '1.1rem', color: '#27ae60' },
//     timelineDetails: { margin: '5px 0', color: '#555' },
//     timelineDate: { fontSize: '0.85rem', color: '#888' },
// };

// export default TraceProduct;


import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductHistory } from '../api';
import jsQR from 'jsqr'; // Import the QR code scanner library

const TraceProduct = () => {
    const [searchParams] = useSearchParams();
    const [productId, setProductId] = useState(searchParams.get('id') || '');
    const [history, setHistory] = useState([]);
    const [error, setError] = useState('');
    const [searchedProduct, setSearchedProduct] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const fileInputRef = useRef(null);

    const fetchHistory = async (id) => {
        if (!id) return;
        try {
            const data = await getProductHistory(id);
            if (data.length > 0) {
                setHistory(data);
                const creationRecord = data.find(act => act.action === 'CREATED');
                const priceRecord = data.find(act => act.action === 'PRICE_SET');
                let name = creationRecord ? (creationRecord.details.match(/units of (.*?)\s/) || [])[1] : 'Unknown';
                setSearchedProduct({
                    name: name,
                    id: id,
                    price: priceRecord ? priceRecord.details.split('₹')[1] : 'Not set',
                });
                setError('');
            } else {
                setError('No history found for this Product ID.');
                setHistory([]);
                setSearchedProduct(null);
            }
        } catch (err) {
            setError('An error occurred. Please check the Product ID.');
            setHistory([]);
            setSearchedProduct(null);
        }
    };

    useEffect(() => {
        if (searchParams.get('id')) {
            fetchHistory(searchParams.get('id'));
        }
    }, [searchParams]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setUploadedImage(imageUrl);
                decodeQrCode(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const decodeQrCode = (imageUrl) => {
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, image.width, image.height);
            const imageData = context.getImageData(0, 0, image.width, image.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                const idMatch = code.data.match(/ID:\s*(PROD_[a-zA-Z0-9_]+)/);
                if (idMatch && idMatch[1]) {
                    setProductId(idMatch[1]);
                    fetchHistory(idMatch[1]);
                } else {
                    setError('QR code scanned, but could not extract a valid Product ID.');
                }
            } else {
                setError('No QR code was detected in the uploaded image.');
            }
        };
    };

    return (
        <div style={styles.page}>
            <div style={styles.topBar}>
                <h1 style={styles.brand}>AgriChain</h1>
            </div>
            <div style={styles.container}>
                <div style={styles.searchSection}>
                    <h2 style={styles.title}>Trace Your Produce</h2>
                    <p style={styles.subtitle}>Upload a QR code image to see its full journey from farm to store.</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                    <button style={styles.button} onClick={() => fileInputRef.current.click()}>
                        Upload QR Code Image
                    </button>
                    {uploadedImage && (
                        <div style={styles.imagePreviewContainer}>
                            <img src={uploadedImage} alt="Uploaded QR Code" style={styles.uploadedImage} />
                        </div>
                    )}
                </div>

                {error && <p style={styles.errorText}>{error}</p>}

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

const styles = {
    page: { background: '#f0f4f8', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" },
    topBar: { background: 'white', padding: '15px 40px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
    brand: { color: '#2e7d32', margin: 0, fontSize: '1.8rem' },
    container: { maxWidth: 800, margin: '40px auto', padding: '0 20px' },
    searchSection: { background: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
    title: { fontSize: '2.5rem', color: '#333', margin: '0 0 10px 0' },
    subtitle: { fontSize: '1.1rem', color: '#666', marginBottom: '25px' },
    button: { background: '#2e7d32', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' },
    imagePreviewContainer: { marginTop: '20px' },
    uploadedImage: { maxWidth: '200px', maxHeight: '200px', border: '2px solid #ddd', borderRadius: '8px' },
    errorText: { color: '#d32f2f', textAlign: 'center', marginTop: '20px', fontSize: '1.1rem' },
    resultsSection: { background: 'white', padding: '30px', borderRadius: '12px', marginTop: '30px', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' },
    productTitle: { fontSize: '2rem', textAlign: 'center', color: '#333', marginBottom: '10px' },
    productDetails: { display: 'flex', justifyContent: 'space-around', background: '#f9f9f9', padding: '10px', borderRadius: '8px', marginBottom: '30px' },
    journeyHeader: { color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px', marginBottom: '20px' },
    timeline: { position: 'relative', padding: '0 0 0 20px', borderLeft: '3px solid #27ae60' },
    timelineItem: { marginBottom: '20px', position: 'relative' },
    timelineIcon: { position: 'absolute', left: '-31px', top: '0px', width: '18px', height: '18px', background: 'white', border: '3px solid #27ae60', borderRadius: '50%' },
    timelineContent: { marginLeft: '10px' },
    timelineAction: { fontWeight: 'bold', textTransform: 'capitalize', fontSize: '1.1rem', color: '#27ae60' },
    timelineDetails: { margin: '5px 0', color: '#555' },
    timelineDate: { fontSize: '0.85rem', color: '#888' },
};

export default TraceProduct;