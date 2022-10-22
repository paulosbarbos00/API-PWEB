const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Ler json
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())



//Rotas da API
const bookRoutes = require('./routes/bookRoutes')

app.use('/book', bookRoutes)


// rota inicial / endpoint
app.get('/', (req, res) => {

    res.json({ message: 'Hop!' })

})

// entregar uma porta

mongoose
.connect(
    'mongodb+srv://psb2:Pweb00@api-pweb.fezxkns.mongodb.net/bancopwebapi?retryWrites=true&w=majority'
    )
    .then(() =>{
        console.log("Conectado no MongoDB")
        app.listen()
    })
    .catch((err) => console.log(err))


