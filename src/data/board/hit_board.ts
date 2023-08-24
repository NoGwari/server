import HitBoard from "../../models/hit_board.js";

export async function isHits(board: number, user: number): Promise<boolean> {
    const isExist = HitBoard.findOne({
        attributes: ["id", "userId", "boardId"],
        where: {boardId: board, userId: user},
    });
    if (await isExist) {
        return true;
    }
    return false;
}

export async function increment(board: number, user: number): Promise<number> {
    return HitBoard.create({
        userId: user,
        boardId: board,
    }).then((result) => {
        return result.dataValues.id;
    });
}

export async function decrement(board: number, user: number) {
    return HitBoard.findOne({
        attributes: ["id", "userId", "boardId"],
        where: {boardId: board, userId: user},
    }).then((data) => {
        data!.destroy();
    });
}
