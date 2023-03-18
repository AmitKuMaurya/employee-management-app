require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary");
const fileUploader = require("express-fileupload");
const {connection} = require("./config/database");
const {employeeRouter} = require("./routes/emoloyee.route");
const app = express();
const PORT = 8080;

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});
app.use(express.json());
app.use(fileUploader());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hii from, server side of Employee Management System.");
});

app.use("/api/",employeeRouter);


app.listen(PORT, async () => {
    try{
        await connection;
        console.log({"msg":"DataBase Connected to MonngoDB."})
    }
    catch(err){
        console.log({error : "Error while, connnecting to DB."})
        console.log(err);
    }
    console.log(`listening on PORT ${PORT}`);
})