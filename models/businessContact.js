let mongoose = require('mongoose');

// a model class for contact items
let bssContactModel = mongoose.Schema(
    {
        name: String,
        number: String,
        email: String
    },
    {
        collection: "businessContact"
    }
);

module.exports = mongoose.model('businessContact', bssContactModel);