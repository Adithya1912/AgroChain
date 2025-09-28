import 'dotenv/config'; // This MUST be the very first line of your file.

// This debug line will print the database name your server is trying to use.
console.log(`[DEBUG] Server is configured for database: ${process.env.PGDATABASE}`);

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// Create the Express app
const app = express();

// Apply middleware
app.use(cors()); // Allows your frontend to communicate with this backend
app.use(express.json()); // Allows the server to understand JSON request bodies

// Define the base paths for your API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Get the port from the environment variable, or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen for requests
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));