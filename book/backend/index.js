const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const cors= require("cors")

const bookRoutes = require('./src/books/book.route')
const orderRoutes=require('./src/orders/order.route')
const userRoutes= require('./src/users/user.route')
const adminRoutes= require('./src/stats/admin.stats')

const app=express()
const port=process.env.PORT || 5000;

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

app.get('/', (req,res)=>{
  res.send("BookStore API is running")
})

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("MongoDB connected");
  app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
  })
}

main().catch(err => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});