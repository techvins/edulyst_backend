import express from 'express'
import cors from 'cors'
import connectDB from "./db/connectdb.js";
import admin_web from "./routes/admin_routes/web.js";
import college_web from "./routes/college_routes/web.js";
import course_web from "./routes/course_routes/web.js";
import student_web from "./routes/student_routes/web.js";
const app = express()
const port = process.env.PORT || '3000'
const DATABASE_URL =  process.env.DATABASE_URL || "mongodb://root:root@mongodb:27017/" ;
// const DATABASE_URL =  "mongodb://localhost:27017/";


// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001','https://edulyst.techvins.com','http://edulyst.techvins.com'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions)); // Use the cors middleware with your options

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json())

// Load Routes
app.use("/manage-admin",admin_web)
app.use("/college",college_web)
app.use("/course",course_web)
app.use("/student",student_web)

app.listen(port, () => {
 console.log(`Server listening at http://localhost:${port}`)
})