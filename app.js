import express from 'express'
import connectDB from "./db/connectdb.js";
import admin_web from "./routes/admin_routes/web.js";
const app = express()
const port = process.env.PORT || '3000'
const DATABASE_URL =  process.env.DATABASE_URL || "mongodb://root:root@mongodb:27017/";

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json())

// Load Routes
app.use("/manage-admin",admin_web)

app.listen(port, () => {
 console.log(`Server listening at http://localhost:${port}`)
})