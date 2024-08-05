const express = require("express");
const app = express();
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");

require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connection } = require("./config/db");
const { userRoute } = require("./routes/users");
const { authRoute } = require("./routes/auth");

const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  credentials: true,
};

// app.get("/", (req, res) => {
//   res.send("Hello from Backend");
// });

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/", uploadRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
// app.use(NewsRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Server Connected with Atlas");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is started on port ${port}`);
});
