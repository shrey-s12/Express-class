const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    country: String,
    city: String,
    locality: String
})

const profileSchema = new Schema({
    bio: String,
    contact: {
        type: Number,
    },
    address: addressSchema
})

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;