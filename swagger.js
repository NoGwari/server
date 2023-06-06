import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import {config} from "./config.js";

const options = {
    swaggerDefinition: {
        version: "3.0.0",
        info: {
            title: "Nogwari",
            version: "1.0.0",
            description: "Nogwari swagger",
        },
        host: config.swagger.host,
        basePath: "/",
    },
    apis: ["./router/*.js"],
};

export const specs = swaggerJsdoc(options);
