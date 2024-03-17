const express = require("express");
require("dotenv").config();
const { connection } = require("./lib/db/db");
const {userRouter}=require("./routes/user.routes")
const {bookRouter}=require("./routes/book.routes")
const app = express();
const Port = process.env.Port || 4500;
app.use(express.json());


app.use("/users",userRouter)
app.use("/books",bookRouter)
app.listen(Port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
    console.log(`server is running at ${Port}`);
  } catch (error) {
    console.log("error", error);
  }
});
