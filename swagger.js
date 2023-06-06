import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        version: "3.0.0",
        info: {
            title: "Nogwari",
            version: "1.0.0",
            description: "Nogwari swagger",
        },
        host: "localhost:3000",
        basePath: "/",
    },
    apis: ["./router/*.js"],
};

export const specs = swaggerJsdoc(options);
