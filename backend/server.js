require("dotenv").config();
require('dns').setDefaultResultOrder('ipv4first');

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express(); // ✅ FIRST create app

// middleware
app.use(cors());
app.use(express.json());

// routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("DB Error:", err));

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ THEN start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});