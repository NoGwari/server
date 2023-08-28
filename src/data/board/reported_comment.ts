import ReportedComment from "../../models/reported_comment.js";

export async function isReported(commentId: number, userId: number): Promise<boolean> {
    const isExist = ReportedComment.findOne({
        attributes: ["id", "userId", "commentId"],
        where: {commentId, userId},
    });
    if (await isExist) {
        return true;
    }
    return false;
}

export async function report(commentId: number, userId: number, reason: string): Promise<number> {
    return ReportedComment.create({
        commentId,
        userId,
        reason,
    }).then((result) => {
        return result.dataValues.id;
    });
}
