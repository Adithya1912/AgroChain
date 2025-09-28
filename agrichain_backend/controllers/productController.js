// // import pool from "../db/index.js";

// // // Helper function to generate a unique product ID
// // const generateProductUID = () => `PROD_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

// // // CREATE a new product (for farmers)
// // export const createProduct = async (req, res) => {
// //   try {
// //     const { name, price, quantity, farmerPublicId } = req.body;

// //     if (!name || !price || !quantity || !farmerPublicId) {
// //       return res.status(400).json({ error: "Missing required fields: name, price, quantity, farmerPublicId" });
// //     }

// //     const total_cost = parseFloat(price) * parseInt(quantity);
// //     const product_uid = generateProductUID();

// //     const result = await pool.query(
// //       "INSERT INTO products (product_uid, name, current_owner, price, quantity, total_cost) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
// //       [product_uid, name, farmerPublicId, price, quantity, total_cost]
// //     );

// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [product_uid, farmerPublicId, "CREATED", `${quantity} units of ${name} created with total cost ₹${total_cost.toFixed(2)}`]
// //     );

// //     res.status(201).json(result.rows[0]);
// //   } catch (err) {
// //     console.error("CreateProduct error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // GET all products, optionally filtered by the owner's ID
// // export const getProducts = async (req, res) => {
// //   try {
// //     const { ownerId } = req.query;
// //     let result;

// //     if (ownerId) {
// //       result = await pool.query("SELECT * FROM products WHERE current_owner = $1 ORDER BY created_at DESC", [ownerId]);
// //     } else {
// //       result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
// //     }

// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetProducts error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // GET a single product by its unique ID (for distributor search)
// // export const getProductByUid = async (req, res) => {
// //     try {
// //         const { productUid } = req.params;
// //         const result = await pool.query("SELECT * FROM products WHERE product_uid = $1", [productUid]);

// //         if (result.rows.length === 0) {
// //             return res.status(404).json({ error: "Product not found" });
// //         }
        
// //         res.json(result.rows[0]);
// //     } catch (err) {
// //         console.error("GetProductByUid error:", err);
// //         res.status(500).json({ error: err.message });
// //     }
// // };


// // // GET the full activity history for a specific product
// // export const getProductHistory = async (req, res) => {
// //   try {
// //     const { productUid } = req.params;
// //     const result = await pool.query("SELECT * FROM activities WHERE product_uid=$1 ORDER BY created_at ASC", [productUid]);
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetProductHistory error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // TRANSFER ownership of a product from one user to another
// // export const transferOwnership = async (req, res) => {
// //   try {
// //     const { productUid, newOwnerPublicId, actorId } = req.body;

// //     if (!productUid || !newOwnerPublicId || !actorId) {
// //         return res.status(400).json({ error: "Missing required fields." });
// //     }

// //     // **IMPORTANT SECURITY CHECK**: Verify the person making the request is the current owner
// //     const productCheck = await pool.query("SELECT current_owner FROM products WHERE product_uid = $1", [productUid]);
    
// //     if (productCheck.rows.length === 0) {
// //         return res.status(404).json({ error: "Product not found." });
// //     }

// //     const currentOwner = productCheck.rows[0].current_owner;
// //     if (currentOwner !== actorId) {
// //         return res.status(403).json({ error: "Forbidden: You are not the owner of this product." });
// //     }

// //     // If check passes, proceed with the transfer
// //     const result = await pool.query(
// //       "UPDATE products SET current_owner=$1 WHERE product_uid=$2 RETURNING *",
// //       [newOwnerPublicId, productUid]
// //     );

// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [productUid, actorId, "TRANSFER", `Transferred ownership from ${currentOwner} to ${newOwnerPublicId}`]
// //     );

// //     res.json(result.rows[0]);
// //   } catch (err) {
// //     console.error("Transfer error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };


// // import pool from "../db/index.js";

// // const generateProductUID = () => `PROD_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

// // export const createProduct = async (req, res) => {
// //   try {
// //     const { name, price, quantity, farmerPublicId } = req.body;
// //     if (!name || !price || !quantity || !farmerPublicId) {
// //       return res.status(400).json({ error: "Missing required fields" });
// //     }
// //     const total_cost = parseFloat(price) * parseInt(quantity);
// //     const product_uid = generateProductUID();

// //     const result = await pool.query(
// //       "INSERT INTO products (product_uid, name, current_owner, price, quantity, total_cost) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
// //       [product_uid, name, farmerPublicId, price, quantity, total_cost]
// //     );

// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [product_uid, farmerPublicId, "CREATED", `${quantity} units of ${name} created with total cost ₹${total_cost.toFixed(2)}`]
// //     );

// //     res.status(201).json(result.rows[0]);
// //   } catch (err) {
// //     console.error("CreateProduct error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // export const getProducts = async (req, res) => {
// //   try {
// //     const { ownerId } = req.query;
// //     let result;
// //     if (ownerId) {
// //       result = await pool.query("SELECT * FROM products WHERE current_owner = $1 ORDER BY created_at DESC", [ownerId]);
// //     } else {
// //       result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
// //     }
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetProducts error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // ** THIS IS THE NEW FUNCTION FOR THE SEARCH FEATURE **
// // export const getProductByUid = async (req, res) => {
// //     try {
// //         const { productUid } = req.params;
// //         const result = await pool.query("SELECT * FROM products WHERE product_uid = $1", [productUid]);

