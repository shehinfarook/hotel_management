require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connect = require('./config/db')

const app = express()
connect()

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/menu', require('./routes/menu'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/super', require('./routes/superAdmin'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
