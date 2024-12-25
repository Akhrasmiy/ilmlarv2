const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("./swagger/options"); // Swagger konfiguratsiyasi
const usersController = require("./modules/users/_api"); // Users API marshrutlari
const categoryController = require("./modules/category/_api"); // Users API marshrutlari
const coursesController = require("./modules/courses/_api"); // Users API marshrutlari
const outApisController = require("./modules/outApis/_api"); // Users API marshrutlari
const userCoursesRoute = require("./modules/users-courses/_api"); // Users API marshrutlari
const fileUpload = require("express-fileupload");

const app = express();

// express-fileupload middleware
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // Fayl hajmini 50MB ga cheklash
}));

const swaggerSpec = swaggerJSDoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger UI
app.use(bodyParser.json());
// app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Users API
app.use("/api/users", usersController);
app.use("/api/category", categoryController);
app.use("/api/actioncourses", userCoursesRoute);
app.use("/api/courses", coursesController);
app.use("/api/outApis", outApisController);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
