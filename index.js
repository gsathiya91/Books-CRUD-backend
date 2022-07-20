const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
const router = require("./routes/bookRoutes");
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

//Get all books
app.use("/", router)

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)
})

//Db connection
mongoose.connect("mongodb+srv://Gsathiya:capstoneproject@cluster0.ktemn.mongodb.net/BOOKSTORE?retryWrites=true&w=majority")
.then(() => {
    console.log("DB connected successfully")
}).catch((err) => {
    console.log(err)
})
