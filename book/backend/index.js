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

main().then(()=>console.log("ok")).catch(err => console.log(err));

app.use(cors());
app.use(express.json());
/*app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
})); */

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use(`/`, (req,res)=>{
   res.send("Hello")
  })
}

app.listen(port, ()=>{
  console.log(`port is ${port}`)
})