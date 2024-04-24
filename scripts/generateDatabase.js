require('dotenv').config();

const mongoose = require('../config/connection');
const User = require('../api/models/user.model');

mongoose.connect()
    .then(async () => {
        
        const testUser = {
            email: "email@domain.com",
            password: "123456789"
        };

        try {
            const user = await User.create(testUser);
            console.log(user);
        } catch (error) {
            console.log(error);
        }

        process.exit(1);
    })
    