import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import contactRoutes from "./routes/contacts.ts"

const app = express();
const PORT: string | number =
  process.env.BACKEND_PORT || process.env.PORT || 5000;
const MONGODB_URI: string =
  process.env.MONGO_URI || "";

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });
