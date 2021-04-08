const express = require("express");
const app = express();
const itemRoutes = require("./routes/items");
const ExpressError = require("./expressError");

app.use(express.json());

app.use('/items', itemRoutes);

app.use(function(req, res, next) {
    return new ExpressError("Not found", 404);
});

app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.msg;

    return res.status(status).json({
        error: {message, status}
    });
});


module.exports = app;