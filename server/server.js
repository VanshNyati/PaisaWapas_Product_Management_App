// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://paisawapas-product-management.onrender.com', 'https://paisawapas-product-management.vercel.app']
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api", productRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Product Management API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
