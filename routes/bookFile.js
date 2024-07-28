const express = require('express');
const router = express.Router();
const bookMulter = require('../middleware/book');
const database = require('../db/index');
const mainUrl = process.env.MAIN_URL || '/api/books';
const Book = require('../classes/Book');
const axios = require('axios');
const COUNTER_URL = process.env.COUNTER_URL;

router.get('/book', (req, res) => {
  const { books } = database;
  res.render('book/index', {
    title: "Библиотека",
    books: books
  })
});

router.get('/book/view/:id', (req, res) => {
  const { books } = database;
  const { id } = req.params;
  const idx = books.findIndex(book => book.id === id);

  if (idx === -1) {
    res.redirect('/404');
  } else {
    /*res.render('book/view', {
      title: `Библиотека.`,
      book: books[idx]
    })*/
      
      axios.post(COUNTER_URL + `counter/${id}/incr`)
      .then(response => {
        res.render('book/view', {
          title: `Библиотека.`,
          book: books[idx],
          cnt: response.data.cnt
        })
      })
      .catch(error => {
          console.error('Ошибка запроса:', error);
      });
  }
});

router.get('/book/create', (req, res) => {
  res.render('book/create', {
    title: "Библиотека",
    book: {}
  })
});

router.post('/book/create', (req, res) => {
  const { books } = database;
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
  books.push(newBook);

  res.redirect('/api/books/book');
});

router.get('/book/update/:id', (req, res) => {
  const { books } = database;
  const { id } = req.params;
  const idx = books.findIndex(book => book.id === id);

  if (idx === -1) {
    res.redirect('/404');
  } else {
    res.render('book/update', {
      title: 'Библиотека',
      book: books[idx]
    })
  }
})

router.post('/book/update/:id', (req, res) => {
  const { books } = database;
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
  const idx = books.findIndex(book => book.id === id);

  if (idx === -1) {
    res.redirect('/404');
  } else {
      books[idx] = {
        ...books[idx],
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
      };

    res.redirect('/api/books/book/view/' + id);
  }
})

router.post('/book/delete/:id', (req, res) => {
  const { books } = database;
  const { id } = req.params;
  const idx = books.findIndex(book => book.id === id);

  if (idx === -1) {
    res.redirect('/404');
  } else {
    books.splice(idx, 1);
    res.redirect('/api/books/book');
  }
})



module.exports = router;


/*
const express = require('express');
const router = express.Router();
const bookMulter = require('../middleware/book');
const database = require('../db/index');
const mainUrl = process.env.MAIN_URL || '/api/books';
const Book = require('../classes/Book');

router.get('/book', (req, res) => {
  const { books } = database;
  res.render('book/index', {
    title: "Библиотека",
    books: books
  })
});

router.get('/book/view/:id', (req, res) => {
  const { books } = database;
  const { id } = req.params;
  const idx = books.findIndex(book => book.id === id);

  if (idx === -1) {
    res.redirect('/404');
  } else {
    res.render('book/view', {
      title: `Библиотека.`,
      book: books[idx]
    })
  }
});

router.get('/book/create', (req, res) => {
  res.render('book/create', {
    title: "Библиотека",
    book: {}
  })
});

router.post('/book/create', (req, res) => {
  const { books } = database;
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
  books.push(newBook);

  res.redirect('/api/books/book');
});

router.get('/book/update/:id', (req, res) => {
  const { books } = database;
  const { id } = req.params;
  const idx = books.findIndex(book => book.id === id);

  if (idx === -1) {
    res.redirect('/404');
  } else {
    res.render('book/update', {
      title: 'Библиотека',
      book: books[idx]
    })
  }
})

router.post('/book/update/:id', (req, res) => {
  const { books } = database;
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
  const idx = books.findIndex(book => book.id === id);

  if (idx === -1) {
    res.redirect('/404');
  } else {
      books[idx] = {
        ...books[idx],
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
      };

    res.redirect('/api/books/book/view/' + id);
  }
})

router.post('/book/delete/:id', (req, res) => {
  const { books } = database;
  const { id } = req.params;
  const idx = books.findIndex(book => book.id === id);

  if (idx === -1) {
    res.redirect('/404');
  } else {
    books.splice(idx, 1);
    res.redirect('/api/books/book');
  }
})



module.exports = router;

*/