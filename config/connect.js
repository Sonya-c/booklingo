require('dotenv').config();

const mongoose = require('mongoose');

const connect = async () => {
    const uri = process.env.MONGO_URI;
    const db = process.env.MONGO_DB;
    // console.log(uri + "/" + db);

    mongoose.connect(uri + "/" + db)
        .then(async () => {
            console.log('Mongo connection success');
        })
        .catch(error => {
            console.error('Mongo connection fail', error);
        });

    return mongoose.connection;
}

module.exports = connect;