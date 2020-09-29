const express =  require('express')
const morgan = require('morgan')
const { join } = require('path')


// init
const app = express()


// settings
app.set('port', process.env.PORT || 3000)


// mids
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(morgan('dev'))


// routes
app.use(require('./routes/users.routes'))
app.use(require('./routes/notes.routes'))

app.get('*', (req, res) => {
    res.status(404).render('404')
})


module.exports = app