// //         if (result.rows.length === 0) {
// //             return res.status(404).json({ error: "Product not found" });
// //         }
        
// //         res.json(result.rows[0]);
// //     } catch (err) {
// //         console.error("GetProductByUid error:", err);
// //         res.status(500).json({ error: err.message });
// //     }
// // };

// // export const getProductHistory = async (req, res) => {
// //   try {
// //     const { productUid } = req.params;
// //     const result = await pool.query("SELECT * FROM activities WHERE product_uid=$1 ORDER BY created_at ASC", [productUid]);
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetProductHistory error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // export const transferOwnership = async (req, res) => {
// //   try {
// //     const { productUid, newOwnerPublicId, actorId } = req.body;
// //     if (!productUid || !newOwnerPublicId || !actorId) {
// //         return res.status(400).json({ error: "Missing required fields." });
// //     }
// //     const productCheck = await pool.query("SELECT current_owner FROM products WHERE product_uid = $1", [productUid]);
// //     if (productCheck.rows.length === 0) {
// //         return res.status(404).json({ error: "Product not found." });
// //     }
// //     const currentOwner = productCheck.rows[0].current_owner;
// //     if (currentOwner !== actorId) {
// //         return res.status(403).json({ error: "Forbidden: You are not the owner of this product." });
// //     }
// //     const result = await pool.query(
// //       "UPDATE products SET current_owner=$1 WHERE product_uid=$2 RETURNING *",
// //       [newOwnerPublicId, productUid]
// //     );
// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [productUid, actorId, "TRANSFER", `Transferred ownership from ${currentOwner} to ${newOwnerPublicId}`]
// //     );
// //     res.json(result.rows[0]);
// //   } catch (err) {
// //     console.error("Transfer error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
  
// // };

// // import pool from "../db/index.js";

// // // Helper function to generate a unique product ID
// // const generateProductUID = () => `PROD_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

// // // Farmer creates a new batch of products
// // export const createProduct = async (req, res) => {
// //   try {
// //     const { name, price, quantity, farmerPublicId } = req.body;

// //     if (!name || !price || !quantity || !farmerPublicId) {
// //       return res.status(400).json({ error: "Missing required fields: name, price, quantity, farmerPublicId" });
// //     }

// //     const total_cost = parseFloat(price) * parseInt(quantity, 10);
// //     const product_uid = generateProductUID();

// //     const result = await pool.query(
// //       "INSERT INTO products (product_uid, name, current_owner, price, quantity, total_cost) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
// //       [product_uid, name, farmerPublicId, price, quantity, total_cost]
// //     );

// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [product_uid, farmerPublicId, "CREATED", `${quantity} units of ${name} created with total cost ₹${total_cost.toFixed(2)}`]
// //     );

// //     res.status(201).json(result.rows[0]);
// //   } catch (err) {
// //     console.error("CreateProduct error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // **FIXED**: Distributor acquires a product and adds a transport fee
// // export const addTransportFee = async (req, res) => {
// //   try {
// //     const { productUid, distributorId, transportFee } = req.body;

// //     if (!productUid || !distributorId || transportFee == null) {
// //       return res.status(400).json({ error: "Missing required fields" });
// //     }

// //     // Update the product's owner and transport fee in one query
// //     const result = await pool.query(
// //       "UPDATE products SET current_owner = $1, transport_fee = $2 WHERE product_uid = $3 RETURNING *",
// //       [distributorId, transportFee, productUid]
// //     );

// //     if (result.rows.length === 0) {
// //       return res.status(404).json({ error: "Product not found" });
// //     }

// //     // Log this action in the activities table
// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [
// //         productUid,
// //         distributorId,
// //         "ACQUIRED & FEE ADDED",
// //         `Acquired by distributor. Transport fee set to ₹${transportFee}`,
// //       ]
// //     );

// //     res.json(result.rows[0]);
// //   } catch (err) {
// //     console.error("addTransportFee error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };


// // // Get ALL products in the system (for the distributor to search)
// // export const getAllProducts = async (req, res) => {
// //   try {
// //     const result = await pool.query("SELECT * FROM products");
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetAllProducts error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // Get products owned by a specific user
// // export const getProductsByOwner = async (req, res) => {
// //   try {
// //     const { ownerId } = req.query;
// //     if (!ownerId) {
// //       return res.status(400).json({ error: "Missing ownerId query parameter" });
// //     }
// //     const result = await pool.query(
// //       "SELECT * FROM products WHERE current_owner = $1 ORDER BY created_at DESC",
// //       [ownerId]
// //     );
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetProductsByOwner error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // Get the history/activity for a single product
// // export const getProductHistory = async (req, res) => {
// //   try {
// //     const { productUid } = req.params;
// //     const result = await pool.query(
// //       "SELECT * FROM activities WHERE product_uid=$1 ORDER BY created_at ASC",
// //       [productUid]
// //     );
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetProductHistory error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };


