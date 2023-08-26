import ReportedBoard from "../../models/reported_board.js";

export async function isReported(board: number, user: number): Promise<boolean> {
    const isExist = ReportedBoard.findOne({
        attributes: ["id", "userId", "boardId"],
        where: {boardId: board, userId: user},
    });
    if (await isExist) {
        return true;
    }
    return false;
}

export async function report(boardId: number, userId: number, reason: string): Promise<number> {
    return ReportedBoard.create({
        userId,
        boardId,
        reason,
    }).then((result) => {
        return result.dataValues.id;
    });
}
