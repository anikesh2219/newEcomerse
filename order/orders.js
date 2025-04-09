var bookorder = require('../model/products');
var account = require('../model/products');
var list = require('../model/products');

exports.book_order = async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  // Basic validation
  if (!userId || !bookId || !quantity) {
    return res.status(400).json({ msg: 'Please provide userId, bookId, and quantity' });
  }

  try {
    // Check if user exists
    console.log('Searching for user with ID:', userId);

    const user = await account.findById(userId);
    console.log('User found:', user);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if book exists
    const book = await list.findById(bookId);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    // Create new order
    const newOrder = new bookorder({
      user: userId,
      book: bookId,
      quantity
    });

    // Save order to database
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
}