// // --- Other functions (transferOwnership, etc.) can be added here if needed ---
// // --- For now they are removed to keep the file clean for this specific fix ---

// // import pool from "../db/index.js";

// // // Helper function to generate a unique product ID
// // const generateProductUID = () => `PROD_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

// // // For Farmer: Creates a new batch of products
// // export const createProduct = async (req, res) => {
// //   try {
// //     const { name, price, quantity, farmerPublicId } = req.body;
// //     if (!name || !price || !quantity || !farmerPublicId) {
// //       return res.status(400).json({ error: "Missing required fields." });
// //     }

// //     const total_cost = parseFloat(price) * parseInt(quantity, 10);
// //     const product_uid = generateProductUID();

// //     const result = await pool.query(
// //       "INSERT INTO products (product_uid, name, current_owner, price, quantity, total_cost) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
// //       [product_uid, name, farmerPublicId, price, quantity, total_cost]
// //     );

// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [product_uid, farmerPublicId, "CREATED", `${quantity} units of ${name} created with total cost ₹${total_cost.toFixed(2)}`]
// //     );

// //     res.status(201).json(result.rows[0]);
// //   } catch (err) {
// //     console.error("CreateProduct error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // For Distributor: Acquires a product and adds a transport fee
// // export const addTransportFee = async (req, res) => {
// //   try {
// //     const { productUid, distributorId, transportFee } = req.body;
// //     if (!productUid || !distributorId || transportFee == null) {
// //       return res.status(400).json({ error: "Missing required fields." });
// //     }

// //     const result = await pool.query(
// //       "UPDATE products SET current_owner = $1, transport_fee = $2 WHERE product_uid = $3 RETURNING *",
// //       [distributorId, transportFee, productUid]
// //     );

// //     if (result.rows.length === 0) {
// //       return res.status(404).json({ error: "Product not found." });
// //     }

// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [productUid, distributorId, "ACQUIRED & FEE ADDED", `Acquired by distributor. Transport fee set to ₹${transportFee}`]
// //     );

// //     res.json(result.rows[0]);
// //   } catch (err) {
// //     console.error("addTransportFee error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // For Retailer: Sells a product to a new owner (e.g., a consumer)
// // export const transferOwnership = async (req, res) => {
// //   try {
// //     const { productUid, newOwnerPublicId, actorId } = req.body;
// //     if (!productUid || !newOwnerPublicId || !actorId) {
// //         return res.status(400).json({ error: "Missing required fields." });
// //     }

// //     const result = await pool.query(
// //       "UPDATE products SET current_owner = $1 WHERE product_uid = $2 RETURNING *",
// //       [newOwnerPublicId, productUid]
// //     );

// //     if (result.rows.length === 0) {
// //       return res.status(404).json({ error: "Product not found to transfer." });
// //     }

// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [productUid, actorId, "TRANSFER", `Transferred ownership to ${newOwnerPublicId}`]
// //     );

// //     res.json(result.rows[0]);
// //   } catch (err) {
// //     console.error("TransferOwnership error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // For Distributor: Gets all products in the system to search
// // export const getAllProducts = async (req, res) => {
// //   try {
// //     const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetAllProducts error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // For All Roles: Gets products owned by a specific user
// // export const getProducts = async (req, res) => {
// //   try {
// //     const { ownerId } = req.query;
// //     if (!ownerId) {
// //       return res.status(400).json({ error: "Missing ownerId query parameter." });
// //     }
// //     const result = await pool.query(
// //       "SELECT * FROM products WHERE current_owner = $1 ORDER BY created_at DESC",
// //       [ownerId]
// //     );
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetProducts error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // For All Roles: Gets the activity history for a single product
// // export const getProductHistory = async (req, res) => {
// //   try {
// //     const { productUid } = req.params;
// //     const result = await pool.query(
// //       "SELECT * FROM activities WHERE product_uid=$1 ORDER BY created_at ASC",
// //       [productUid]
// //     );
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetProductHistory error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
  
// // };

// // import pool from "../db/index.js";

// // // Helper function to generate a unique product ID
// // const generateProductUID = () => `PROD_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

// // // For Farmer: Creates a new batch of products
// // export const createProduct = async (req, res) => {
// //   try {
// //     const { name, price, quantity, farmerPublicId } = req.body;
    
// //     // --- DEBUG LOG ---
// //     console.log(`[DEBUG] Creating product for farmer: ${farmerPublicId}`);

// //     if (!name || !price || !quantity || !farmerPublicId) {
// //       return res.status(400).json({ error: "Missing required fields." });
// //     }

// //     const total_cost = parseFloat(price) * parseInt(quantity, 10);
// //     const product_uid = generateProductUID();

// //     const result = await pool.query(
// //       "INSERT INTO products (product_uid, name, current_owner, price, quantity, total_cost) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
// //       [product_uid, name, farmerPublicId, price, quantity, total_cost]
// //     );

// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [product_uid, farmerPublicId, "CREATED", `${quantity} units of ${name} created with total cost ₹${total_cost.toFixed(2)}`]
// //     );

