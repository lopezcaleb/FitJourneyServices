import mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    username: { type: String, require },
    email: { type: String, require },
    rol: { type: String, require },
    password: { type: String, require },
  });

export const userModel = mongoose.model('user', userScheme);