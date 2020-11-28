const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const favoriteShema = new Shema({
 user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
 },
 dishes: [
     {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Dish'
     }
 ]
},{
    timestamps: true
});

var favorites = mongoose.model('favorite', favoriteShema);

module.exports = favorites;