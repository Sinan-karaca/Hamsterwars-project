const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const tools = require('./routes/hamsters.js')


const PORT = 3233




//Middleware
app.use(express.json())
app.use(cors())
// app.use(express.static(staticFolder))

//Routes
app.get('/hamsters', (req, res) => {
    res.send('Welcome to the Hamsterwar project')
})

app.get('/hamsters/random', (req, res) => {
    res.send('This is a random Hamster')
})

app.get('/hamsters/:id', (req, res) => {
    res.send('This is the id of the requested hamster ' + [req.params.id])
})


app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
})