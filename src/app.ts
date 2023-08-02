import express, {NextFunction, Request, Response} from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import path from "path";
import session from "express-session";
import categoryRouter from "./router/category_router.js";
import boardRouter from "./router/board_router.js";
import authRouter from "./router/auth_router.js";
import mypageRouter from "./router/mypage_router.js";
import passport from "./controller/auth_controller.js";
import {config} from "./config.js";
import {sequelize} from "./db/database.js";

const app = express();

const corsOption = {
    origin: "*",
    optionsSuccessStatus: 200,
};

const __dirname = path.resolve();
const swaggerDocument = YAML.load(path.join(__dirname, "./swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(cors(corsOption));
app.use(helmet());
app.use(morgan("tiny"));
app.use(
    session({
        secret: config.session.secretKey,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 600000, // 60초 (10분) 만료
        },
    })
);

app.use(passport.initialize());

app.use("/board", boardRouter);
app.use("/category", categoryRouter);
app.use("/auth", authRouter);
app.use("/mypage", mypageRouter);

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
