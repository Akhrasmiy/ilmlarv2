const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Swagger of User Registration API",
            version: "1.0",
            description: "Foydalanuvchini ro'yxatdan o'tkazish va boshqarish uchun API hujjatlari",
        },
        servers: [
            { url: "https://api.ilmlar.com" }, // Adding api.ilmlar.com
            process.env.NODE_ENV === "production"
                ? { url: "https://your-production-url.com/" }
                : { url: "http://localhost:3004/" },
        ],
        components: {
            securitySchemes: {
                "client-id": {
                    type: "apiKey",
                    in: "header",
                    name: "client-id",
                },
                "client-secret": {
                    type: "apiKey",
                    in: "header",
                    name: "client-secret",
                },
                token: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                    name: "Authorization",
                },
            },
        },
    },
    apis: [path.resolve(__dirname, "../swagger/*.js")], // Swagger annotatsiyalarini joylashgan joy
};

module.exports = options;
