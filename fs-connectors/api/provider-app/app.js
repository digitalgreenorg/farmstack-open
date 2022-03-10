const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get("/data", (req, res) => {
    res.json({
        message: `Welcome To Farmstack! Current time is ${new Date()} `
    })
})

app.listen(3000, ()=> console.log("Server on Port 3000"))