import {Board, associate as associateBoard} from "./board/data";
import {Comment, associate as associateComment} from "./board/comment";
import {User, associate as associateUser} from "./user";
import {Category, associate as associateCategory} from "./board/category";
import {HitBoard, associate as associateHitBoard} from "./board/hit_board";
export * from "../db/database";

const db = {
    User,
    Category,
    Comment,
    Board,
    HitBoard,
};
export type dbType = typeof db;

associateBoard(db);
associateComment(db);
associateUser(db);
associateHitBoard(db);
associateCategory(db);
