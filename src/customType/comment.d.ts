export interface CommentsType {
    id: number;
    content: string;
    parentCommentsId: number;
    hits: number;
    reported: number;
    boardId: number;
    userId: number;
}

export interface CommentsAttributes extends CommentsType {
    id: number;
    content: string;
    parentCommentsId: number;
    hits: number;
    reported: number;
    boardId?: number;
    userId?: number;
    userNickname?: string;
    userImg?: string;
    userGrade?: string;
}
