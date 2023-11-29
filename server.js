require('./config/db')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRouter = require('./middleware/auth/auth')
const Manna = require('./api/manna/router')
const Event = require('./api/event/router')
const Subscription = require('./api/subscription/router')
const PORT = 3000

const app = express();

app.use(bodyParser.json())
app.use(cors({origin: "*"}));

app.use('/api/auth', authRouter)
app.use('/api/manna', Manna)
app.use('/api/event', Event)
app.use('/api/subscription', Subscription)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
