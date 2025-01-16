import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "@utils/db";

dotenv.config();

const port = process.env.PORT || 3000;

(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`[server]: Server is running on PORT ${port}`);
  });
})();
