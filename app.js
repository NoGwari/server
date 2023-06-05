import express from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import categoryRouter from "./router/category_router.js";
import boardRouter from "./router/board_router.js";
import authRouter from "./router/auth_router.js";
import {config} from "./config.js";
import {sequelize} from "./db/database.js";
const app = express();

const corsOption = {
    origin: "*",
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOption));
app.use(helmet());
app.use(morgan("tiny"));

app.use("/board", boardRouter);
app.use("/category", categoryRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
    console.log("Finish Not Found");
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

sequelize.sync().then(() => {
    console.log("Connect!");
    app.listen(config.port);
});
