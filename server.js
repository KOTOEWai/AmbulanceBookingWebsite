const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');


dotenv.config();

const UserRoute = require('./route/user');
const BookingRoute = require('./route/booking');

// ✅ Fix: Use CORS Middleware First
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser());

app.use('/user', UserRoute);
app.use('/booking', BookingRoute);

app.get('/readCookie', (req, res) => {
    console.log(req.cookies);
    res.send("Cookies Received");
});


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log("MongoDB connection error:", err));
