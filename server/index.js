const bodyParser = require("body-parser");
const express = require("express");

// Create database connection
const PORT = process.env.PORT || 3001;

const app = express();

// Enables API to accept JSON
app.use(express.json());
app.use(bodyParser.json());

// Handles routes corresponding to agenda events
const eventRouter = require("./routes/Events");
app.use("/events", eventRouter);

//Handles routes corresponding to users
const userRouter = require("./routes/Users");
app.use("/users", userRouter);



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
