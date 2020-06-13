"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.listen(3000, function () {
    console.log("App is listening on port 3000!");
});
//# sourceMappingURL=app.js.map