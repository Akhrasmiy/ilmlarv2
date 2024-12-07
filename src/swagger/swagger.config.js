const path = require("path");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ilmlar API",
      version: "1.0.0",
      description: "Foydalanuvchilar va kurslar uchun API hujjatlari",
    },
    servers: [
      {
        url: "http://localhost:3000", // API server manzili
        description: "Local server",
      },
    ],
  },
  apis: [path.resolve(__dirname, "../modules/**/_api.js")], // Swagger uchun annotatsiyalarni o'qish
};

module.exports = swaggerOptions;
