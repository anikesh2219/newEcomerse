var account = require('../model/products');

exports.account_create= async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    let user = await account.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User name already exists' });
  
    } else {
      let user = await account.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User email already exists' });
      }
    }
    let data = new account(req.body)
    let result = await data.save()
    res.send(result)
  }