// //     res.status(201).json(result.rows[0]);
// //   } catch (err) {
// //     console.error("CreateProduct error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };


// // // For All Roles: Gets products owned by a specific user
// // export const getProducts = async (req, res) => {
// //   try {
// //     const { ownerId } = req.query;
    
// //     // --- DEBUG LOG ---
// //     console.log(`[DEBUG] Fetching products for ownerId: ${ownerId}`);

// //     if (!ownerId) {
// //       return res.status(400).json({ error: "Missing ownerId query parameter." });
// //     }
// //     const result = await pool.query(
// //       "SELECT * FROM products WHERE current_owner = $1 ORDER BY created_at DESC",
// //       [ownerId]
// //     );

// //     // --- DEBUG LOG ---
// //     console.log(`[DEBUG] Found ${result.rows.length} products.`);

// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetProducts error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // ... (all your other functions like addTransportFee, transferOwnership, etc., remain below)
// // export const addTransportFee = async (req, res) => { /* ... */ };
// // export const transferOwnership = async (req, res) => { /* ... */ };
// // export const getAllProducts = async (req, res) => { /* ... */ };
// // export const getProductHistory = async (req, res) => { /* ... */ };
// // export const requestTransferToRetailer = async (req, res) => { /* ... */ };
// // export const getPendingRetailerRequests = async (req, res) => { /* ... */ };
// // export const respondToRetailerRequest = async (req, res) => { /* ... */ };
// // export const acknowledgeRejection = async (req, res) => { /* ... */ };

// // import pool from "../db/index.js";

// // const generateProductUID = () => `PROD_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

// // export const createProduct = async (req, res) => {
// //   try {
// //     const { name, price, quantity, farmerPublicId } = req.body;
// //     if (!name || !price || !quantity || !farmerPublicId) {
// //       return res.status(400).json({ error: "Missing required fields." });
// //     }
// //     const total_cost = parseFloat(price) * parseInt(quantity, 10);
// //     const product_uid = generateProductUID();
// //     const result = await pool.query(
// //       "INSERT INTO products (product_uid, name, current_owner, price, quantity, total_cost, status) VALUES ($1, $2, $3, $4, $5, $6, 'AVAILABLE') RETURNING *",
// //       [product_uid, name, farmerPublicId, price, quantity, total_cost]
// //     );
// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [product_uid, farmerPublicId, "CREATED", `${quantity} units of ${name} created with total cost ₹${total_cost.toFixed(2)}`]
// //     );
// //     res.status(201).json(result.rows[0]);
// //   } catch (err) {
// //     console.error("CreateProduct SQL Error:", err);
// //     res.status(500).json({ error: "Database error during product creation." });
// //   }
// // };

// // export const getProducts = async (req, res) => {
// //   try {
// //     const { ownerId } = req.query;
// //     if (!ownerId) {
// //       return res.status(400).json({ error: "Missing ownerId query parameter." });
// //     }
// //     const result = await pool.query(
// //       "SELECT * FROM products WHERE current_owner = $1 ORDER BY created_at DESC",
// //       [ownerId]
// //     );
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetProducts SQL Error:", err);
// //     res.status(500).json({ error: "Database error while fetching products." });
// //   }
// // };

// // export const getAllProducts = async (req, res) => {
// //   try {
// //     const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetAllProducts SQL Error:", err);
// //     res.status(500).json({ error: "Database error while fetching all products." });
// //   }
// // };

// // // ... (All other functions remain the same)
// // export const addTransportFee = async (req, res) => { /* ... */ };
// // export const transferOwnership = async (req, res) => { /* ... */ };
// // export const getProductHistory = async (req, res) => { /* ... */ };
// // export const requestTransferToRetailer = async (req, res) => { /* ... */ };
// // export const getPendingRetailerRequests = async (req, res) => { /* ... */ };
// // export const respondToRetailerRequest = async (req, res) => { /* ... */ };
// // export const acknowledgeRejection = async (req, res) => { /* ... */ };

// // import pool from "../db/index.js";

// // const generateProductUID = () => `PROD_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

// // // For Farmer: Creates a new batch of products
// // export const createProduct = async (req, res) => {
// //   try {
// //     const { name, price, quantity, farmerPublicId } = req.body;
// //     if (!name || !price || !quantity || !farmerPublicId) {
// //       return res.status(400).json({ error: "Missing required fields." });
// //     }
// //     const total_cost = parseFloat(price) * parseInt(quantity, 10);
// //     const product_uid = generateProductUID();
// //     const result = await pool.query(
// //       "INSERT INTO products (product_uid, name, current_owner, price, quantity, total_cost, status) VALUES ($1, $2, $3, $4, $5, $6, 'AVAILABLE') RETURNING *",
// //       [product_uid, name, farmerPublicId, price, quantity, total_cost]
// //     );
// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [product_uid, farmerPublicId, "CREATED", `${quantity} units of ${name} created with total cost ₹${total_cost.toFixed(2)}`]
// //     );
// //     res.status(201).json(result.rows[0]);
// //   } catch (err) {
// //     console.error("CreateProduct SQL Error:", err);
// //     res.status(500).json({ error: "Database error during product creation." });
// //   }
// // };

