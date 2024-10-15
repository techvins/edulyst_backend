import express from 'express'
import connectDB from "./db/connectdb.js";
import college_web from "./routes/college_routes/web.js";
import course_web from "./routes/course_routes/web.js";
const app = express()
const port = process.env.PORT || '3000'
const DATABASE_URL =  process.env.DATABASE_URL || "mongodb://root:root@mongodb:27017/";

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json())

// Load Routes
app.use("/college",college_web)
app.use("/course",course_web)


app.listen(port, () => {
 console.log(`Server listening at http://localhost:${port}`)
})