const express = require('express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const router = express.Router();

const specs = swaggerJsdoc({
    definition: {
        openapi: "3.0.2",
        info: {
            title: "Booklingo",
            version: "0.1.0",
        },
        servers: [{ url: `http://localhost:${process.env.PORT || 5000}` },],
    },
    apis: ['api/docs/*.yaml', "api/routes/*.js"],
});

router.use("/", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
