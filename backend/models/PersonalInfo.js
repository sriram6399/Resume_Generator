const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    phoneNumber: { type: String },
    dateOfBirth: { type: Date }
});

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);

module.exports = PersonalInfo;
