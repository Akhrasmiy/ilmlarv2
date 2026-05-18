require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("./swagger/options");
const usersController = require("./modules/users/_api");
const categoryController = require("./modules/category/_api");
const coursesController = require("./modules/courses/_api");
const outApisController = require("./modules/outApis/_api");
const userCoursesRoute = require("./modules/users-courses/_api");
const adminapis = require("./modules/adminapis/_api");
const fileUpload = require("express-fileupload");
const { BadRequestError, NotFoundError, UnauthorizedError, ForbiddenError } = require("./shared/errors");

const app = express();

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

const swaggerSpec = swaggerJSDoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json());
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersController);
app.use("/api/category", categoryController);
app.use("/api/actioncourses", userCoursesRoute);
app.use("/api/courses", coursesController);
app.use("/api/outApis", outApisController);
app.use("/api/admins", adminapis);

// Error handler — barcha xatolarni JSON formatda qaytaradi
app.use((err, req, res, next) => {
    let status = 500;
    let message = "Ichki server xatoligi.";

    if (err instanceof BadRequestError) {
        status = 400;
        message = err.message;
    } else if (err instanceof UnauthorizedError) {
        status = 401;
        message = err.message;
    } else if (err instanceof ForbiddenError) {
        status = 403;
        message = err.message;
    } else if (err instanceof NotFoundError) {
        status = 404;
        message = err.message;
    } else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        status = 401;
        message = "Token yaroqsiz yoki muddati tugagan.";
    } else {
        console.error("[Server Error]", err);
    }

    res.status(status).json({ error: message });
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
