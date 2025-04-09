var list = require('../model/products');


exports.book_create= async (req, res) => {
    const { title, author, price } = req.body;
    try {
      const newBook = new list({ title, author, price, publishDate });
      await newBook.save();
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ message: 'Error creating book', error: err });
    }
  };
  
  // Get all books
  exports.book_viewAll= async (req, res) => {
    try {
      const books = await list.find();
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching books', error: err });
    }
  };
  
  // Get a book by ID
 exports.book_view = async (req, res) => {
    const { id } = req.params;
    try {
      const book = await list.findById(id);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error fetching book', error: err });
    }
  };
  
  // Update a book by ID
   exports.book_update = async (req, res) => {
    const { id } = req.params;
    const { title, author, price, publishDate } = req.body;
    try {
      const updatedBook = await list.findByIdAndUpdate(id, { title, author, price, publishDate }, { new: true });
      if (updatedBook) {
        res.status(200).json(updatedBook);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (err) {
      res.status(400).json({ message: 'Error updating book', error: err });
    }
  };
  
  // Delete a book by ID
  exports.book_delete = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBook = await list.findByIdAndDelete(id);
      if (deletedBook) {
        res.status(200).json({ message: 'Book deleted successfully' });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error deleting book', error: err });
    }
  }