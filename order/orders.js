var bookorder = require('../model/orders');
var account = require('../model/accounts');
var list = require('../model/lists');

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

// const { bookorder, account, list } = require('../model/products'); // Single import for clarity

// exports.book_order = async (req, res) => {
//   const { userId, bookId, quantity } = req.body;

//   // Basic validation
//   if (!userId || !bookId || !quantity || quantity <= 0) {
//     return res.status(400).json({ msg: 'Invalid input: Ensure userId, bookId, and positive quantity' });
//   }

//   try {
//     // Check if user exists
//     const user = await account.findById(userId);
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     // Check if book exists
//     const book = await list.findById(bookId);
//     if (!book) {
//       return res.status(404).json({ msg: 'Book not found' });
//     }

//     // Create and save order
//     const newOrder = new bookorder({ user: userId, book: bookId, quantity });
//     const savedOrder = await newOrder.save();

//     res.status(201).json(savedOrder);
//   } catch (err) {
//     console.error('Error creating order:', err.message); // Detailed logging for debugging
//     res.status(500).json({ msg: 'Server error', error: err.message });
//   }
// };
