// const mongoose = require("mongoose");

// const connectDB=()=>{
//     mongoose.set("strictQuery",false);
//     mongoose.connect("mongodb+srv://ashwinireddy:qUxmY10cYV0Mbjal@cluster0.cyfca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then((res)=>{
//             console.log("Connected to DB")
//     });
// }

// module.exports=connectDB


const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ashwinireddy:qUxmY10cYV0Mbjal@cluster0.cyfca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to DB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

