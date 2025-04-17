var account = require('../model/accounts');
const bcrypt = require('bcrypt');

const account_create = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  let user = await account.findOne({ username });
  if (user) {
    return res.status(400).json({ msg: 'User name already exists' });
  } else {
    user = await account.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User email already exists' });
    }
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = new account({ ...req.body, password: hashedPassword });
    const result = await data.save();

    res.send(result);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

module.exports = { account_create };