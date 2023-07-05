import express, {NextFunction, Request, Response} from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import categoryRouter from "./router/category_router.js";
import boardRouter from "./router/board_router.js";
import authRouter from "./router/auth_router.js";
import passport from "./controller/auth_controller.js";
import {config} from "./config.js";
import {sequelize} from "./db/database.js";

const app = express();

const corsOption = {
    origin: "*",
    optionsSuccessStatus: 200,
};

// 기본 swagger 사용시
// import {specs} from "./swagger.js";
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// YAML파일 사용하여 swagger 사용시
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// swagger auto-gen 사용시
// import swaggerFile from "./swagger-output.json" assert {type: "json"};
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(cors(corsOption));
app.use(helmet());
app.use(morgan("tiny"));

app.use(passport.initialize());

app.use("/board", boardRouter);
app.use("/category", categoryRouter);
app.use("/auth", authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Finish Not Found");
    res.sendStatus(404);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    res.sendStatus(500);
});

sequelize.sync().then(() => {
    console.log("Connect!");
    app.listen(config.port);
});
