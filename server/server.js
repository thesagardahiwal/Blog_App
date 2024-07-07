const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const blogRoute = require("./routes/blogRoute");
const authRoute = require("./routes/authRoute");
const session = require('express-session');
const passport = require('./config/passport');
const MongoStore = require('connect-mongo');
const {connectMongoDB} = require('./database/database');
dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended: true, limit: "10mb"}))
app.use(cors({
    origin: process.env.ORIGIN_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

connectMongoDB()

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: process.env.DB_URL,
        ttl: 12 * 24 * 60 * 60 
    }),
    cookie: {
        maxAge: 12 * 24 * 60 * 60 * 1000 
    }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(authRoute);
app.use(blogRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}..`);
})
