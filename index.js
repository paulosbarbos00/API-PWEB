
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');


// port
const port = process.env.PORT || 3000;

// Ler json
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())
app.use(cors());


// rota inicial / endpoint
app.get('/', (req, res) => {

    res.json({ message: 'Hop!' })

})

//Rotas da API
const bookRoutes = require('./routes/bookRoutes')

app.use('/book', bookRoutes)




// entregar uma porta

mongoose
.connect(
    'mongodb+srv://psb2:Pweb00@api-pweb.fezxkns.mongodb.net/bancopwebapi?retryWrites=true&w=majority'
    )
    .then(() =>{
        console.log("Conectado no MongoDB")
        app.listen(port)
    })
    .catch((err) => console.log(err))


