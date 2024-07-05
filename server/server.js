const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const blogRoute = require("./routes/blogRoute");
const {connectMongoDB} = require('./database/database');
dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended: true, limit: "10mb"}))
app.use(cors())

connectMongoDB()

app.use(blogRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}..`);
})
