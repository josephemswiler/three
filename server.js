const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static('public'))

// require('./controllers/three-controller.js')(app)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))