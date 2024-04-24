require('dotenv').config();

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const connect = async () => {
    mongoose.connect(uri)
        .then(() => {
            console.log('Mongo connection success');
        })
        .catch(error => {
            console.error('Mongo connection fail', error);
        });

    return mongoose.connection;
}

module.exports = {
    connect
}