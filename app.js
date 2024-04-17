const express = require("express")
const app = express();
const products_routes = require("./routes/products");
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 5000;

require("dotenv").config();



app.get("/", (req, res) => {
    res.send("hi, i am there")
});

//middleware
app.use("/api/products",products_routes);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`on ${PORT}, backend connected`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();