require('dotenv').config();
const mongoose = require('../config/connection');
const userService = require('../api/services/user.service');
const authService = require('../api/services/auth.service');

mongoose.connect()
    .then(async () => {

        const user = {
            email: "email@domain.com",
            password: "MyAmazingPassword"
        }

        // const { email, password } = user;

        // const salt = await bcrypt.genSaltSync(saltRounds);
        // const hash = await bcrypt.hashSync(password, salt);

        // const newUser = { email, salt, password: hash };
        // console.log(newUser);

        // try {
        //     const newUser = await userService.createUser(user);
        //     console.log(newUser);
        // } catch (Error) {
        //     console.log(Error.message)
        // }

    });
