const mongoose = require('mongoose')

const Book = mongoose.model('Book', {
    id: Number,
    titulo: String,
    autor: String,
    isbn: Number,
    resumo: String,
    ano_lancamento: Number,
})

module.exports = Book