require("dotenv").config();
const express = require("express");
const { connectWithDatabase } = require("./config/dbConnect");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const { authRouter, userRouter } = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

connectWithDatabase().then(() => {
  app.listen(PORT, () =>
    console.log(`Server is running at 127.0.0.1:${PORT}/`)
  );
});

//cors & helmet
app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  express.json({
    extended: false,
  })
);

//router
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/", (_, res) => {
  res.json({
    message: "API running.",
  });
});