// // // For Distributor: Acquires a product from a farmer and adds a transport fee
// // export const addTransportFee = async (req, res) => {
// //   try {
// //     const { productUid, distributorId, transportFee } = req.body;
// //     if (!productUid || !distributorId || transportFee == null) {
// //       return res.status(400).json({ error: "Missing required fields." });
// //     }
// //     const result = await pool.query(
// //       "UPDATE products SET current_owner = $1, transport_fee = $2 WHERE product_uid = $3 RETURNING *",
// //       [distributorId, transportFee, productUid]
// //     );
// //     if (result.rows.length === 0) {
// //       return res.status(404).json({ error: "Product not found." });
// //     }
// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [productUid, distributorId, "ACQUIRED & FEE ADDED", `Acquired by distributor. Transport fee set to ₹${transportFee}`]
// //     );
// //     res.json(result.rows[0]);
// //   } catch (err) {
// //     console.error("addTransportFee SQL Error:", err);
// //     res.status(500).json({ error: "Database error while acquiring product." });
// //   }
// // };

// // // For Retailer: Sells a product to a consumer (simple transfer)
// // export const transferOwnership = async (req, res) => {
// //   try {
// //     const { productUid, newOwnerPublicId, actorId } = req.body;
// //     if (!productUid || !newOwnerPublicId || !actorId) {
// //       return res.status(400).json({ error: "Missing required fields." });
// //     }
// //     const result = await pool.query(
// //       "UPDATE products SET current_owner = $1 WHERE product_uid = $2 RETURNING *",
// //       [newOwnerPublicId, productUid]
// //     );
// //     if (result.rows.length === 0) {
// //       return res.status(404).json({ error: "Product not found to transfer." });
// //     }
// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [productUid, actorId, "TRANSFER", `Transferred ownership to ${newOwnerPublicId}`]
// //     );
// //     res.json(result.rows[0]);
// //   } catch (err) {
// //     console.error("TransferOwnership SQL Error:", err);
// //     res.status(500).json({ error: "Database error during ownership transfer." });
// //   }
// // };

// // // For Distributor: Gets all products to search
// // export const getAllProducts = async (req, res) => {
// //   try {
// //     const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetAllProducts SQL Error:", err);
// //     res.status(500).json({ error: "Database error while fetching all products." });
// //   }
// // };

// // // For All Roles: Gets products for a specific owner
// // export const getProducts = async (req, res) => {
// //   try {
// //     const { ownerId } = req.query;
// //     if (!ownerId) {
// //       return res.status(400).json({ error: "Missing ownerId query parameter." });
// //     }
// //     const result = await pool.query(
// //       "SELECT * FROM products WHERE current_owner = $1 ORDER BY created_at DESC",
// //       [ownerId]
// //     );
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetProducts SQL Error:", err);
// //     res.status(500).json({ error: "Database error while fetching products." });
// //   }
// // };

// // // For All Roles: Gets activity history for a product
// // export const getProductHistory = async (req, res) => {
// //   try {
// //     const { productUid } = req.params;
// //     const result = await pool.query(
// //       "SELECT * FROM activities WHERE product_uid=$1 ORDER BY created_at ASC",
// //       [productUid]
// //     );
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetProductHistory SQL Error:", err);
// //     res.status(500).json({ error: "Database error while fetching history." });
// //   }
// // };

// // // --- NEW FUNCTIONS FOR DISTRIBUTOR -> RETAILER WORKFLOW ---

