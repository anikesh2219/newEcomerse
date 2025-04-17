var Bookorder = require("../model/orders");
var Account = require("../model/accounts");
var List = require("../model/lists");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose").Types;
require("dotenv").config();



const book_order = async (req, res) => {
  const { bookId, quantity } = req.body;
  const userId = req.user.userId;

  if (!bookId || !quantity) {
    return res
      .status(400)
      .json({ msg: "Please provide, bookId, and quantity" });
  }
  try {
    const book = await List.findById(bookId);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    const order = await Bookorder.create({
      user: userId,
      book: bookId,
      quantity,
    });

    res.status(201).json(order);
  } catch (err) {
    console.log("Error occurred:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

const get_orders = async (req, res) => {
  const userId = req.user.userId;
  const perPage = 3;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * perPage;
  
  try {
    // const orders = await Bookorder.find({ user: userId }).limit(perPage).skip(skip);
    const orders = await Bookorder.aggregate([
      {$match: { user: new ObjectId(userId) }},
      {$lookup: {
        from: "books",
        localField: "book",
        foreignField: "_id",
        as: "bookInfo"
      }},
      {$unwind: "$bookInfo"},
      { $skip: skip },
      { $limit: perPage
      },
    ]);
    const totalOrders = await Bookorder.countDocuments({ user: userId });
    res.status(200).json({totalPages:Math.ceil(totalOrders/perPage), data:orders });
  } catch (err) {
    console.log("Error occurred:", err);
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = {book_order, get_orders};