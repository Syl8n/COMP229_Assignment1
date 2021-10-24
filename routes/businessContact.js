var express = require('express');
var router = express.Router();

let bssContactController = require('../controllers/businessContact');

// Connect to our model
let bssContact = require('../models/businessContact');


// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();
}

/* GET list of items */
router.get('/', bssContactController.contactList);

// Routers for edit
router.get('/edit/:id', requireAuth, bssContactController.displayEditPage);
router.post('/edit/:id', requireAuth, bssContactController.processEditPage);

// Delete
router.get('/delete/:id', requireAuth, bssContactController.performDelete);


/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, bssContactController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, bssContactController.processAddPage);

module.exports = router;