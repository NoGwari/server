import express from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import boardRouter from "./router/board_Router.js";
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

app.use((req, res, next) => {
    console.log("Finish Not Found");
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

app.listen(8080);
console.log("Connect!");
