import mongoose = require('mongoose');

const categoriesTrainingStylesSchema = new mongoose.Schema({
    name: {type: String, require},
    details: {type: String},
});

export const categoriesTrainingStylesModel = mongoose.model('categoriesTrainingStyle', categoriesTrainingStylesSchema);