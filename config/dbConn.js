const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        await mongoose.connect("mongodb+srv://bidbazar:bidbazar@cluster0.3zswfvm.mongodb.net/?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB