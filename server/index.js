const express = require("express")
// const cors = require("cors");
const {connection} = require("./config/database")

const app = express();
const PORT = 8080;

app.use(express.json());
// app.use(cors());

app.get("/", (req, res) => {
    res.send("Home page")
})

// app.use("/notes", notesController)

app.listen(PORT, async () => {
    try{
        await connection;
        console.log({"msg":"DataBase Connected to MonngoDB."})
    }
    catch(err){
        console.log({error : "Error while, connnecting to DB."})
    }
    console.log(`listening on PORT ${PORT}`);
})