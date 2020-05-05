const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    }
})

CategorySchema.method("transform", function () {
    let obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;

    return obj;
});

module.exports = new mongoose.model('Category', CategorySchema, 'Categories')