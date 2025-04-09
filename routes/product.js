var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var account_signup = require('../signup/sign');
var account_login = require('../login/login')
var list_view = require('../bookview/views')
var new_order = require('../order/orders')
// a simple test url to check that all of our files are communicating correctly.


router.post('/create',account_signup.account_create);

router.post('/login',account_login.account_open)

router.post('/api/books',list_view.book_create )
router.get('/api/books',list_view.book_viewAll )
router.get('/api/books/:id',list_view.book_view )
router.put('/api/books/:id',list_view.book_update )
router.delete('/api/books/:id',list_view.book_delete )

router.post('/api/orders', new_order.book_order)




module.exports = router;