// // export const requestTransferToRetailer = async (req, res) => {
// //   try {
// //     const { productUid, retailerId, actorId } = req.body;
// //     const result = await pool.query(
// //       "UPDATE products SET status = 'PENDING_APPROVAL', pending_retailer_id = $1 WHERE product_uid = $2 AND current_owner = $3 RETURNING *",
// //       [retailerId, productUid, actorId]
// //     );
// //     if (result.rows.length === 0) {
// //       return res.status(404).json({ error: "Product not found or you are not the owner." });
// //     }
// //     res.json(result.rows[0]);
// //   } catch (err) {
// //     console.error("RequestTransfer SQL Error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // export const getPendingRetailerRequests = async (req, res) => {
// //   try {
// //     const { retailerId } = req.query;
// //     const result = await pool.query(
// //       "SELECT * FROM products WHERE status = 'PENDING_APPROVAL' AND pending_retailer_id = $1",
// //       [retailerId]
// //     );
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error("GetPending SQL Error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // export const respondToRetailerRequest = async (req, res) => {
// //   try {
// //     const { productUid, retailerId, decision } = req.body;
// //     let result;
// //     if (decision === 'ACCEPT') {
// //       result = await pool.query(
// //         "UPDATE products SET status = 'SOLD', current_owner = $1, pending_retailer_id = NULL WHERE product_uid = $2 AND pending_retailer_id = $1 RETURNING *",
// //         [retailerId, productUid]
// //       );
// //     } else if (decision === 'REJECT') {
// //       result = await pool.query(
// //         "UPDATE products SET status = 'REJECTED' WHERE product_uid = $1 AND pending_retailer_id = $2 RETURNING *",
// //         [productUid, retailerId]
// //       );
// //     } else {
// //       return res.status(400).json({ error: "Invalid decision." });
// //     }
// //     if (result.rows.length === 0) {
// //         return res.status(404).json({ error: "Request not found or it's not for you." });
// //     }
// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [productUid, retailerId, `REQUEST_${decision}ED`, `Retailer ${retailerId} ${decision.toLowerCase()}ed the transfer.`]
// //     );
// //     res.json(result.rows[0]);
// //   } catch (err) {
// //     console.error("RespondToRequest SQL Error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // export const acknowledgeRejection = async (req, res) => {
// //   try {
// //     const { productUid, actorId } = req.body;
// //     const result = await pool.query(
// //       "UPDATE products SET status = 'AVAILABLE', pending_retailer_id = NULL WHERE product_uid = $1 AND current_owner = $2 AND status = 'REJECTED' RETURNING *",
// //       [productUid, actorId]
// //     );
// //      if (result.rows.length === 0) {
// //       return res.status(404).json({ error: "Rejected product not found or you are not the owner." });
// //     }
// //     res.json(result.rows[0]);
// //   } catch (err) {
// //     console.error("AcknowledgeRejection SQL Error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // For Retailer: Sets the final consumer price for a product
// // export const setRetailerPrice = async (req, res) => {
// //   try {
// //     const { productUid, retailerId, newPrice } = req.body;
// //     const result = await pool.query(
// //       "UPDATE products SET retailer_price = $1 WHERE product_uid = $2 AND current_owner = $3 RETURNING *",
// //       [newPrice, productUid, retailerId]
// //     );
// //     if (result.rows.length === 0) {
// //       return res.status(404).json({ error: "Product not found or you are not the owner." });
// //     }
// //     await pool.query(
// //       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
// //       [productUid, retailerId, "PRICE_SET", `Retailer set final price to ₹${Number(newPrice).toFixed(2)}`]
// //     );
// //     res.json(result.rows[0]);
// //   } catch (err) {
// //     console.error("SetRetailerPrice SQL Error:", err);
// //     res.status(500).json({ error: "Database error while setting retailer price." });
// //   }
// // };

// import pool from "../db/index.js";

// const generateProductUID = () => `PROD_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

// // For Farmer: Creates a new batch of products
// export const createProduct = async (req, res) => {
//   try {
//     const { name, price, quantity, farmerPublicId } = req.body;
//     if (!name || !price || !quantity || !farmerPublicId) {
//       return res.status(400).json({ error: "Missing required fields." });
//     }
//     const total_cost = parseFloat(price) * parseInt(quantity, 10);
//     const product_uid = generateProductUID();
//     await pool.query(
//       "INSERT INTO products (product_uid, name, current_owner, price, quantity, total_cost, status) VALUES ($1, $2, $3, $4, $5, $6, 'AVAILABLE') RETURNING *",
//       [product_uid, name, farmerPublicId, price, quantity, total_cost]
//     );
//     await pool.query(
//       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, 'CREATED', $3)",
//       [product_uid, farmerPublicId, `${quantity} units of ${name} created.`]
//     );
//     res.status(201).json({ product_uid });
//   } catch (err) {
//     res.status(500).json({ error: "Database error during product creation." });
//   }
// };

// // For Distributor: Acquires a product from a farmer and adds a transport fee
// export const addTransportFee = async (req, res) => {
//   try {
//     const { productUid, distributorId, transportFee } = req.body;
//     const result = await pool.query(
//       "UPDATE products SET current_owner = $1, transport_fee = $2 WHERE product_uid = $3 RETURNING *",
//       [distributorId, transportFee, productUid]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Product not found." });
//     }
//     await pool.query(
//       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, 'ACQUIRED_&_FEE_ADDED', $3)",
//       [productUid, distributorId, `Transport fee set to ₹${transportFee}`]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: "Database error while acquiring product." });
//   }
// };

// // For Retailer: Sells a product to a consumer (simple transfer)
// export const transferOwnership = async (req, res) => {
//   try {
//     const { productUid, newOwnerPublicId, actorId } = req.body;
//     const result = await pool.query(
//       "UPDATE products SET current_owner = $1 WHERE product_uid = $2 RETURNING *",
//       [newOwnerPublicId, productUid]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Product not found to transfer." });
//     }
//     await pool.query(
//       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, 'SOLD_TO_CONSUMER', $3)",
//       [productUid, actorId, `Sold to consumer ${newOwnerPublicId}`]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: "Database error during ownership transfer." });
//   }
// };

// // For Distributor: Gets all products to search
// export const getAllProducts = async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Database error while fetching all products." });
//   }
// };

// // For All Roles: Gets products for a specific owner
// export const getProducts = async (req, res) => {
//   try {
//     const { ownerId } = req.query;
//     if (!ownerId) {
//       return res.status(400).json({ error: "Missing ownerId query parameter." });
//     }
//     const result = await pool.query(
//       "SELECT * FROM products WHERE current_owner = $1 ORDER BY created_at DESC",
//       [ownerId]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Database error while fetching products." });
//   }
// };

// // --- IMPROVED: This function now gets the actor's name ---
// export const getProductHistory = async (req, res) => {
//   try {
//     const { productUid } = req.params;
//     const result = await pool.query(
//       `SELECT a.*, u.name as actor_name 
//        FROM activities a 
//        JOIN users u ON a.actor_id = u.public_id 
//        WHERE a.product_uid = $1 
//        ORDER BY a.created_at ASC`,
//       [productUid]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     console.error("GetProductHistory SQL Error:", err);
//     res.status(500).json({ error: "Database error while fetching history." });
//   }
// };

// // --- Distributor -> Retailer Workflow ---
// export const requestTransferToRetailer = async (req, res) => {
//   try {
//     const { productUid, retailerId, actorId } = req.body;
//     const result = await pool.query(
//       "UPDATE products SET status = 'PENDING_APPROVAL', pending_retailer_id = $1 WHERE product_uid = $2 AND current_owner = $3 RETURNING *",
//       [retailerId, productUid, actorId]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Product not found or you are not the owner." });
//     }
//     await pool.query(
//       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, 'REQUEST_SENT', $3)",
//       [productUid, actorId, `Request sent to retailer ${retailerId}`]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getPendingRetailerRequests = async (req, res) => {
//   try {
//     const { retailerId } = req.query;
//     const result = await pool.query(
//       "SELECT * FROM products WHERE status = 'PENDING_APPROVAL' AND pending_retailer_id = $1",
//       [retailerId]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const respondToRetailerRequest = async (req, res) => {
//   try {
//     const { productUid, retailerId, decision } = req.body;
//     let result;
//     if (decision === 'ACCEPT') {
//       result = await pool.query(
//         "UPDATE products SET status = 'SOLD', current_owner = $1, pending_retailer_id = NULL WHERE product_uid = $2 AND pending_retailer_id = $1 RETURNING *",
//         [retailerId, productUid]
//       );
//     } else if (decision === 'REJECT') {
//       result = await pool.query(
//         "UPDATE products SET status = 'REJECTED' WHERE product_uid = $1 AND pending_retailer_id = $2 RETURNING *",
//         [productUid, retailerId]
//       );
//     } else {
//       return res.status(400).json({ error: "Invalid decision." });
//     }
//     if (result.rows.length === 0) {
//         return res.status(404).json({ error: "Request not found or it's not for you." });
//     }
//     await pool.query(
//       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
//       [productUid, retailerId, `REQUEST_${decision}ED`, `Retailer ${retailerId} ${decision.toLowerCase()}ed the transfer.`]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const acknowledgeRejection = async (req, res) => {
//   try {
//     const { productUid, actorId } = req.body;
//     const result = await pool.query(
//       "UPDATE products SET status = 'AVAILABLE', pending_retailer_id = NULL WHERE product_uid = $1 AND current_owner = $2 AND status = 'REJECTED' RETURNING *",
//       [productUid, actorId]
//     );
//      if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Rejected product not found or you are not the owner." });
//     }
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const setRetailerPrice = async (req, res) => {
//   try {
//     const { productUid, retailerId, newPrice } = req.body;
//     const result = await pool.query(
//       "UPDATE products SET retailer_price = $1 WHERE product_uid = $2 AND current_owner = $3 RETURNING *",
//       [newPrice, productUid, retailerId]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Product not found or you are not the owner." });
//     }
//     await pool.query(
//       "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, 'PRICE_SET', $3)",
//       [productUid, retailerId, `Retailer set final price to ₹${Number(newPrice).toFixed(2)}`]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: "Database error while setting retailer price." });
//   }
// };


import pool from "../db/index.js";

const generateProductUID = () => `PROD_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

// For Farmer: Creates a new batch of products
export const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, farmerPublicId } = req.body;
    if (!name || !price || !quantity || !farmerPublicId) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const total_cost = parseFloat(price) * parseInt(quantity, 10);
    const product_uid = generateProductUID();
    const result = await pool.query(
      "INSERT INTO products (product_uid, name, current_owner, price, quantity, total_cost, status) VALUES ($1, $2, $3, $4, $5, $6, 'AVAILABLE') RETURNING *",
      [product_uid, name, farmerPublicId, price, quantity, total_cost]
    );
    await pool.query(
      "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, 'CREATED', $3)",
      [product_uid, farmerPublicId, `${quantity} units of ${name} created.`]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("CreateProduct SQL Error:", err);
    res.status(500).json({ error: "Database error during product creation." });
  }
};

// For Distributor: Acquires a product from a farmer and adds a transport fee
export const addTransportFee = async (req, res) => {
  try {
    const { productUid, distributorId, transportFee } = req.body;
    if (!productUid || !distributorId || transportFee == null) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const result = await pool.query(
      "UPDATE products SET current_owner = $1, transport_fee = $2 WHERE product_uid = $3 RETURNING *",
      [distributorId, transportFee, productUid]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found." });
    }
    await pool.query(
      "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, 'ACQUIRED_&_FEE_ADDED', $3)",
      [productUid, distributorId, `Transport fee set to ₹${transportFee}`]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("addTransportFee SQL Error:", err);
    res.status(500).json({ error: "Database error while acquiring product." });
  }
};

// For Retailer: Sells a product to a consumer (simple transfer)
export const transferOwnership = async (req, res) => {
  try {
    const { productUid, newOwnerPublicId, actorId } = req.body;
    if (!productUid || !newOwnerPublicId || !actorId) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const result = await pool.query(
      "UPDATE products SET current_owner = $1 WHERE product_uid = $2 RETURNING *",
      [newOwnerPublicId, productUid]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found to transfer." });
    }
    await pool.query(
      "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, 'SOLD_TO_CONSUMER', $3)",
      [productUid, actorId, `Sold to consumer ${newOwnerPublicId}`]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("TransferOwnership SQL Error:", err);
    res.status(500).json({ error: "Database error during ownership transfer." });
  }
};

// For Distributor: Gets all products to search
export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("GetAllProducts SQL Error:", err);
    res.status(500).json({ error: "Database error while fetching all products." });
  }
};

// For All Roles: Gets products for a specific owner
export const getProducts = async (req, res) => {
  try {
    const { ownerId } = req.query;
    if (!ownerId) {
      return res.status(400).json({ error: "Missing ownerId query parameter." });
    }
    const result = await pool.query(
      "SELECT * FROM products WHERE current_owner = $1 ORDER BY created_at DESC",
      [ownerId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GetProducts SQL Error:", err);
    res.status(500).json({ error: "Database error while fetching products." });
  }
};

// For All Roles: Gets activity history for a product (including actor's name)
export const getProductHistory = async (req, res) => {
  try {
    const { productUid } = req.params;
    const result = await pool.query(
      `SELECT a.*, u.name as actor_name 
       FROM activities a 
       JOIN users u ON a.actor_id = u.public_id 
       WHERE a.product_uid = $1 
       ORDER BY a.created_at ASC`,
      [productUid]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GetProductHistory SQL Error:", err);
    res.status(500).json({ error: "Database error while fetching history." });
  }
};

// --- Distributor -> Retailer Workflow ---

export const requestTransferToRetailer = async (req, res) => {
  try {
    const { productUid, retailerId, actorId } = req.body;
    const result = await pool.query(
      "UPDATE products SET status = 'PENDING_APPROVAL', pending_retailer_id = $1 WHERE product_uid = $2 AND current_owner = $3 RETURNING *",
      [retailerId, productUid, actorId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found or you are not the owner." });
    }
    await pool.query(
      "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, 'REQUEST_SENT', $3)",
      [productUid, actorId, `Request sent to retailer ${retailerId}`]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("RequestTransfer SQL Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getPendingRetailerRequests = async (req, res) => {
  try {
    const { retailerId } = req.query;
    const result = await pool.query(
      "SELECT * FROM products WHERE status = 'PENDING_APPROVAL' AND pending_retailer_id = $1",
      [retailerId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GetPending SQL Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const respondToRetailerRequest = async (req, res) => {
  try {
    const { productUid, retailerId, decision } = req.body;
    let result;
    if (decision === 'ACCEPT') {
      result = await pool.query(
        "UPDATE products SET status = 'SOLD', current_owner = $1, pending_retailer_id = NULL WHERE product_uid = $2 AND pending_retailer_id = $1 RETURNING *",
        [retailerId, productUid]
      );
    } else if (decision === 'REJECT') {
      result = await pool.query(
        "UPDATE products SET status = 'REJECTED' WHERE product_uid = $1 AND pending_retailer_id = $2 RETURNING *",
        [productUid, retailerId]
      );
    } else {
      return res.status(400).json({ error: "Invalid decision." });
    }
    if (result.rows.length === 0) {
        return res.status(404).json({ error: "Request not found or it's not for you." });
    }
    await pool.query(
      "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, $3, $4)",
      [productUid, retailerId, `REQUEST_${decision}ED`, `Retailer ${retailerId} ${decision.toLowerCase()}ed the transfer.`]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("RespondToRequest SQL Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const acknowledgeRejection = async (req, res) => {
  try {
    const { productUid, actorId } = req.body;
    const result = await pool.query(
      "UPDATE products SET status = 'AVAILABLE', pending_retailer_id = NULL WHERE product_uid = $1 AND current_owner = $2 AND status = 'REJECTED' RETURNING *",
      [productUid, actorId]
    );
     if (result.rows.length === 0) {
      return res.status(404).json({ error: "Rejected product not found or you are not the owner." });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("AcknowledgeRejection SQL Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const setRetailerPrice = async (req, res) => {
  try {
    const { productUid, retailerId, newPrice } = req.body;
    const result = await pool.query(
      "UPDATE products SET retailer_price = $1 WHERE product_uid = $2 AND current_owner = $3 RETURNING *",
      [newPrice, productUid, retailerId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found or you are not the owner." });
    }
    await pool.query(
      "INSERT INTO activities (product_uid, actor_id, action, details) VALUES ($1, $2, 'PRICE_SET', $3)",
      [productUid, retailerId, `Retailer set final price to ₹${Number(newPrice).toFixed(2)}`]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("SetRetailerPrice SQL Error:", err);
    res.status(500).json({ error: "Database error while setting retailer price." });
  }
};