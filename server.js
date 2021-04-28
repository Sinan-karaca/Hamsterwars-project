const express = require("express");
const app = express();
const cors = require("cors");
const hamsters = require("./routes/hamsters.js");

const PORT = 3233;

//Middleware
app.use((req, res, next) => {
  console.log(`${req.method}  ${req.url} `, req.params);
  next();
});
app.use(express.json());
app.use(cors());
// app.use(express.static(staticFolder))

//Routes
app.use("/hamsters", hamsters);

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
