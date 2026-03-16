require("dotenv").config();
const connectDB = require("./src/config/connectDB");
const app = require("./src/app");

const PORT = process.env.PORT;
const URL = process.env.URL;
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`server is running on ${URL}/${PORT}`);
  })
})()