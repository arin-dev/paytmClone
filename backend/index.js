const express = require("express");
const mainRouter = require("./router/index");
const cors = require("cors");

const app = express();

// const corsOptions = {
//     origin: "http://localhost:3000", // Replace with your frontend URL
//     optionsSuccessStatus: 200,
//   };
// app.use(cors(corsOptions));
  
app.use(cors());

app.use(express.json());

app.use("/api", mainRouter);

app.get('/', (req, res) => {
  console.log("Testing Done");
  return res.json({message:"Testing Done"});
})
// Now all the apis start with /api/v1 will be passed on to mainRouter to handle,
// where we can handle each separate query individually.

app.listen(3000, () => {
  console.log("Server is running on port 3000");
}) 