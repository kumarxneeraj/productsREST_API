const mongoose = require("mongoose");
// const connectDB = ()=>{
//     console.log("DB connected");
//     return mongoose.connect(uri,{
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });
// };

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri, {
        });
        console.log("DB connected");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
};

module.exports = connectDB;
