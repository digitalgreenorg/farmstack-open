const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

let currentTime 
app.post("/data", (req, res) => {
    currentTime = req.body
    res.sendStatus(200)
})

app.get("/data", (req,res) => {
    if(currentTime)
        res.json(currentTime)
    else
        res.send("Waiting for data...")

})

app.listen(4000, ()=> console.log("Server on Port 4000"))