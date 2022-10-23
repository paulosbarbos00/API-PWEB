const router = require ('express').Router()

const Book = require('../models/Book')


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

// GET Method - Read a unique book
router.get('/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const book = await Book.findOne({ isbn: id });
      if (!book) {
        res.status(422).json({ message: `O livro ${id} não foi encontrado.` });
        return;
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
  
  // PATCH Method - Update a book
  router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const { imageLink, title, author, isbn, summary, releaseYear } = req.body;
  
    const book = {
      imageLink,
      title,
      author,
      isbn,
      summary,
      releaseYear,
    };
  
    try {
      const updatedBook = await Book.updateOne({ isbn: id }, book);
  
      // Check if the update was not concluded
      if (updatedBook.matchedCount === 0) {
        res.status(422).json({ message: `O livro ${id} não foi encontrado.` });
        return;
      }
  
      res
        .status(200)
        .json({ message: `Livro ${id} atualizado no sistema com sucesso` });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
  
  // DELETE Method - delete a book
  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
  
    const book = await Book.findOne({ isbn: id });
    if (!book) {
      res.status(422).json({ message: `O livro ${id} não foi encontrado.` });
      return;
    }
  
    try {
      await Book.deleteOne({ isbn: id });
      res.status(200).json({ message: `Livro ${id} removido com sucesso.` });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
  
  module.exports = router;