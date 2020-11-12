const mongoose = require('mongoose');

const Shema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const promoShema = new Shema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

var Promotions = mongoose.model('Promotion', promoShema);

module.exports = Promotions;