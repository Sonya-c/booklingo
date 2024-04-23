require('dotenv').config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    const hyperLink = (text, link) => `\x1b]8;;${link}\x1b\\${text}\x1b[0m\x1b]8;;\x1b\\`;

    const serverURL = `http://localhost:${PORT}`;
    const docsURL = `${serverURL}/api-docs`;

    const theLittleBar = "\x1b[90m┃\x1b[0m";

    console.log(`${theLittleBar} Server running on \t \x1b[36m${hyperLink(serverURL, serverURL)}`);
    console.log(`${theLittleBar} Open docs         \t \x1b[36m${hyperLink(docsURL, docsURL)}`);
});