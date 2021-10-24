// create a reference to the model
let Contact = require('../models/businessContact');

// for listing items
module.exports.contactList = function(req, res, next) {  
    Contact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('businessContact/list', {
                title: 'Business Contact', 
                ContactList: contactList,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
}

// rendering the edit page
module.exports.displayEditPage = (req, res, next) => {
    
    let id = req.params.id;

    Contact.findById(id, (err, itemToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('businessContact/add_edit', {
                title: 'Edit Contact', 
                item: itemToEdit,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}

// saving info to db and perform proper actions
module.exports.processEditPage = (req, res, next) => {

    let id = req.params.id

    let updatedItem = Contact({
        _id: req.body.id,
        name: req.body.item,
        number: req.body.number,
        email: req.body.email
    });

    Contact.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // console.log(req.body);
            // refresh the book list
            res.redirect('/businessContact');
        }
    });

}

// perform delete an item
module.exports.performDelete = (req, res, next) => {

    let id = req.params.id;


    Contact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/businessContact');
        }
    });

}

// rendering the add page
module.exports.displayAddPage = (req, res, next) => {

    let newItem = Contact();

    res.render('businessContact/add_edit', {
        title: 'Add a new Item',
        item: newItem,
        userName: req.user ? req.user.username : ''
    })          

}

// perform add an item
module.exports.processAddPage = (req, res, next) => {
    let newItem = Contact({
        _id: req.body.id,
        name: req.body.item,
        number: req.body.number,
        email: req.body.email
    });

    Contact.create(newItem, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the list
            console.log(item);
            res.redirect('/businessContact');
        }
    });
    
}