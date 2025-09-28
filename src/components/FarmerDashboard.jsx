import { useState, useEffect } from "react";
import { createProduct, getProducts } from "../api";

const mockPrices = {
    wheat: 25.5, rice: 40.0, tomato: 15.0, potato: 12.0, onion: 18.0,
    mango: 100.0, apple: 120.0, banana: 40.0, grape: 150.0, corn: 22.0, coconut: 30.0, sugarcane: 28.0,
    milk: 50.0, egg: 5.0, chicken: 120.0, fish: 200.0, meat: 250.0,
    tea: 300.0, coffee: 400.0, spices: 350.0
};

const FarmerDashboard = ({ user, onLogout }) => {
    const [batches, setBatches] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [totalCost, setTotalCost] = useState(0);

    const loadBatches = async () => {
        if (user && user.public_id) {
            try {
                const data = await getProducts(user.public_id);
                setBatches(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to load batches:", error);
                alert("Could not load your products. Please check the connection to the backend.");
            }
        }
    };

    useEffect(() => {
        loadBatches();
    }, [user]);

    useEffect(() => {
        const p = parseFloat(price);
        const q = parseInt(quantity, 10);
        setTotalCost((!isNaN(p) && !isNaN(q) && p > 0 && q > 0) ? p * q : 0);
    }, [price, quantity]);

    const handleNameChange = (e) => {
        const name = e.target.value;
        setProductName(name);

        const key = name.toLowerCase().trim();

        // ✅ Only set price if the word exactly matches a mock price
        if (mockPrices.hasOwnProperty(key)) {
            setPrice(mockPrices[key].toString());
        } else {
            setPrice("");
        }
    };
    
    const resetForm = () => {
        setProductName("");
        setPrice("");
        setQuantity("");
        setIsCreating(false);
    };

    const handleCreateBatch = async (e) => {
        e.preventDefault();
        if (!productName.trim() || totalCost <= 0) {
            alert("Please fill in all fields correctly.");
            return;
        }
        try {
            const newBatch = await createProduct(productName.trim(), price, quantity, user.public_id);
            if (newBatch.error) {
                alert(`Error: ${newBatch.error}`);
            } else {
                alert(`✅ Batch of ${newBatch.name} created successfully!`);
                loadBatches();
                resetForm();
            }
        } catch (err) {
            alert("An unexpected error occurred while creating the batch.");
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h2 style={styles.title}>🌱 Farmer Dashboard</h2>
                
                {!isCreating ? (
                    <button style={styles.buttonPrimaryCenter} onClick={() => setIsCreating(true)}>
                        + Create New Batch
                    </button>
                ) : (
                    <div style={styles.formContainer}>
                        <h3 style={styles.subHeader}>New Product Batch</h3>
                        <form onSubmit={handleCreateBatch}>
                            <input
                                style={styles.input}
                                type="text"
                                value={productName}
                                onChange={handleNameChange}
                                placeholder="Enter Product Name (e.g., Rice)"
                                required
                            />
                            <div style={styles.inlineInputs}>
                                <input
                                    style={{...styles.input, ...styles.inlineInput}}
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Price per Unit (₹)"
                                    step="0.01" min="0.01" required
                                />
                                <input
                                    style={{...styles.input, ...styles.inlineInput}}
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="Quantity (units)"
                                    step="1" min="1" required
                                />
                            </div>
                            {totalCost > 0 && (
                                <p style={styles.totalCost}>
                                    Total Batch Value: ₹{totalCost.toFixed(2)}
                                </p>
                            )}
                            <div style={styles.buttonGroup}>
                                <button type="submit" style={styles.buttonPrimary}>Create Batch</button>
                                <button type="button" style={styles.buttonSecondary} onClick={resetForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                <h3 style={{...styles.subHeader, marginTop: '40px'}}>Your Existing Batches</h3>
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Batch ID</th>
                                <th style={styles.th}>Name</th>
                                <th style={styles.th}>Quantity</th>
                                <th style={styles.th}>Unit Price (₹)</th>
                                <th style={styles.th}>Total Value (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batches.length > 0 ? (
                                batches.map((batch) => (
                                    <tr key={batch.product_uid}>
                                        <td style={styles.td}>{batch.product_uid}</td>
                                        <td style={styles.td}>{batch.name}</td>
                                        <td style={styles.td}>{batch.quantity}</td>
                                        <td style={styles.td}>{Number(batch.price).toFixed(2)}</td>
                                        <td style={styles.td}>{Number(batch.total_cost).toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={styles.tdCenter}>No batches found. Create one to get started!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- STYLES ---
const styles = {
    page: { background: '#f0f4f8', minHeight: 'calc(100vh - 80px)', paddingTop: '40px' },
    container: { maxWidth: 900, margin: 'auto', background: 'white', borderRadius: 16, padding: '30px 40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' },
    title: { color: '#2c6b2f', fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '30px' },
    formContainer: { background: '#f8f9fa', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' },
    subHeader: { color: '#2c6b2f', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' },
    input: { width: '100%', padding: '12px 15px', fontSize: '1rem', borderRadius: 8, border: '1.5px solid #cbd5e0', boxSizing: 'border-box', marginBottom: '15px' },
    inlineInputs: { display: 'flex', gap: '15px' },
    inlineInput: { flex: 1 },
    totalCost: { fontWeight: 600, fontSize: '1.1rem', color: '#2c6b2f', textAlign: 'center', margin: '10px 0' },
    buttonGroup: { display: 'flex', gap: '10px', justifyContent: 'center' },
    buttonPrimary: { background: '#4a7c24', color: 'white', border: 'none', padding: '12px 25px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '1rem' },
    buttonPrimaryCenter: { display: 'block', margin: '20px auto', background: '#4a7c24', color: 'white', border: 'none', padding: '12px 25px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '1rem' },
    buttonSecondary: { background: '#6c757d', color: 'white', border: 'none', padding: '12px 25px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '1rem' },
    tableContainer: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
    th: { background: '#e9f0db', color: '#3c6e47', padding: '12px 15px', textAlign: 'left', fontWeight: 'bold' },
    td: { padding: '12px 15px', borderBottom: '1px solid #e2e8f0', color: '#333' },
    tdCenter: { padding: '20px', textAlign: 'center', color: '#777' },
};

export default FarmerDashboard;
