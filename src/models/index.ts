import Board, {associate as associateBoard} from "./board.js";
import Comment, {associate as associateComment} from "./comment.js";
import User, {associate as associateUser} from "./user.js";
import Category, {associate as associateCategory} from "./category.js";
import HitBoard, {associate as associateHitBoard} from "./hit_board.js";
import HitComment, {associate as associateHitComment} from "./hit_comment.js";
import ReportedBoard, {associate as associateReportedBoard} from "./reported_board.js";
import ReportedComment, {associate as associateReportedComment} from "./reported_comment.js";
export * from "../db/database.js";

const db = {
    User,
    Category,
    Comment,
    Board,
    HitBoard,
    HitComment,
    ReportedBoard,
    ReportedComment,
};

export type dbType = typeof db;

associateBoard(db);
associateComment(db);
associateUser(db);
associateCategory(db);
associateHitBoard(db);
associateHitComment(db);
associateReportedBoard(db);
associateReportedComment(db);
