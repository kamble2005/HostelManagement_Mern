import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import hostelRoutes from "./routes/hostelRoutes.js";
import cors from "cors";
import n from "node:dns/promises"
n.setServers(["1.1.1.1","8.8.8.8"])
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(cors(
  {
    //origin:`http://localhost:5173`
  }
));
app.use(express.json());
app.use("/hostels", hostelRoutes);

// MongoDB connect
connectDB().then(() => {

app.listen(port, () => {
  console.log(`http://localhost:${port}/hostels`);
})
})
