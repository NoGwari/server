import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerAutogen from "swagger-autogen";
import {config} from "./config.js";

// 기본 swagger 사용시
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

// swagger auto-gen사용시
const doc = {
    info: {
        title: "Nogwari",
        version: "1.0.0",
        description: "Nogwari swagger",
    },
    host: config.swagger.host,
    basePath: "/",
    schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./router/auth_router.js", "./router/board_router.js", "./router/category_router.js"];

// swaggerAutogen(outputFile, endpointsFiles, doc);
