const router = require ('express').Router()

const Book = require('../models/Book')
const { application } = require('express')


// Criação
router.post('/', async (req, res) => {

    const {titulo, autor, isbn, resumo, ano_lancamento} = req.body

    const book = {
        titulo, 
        autor, 
        isbn, 
        resumo, 
        ano_lancamento
    }

    try {
        
        await Book.create(book)
        res.status(201).json({ message: 'Book criado com sucesso'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})


// Leitura
router.get('/', async (req, res) => { 

    try {
        const books = await Book.find()
        res.status(200).json(books)

    } catch (error) {
        res.status(500).json({error: error})
    }


})

// Atualização
router.put('/', async (req, res) => { 

    const {titulo, autor, isbn, resumo, ano_lancamento} = req.body

    const book = {
        titulo, 
        autor, 
        isbn, 
        resumo, 
        ano_lancamento
    }

    try {
        const updateBook = await Book.update()
        res.status(200).json(book)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// Remover
router.delete('/:id', async (req, res) => { 

    const id = req.params.id

    const book = await Book.findOne({_id: id })
    if (!book){
        res.status(422).json({ message: 'O livro não foi encontrado.'})
        return
    }

    try {
        await Book.deleteOne({ _id: id})
        res.status(200).json({ message: 'O livro foi removido.'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

module.exports = router