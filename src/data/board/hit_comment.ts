import HitComment from "../../models/hit_comment.js";

export async function isHits(commentId: number, userId: number): Promise<boolean> {
    const isExist = HitComment.findOne({
        attributes: ["id", "userId", "commentId"],
        where: {commentId, userId},
    });
    if (await isExist) {
        return true;
    }
    return false;
}

export async function increment(commentId: number, userId: number): Promise<number> {
    return HitComment.create({
        userId,
        commentId,
    }).then((result) => {
        return result.dataValues.id;
    });
}

export async function decrement(commentId: number, userId: number) {
    return HitComment.findOne({
        attributes: ["id", "userId", "commentId"],
        where: {commentId, userId},
    }).then((data) => {
        data!.destroy();
    });
}
