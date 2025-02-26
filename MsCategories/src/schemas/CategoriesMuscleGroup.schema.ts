import mongoose = require('mongoose');

const categoriesTrainingAreasSchema = new mongoose.Schema({
    name: {type: String, require},
    details: {type: String},
});

export const categoriesMuscleGroupModel = mongoose.model('categoriesTrainingArea', categoriesTrainingAreasSchema);