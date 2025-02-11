const express = require("express");
const cors = require("cors");
const routes = require("./v1/routes/routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/data", routes);

app.listen(3001, () => {
  console.log(`Server running on port 3001`);
});

