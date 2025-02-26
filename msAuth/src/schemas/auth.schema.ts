import mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: { type: String, require },
    email: { type: String, require },
    rol: { type: String, require },
    password: { type: String, require },
});

export const authModel = mongoose.model('user', authSchema);