const express = require('express')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')
const app = express()
const http = require('http').createServer(app)

const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})

app.use(express.json())
app.use(session)
app.use(express.static('public'))
const port = process.env.PORT || 3030;
app.get('/**', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.listen(port, () => {
 console.log(`App listening on port ${port}!`)
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    // Configuring CORS
    const corsOptions = {
       
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080','http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const toyRoutes = require('./api/toy/toy.routes')
const reviewRoutes = require('./api/review/review.routes')


// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/toy', toyRoutes)
app.use('/api/review', reviewRoutes)



app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})