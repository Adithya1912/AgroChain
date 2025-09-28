// import express from "express";
// import {
//   createProduct,
//   // The line that imported 'createDistributorProduct' is now removed
//   transferOwnership,
//   getProducts,
//   getProductByUid,
//   getProductHistory,
// } from "../controllers/productController.js";

// const router = express.Router();

// // Main route to create any product
// router.post("/create", createProduct);

// // The old route for distributors is now removed
// // router.post("/create-distributor-product", createDistributorProduct);

// // Route to get all products (with optional owner filter)
// router.get("/all", getProducts);

// // Route to get a single product by its ID
// router.get("/:productUid", getProductByUid);

// // Route to get the history for a specific product
// router.get("/history/:productUid", getProductHistory);

// // Route to transfer ownership
// router.post("/transfer", transferOwnership);

// export default router;


// import express from "express";
// import {
//   createProduct,
//   transferOwnership,
//   getProducts,
//   getProductByUid, // Make sure to import the new function
//   getProductHistory,
// } from "../controllers/productController.js";

// const router = express.Router();

// // Route to create a product
// router.post("/create", createProduct);

// // Route to get all products (with optional owner filter)
// router.get("/all", getProducts);

// // ** THIS IS THE NEW ROUTE FOR THE SEARCH FEATURE **
// // It must be placed before other routes with parameters like '/history/:productUid'
// router.get("/:productUid", getProductByUid);

// // Route to get the history for a specific product
// router.get("/history/:productUid", getProductHistory);

// // Route to transfer ownership
// router.post("/transfer", transferOwnership);

// export default router;

// import express from "express";
// import {
//   createProduct,
//   addTransportFee,
//   getAllProducts, // <-- Import new function
//   getProductsByOwner, // <-- Renamed for clarity
//   getProductHistory,
// } from "../controllers/productController.js";

// const router = express.Router();

// // Farmer routes
// router.post("/create", createProduct);

// // Distributor routes
// router.post("/acquire", addTransportFee); // Renamed endpoint for clarity
// router.get("/search-all", getAllProducts); // New endpoint for searching

// // General routes
// router.get("/owner", getProductsByOwner); // Renamed for clarity
// router.get("/history/:productUid", getProductHistory);

// export default router;

// import express from "express";
// import {
//   createProduct,
//   addTransportFee,
//   transferOwnership,
//   getAllProducts,
//   getProducts,
//   getProductHistory,
// } from "../controllers/productController.js";

// const router = express.Router();

// // Farmer endpoint
// router.post("/create", createProduct);

// // Distributor endpoints
// router.post("/acquire", addTransportFee);
// router.get("/search-all", getAllProducts);

// // Retailer endpoint
// router.post("/transfer", transferOwnership);

// // General purpose endpoints
// router.get("/owner", getProducts);
// router.get("/history/:productUid", getProductHistory);


// // --- ADD THESE NEW ROUTES TO YOUR productRoutes.js FILE ---

// // New Distributor->Retailer Transfer Workflow
// router.post("/request-transfer", requestTransferToRetailer);
// router.post("/acknowledge-rejection", acknowledgeRejection);

// // New Retailer Request-Approval Workflow
// router.get("/pending-requests", getPendingRetailerRequests);
// router.post("/respond-request", respondToRetailerRequest);

// export default router;

// import express from "express";
// import {
//   // --- EXISTING FUNCTIONS ---
//   createProduct,
//   addTransportFee,
//   transferOwnership,
//   getAllProducts,
//   getProducts,
//   getProductHistory,
//   // --- NEW FUNCTIONS IMPORTED ---
//   requestTransferToRetailer,
//   getPendingRetailerRequests,
//   respondToRetailerRequest,
//   acknowledgeRejection
// } from "../controllers/productController.js";

// const router = express.Router();

// // Farmer endpoint
// router.post("/create", createProduct);

// // Distributor endpoints
// router.post("/acquire", addTransportFee);
// router.get("/search-all", getAllProducts);

// // Retailer endpoint
// router.post("/transfer", transferOwnership);

// // --- NEW ROUTES FOR DISTRIBUTOR -> RETAILER WORKFLOW ---
// router.post("/request-transfer", requestTransferToRetailer);
// router.post("/acknowledge-rejection", acknowledgeRejection);
// router.get("/pending-requests", getPendingRetailerRequests);
// router.post("/respond-request", respondToRetailerRequest);

// // General purpose endpoints
// router.get("/owner", getProducts);
// router.get("/history/:productUid", getProductHistory);

// export default router;

import express from "express";
import {
  // Core functions
  createProduct,
  addTransportFee,
  transferOwnership,
  getAllProducts,
  getProducts,
  getProductHistory,

  // Distributor -> Retailer workflow
  requestTransferToRetailer,
  getPendingRetailerRequests,
  respondToRetailerRequest,
  acknowledgeRejection,

  // Retailer -> Consumer (QR Code)
  setRetailerPrice
} from "../controllers/productController.js";

const router = express.Router();

// Farmer endpoint
router.post("/create", createProduct);

// Distributor endpoints
router.post("/acquire", addTransportFee);
router.get("/search-all", getAllProducts);

// Retailer endpoints
router.post("/transfer", transferOwnership); // For simple sales to consumers
router.post("/set-retailer-price", setRetailerPrice); // For setting price before QR

// Distributor -> Retailer Transfer Workflow
router.post("/request-transfer", requestTransferToRetailer);
router.post("/acknowledge-rejection", acknowledgeRejection);
router.get("/pending-requests", getPendingRetailerRequests);
router.post("/respond-request", respondToRetailerRequest);

// General purpose endpoints
router.get("/owner", getProducts);
router.get("/history/:productUid", getProductHistory);

export default router;