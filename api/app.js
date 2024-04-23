const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.status(200).json({ status: "ok" });
});

module.exports = app;