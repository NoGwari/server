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
import userRouter from "./router/user_router.js";
import commentRouter from "./router/comment_router.js";
import passport from "./controller/auth_controller.js";
import {config} from "./config.js";
import {sequelize} from "./models/index.js";

const app = express();

sequelize.sync({force: false}).then(() => {
    console.log("Connect!");
});

const corsOption = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
};

const __dirname = path.resolve();
const swaggerDocument = YAML.load(path.join(__dirname, "./swagger.yaml"));
app.use(
    session({
        secret: config.session.secretKey,
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 600000, // 600초 (10분) 만료
        },
    })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(cors(corsOption));
app.use(helmet());
app.use(morgan("tiny"));

app.use(passport.initialize());

app.use("/board", boardRouter);
app.use("/category", categoryRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/comment", commentRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Finish Not Found");
    res.sendStatus(404);
});

app.listen(config.port);
