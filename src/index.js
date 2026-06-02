const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
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
const errorHandler = require("./shared/errors/handle");
require("dotenv").config();

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: origin not allowed"));
      }
    },
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Juda ko'p so'rov yuborildi. 15 daqiqadan keyin qayta urinib ko'ring." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Juda ko'p urinish. 15 daqiqadan keyin qayta urinib ko'ring." },
});

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

const swaggerSpec = swaggerJSDoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users/login", authLimiter);
app.use("/api/users/forgot1", authLimiter);
app.use("/api/users/forgot2", authLimiter);
app.use(limiter);

app.use("/api/users", usersController);
app.use("/api/category", categoryController);
app.use("/api/actioncourses", userCoursesRoute);
app.use("/api/courses", coursesController);
app.use("/api/outApis", outApisController);
app.use("/api/admins", adminapis);

app.use(errorHandler);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
