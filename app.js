"use strict";
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { PORT } = require("./constants");
const { ERRORS } = require("./constants");
const routes = require("./routes");
require("./environments/environment").setupEnvironment();
require("./models/server");

const app = express();

app.use(cors()); // Enabling CORS
app.use(helmet()); // Enabling security headers
app.use(express.json()); // Parsing JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded request bodies

app.get("/health", (req, res) => {
    res.status(200).json("Server is healthy");
});

app.use(routes);

// app.all("*", (req, res, next) => {
//   return res.status(404).json({
//     message: `Can't find ${req.originalUrl} on this service!`
//   });
// });

// Global error handler middleware (Keep this at the end of the middleware stack)
// To catch any errors that occur in the application.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(statusCode).json({
        statusCode: err.statusCode || 500,
        message: err.message || ERRORS.INTERNAL_SERVER_ERROR,
    });
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
