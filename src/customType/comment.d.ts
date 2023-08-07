export interface CommentsType {
    id: number;
    boardId: number;
    userId: number;
    content: string;
    parentCommentsId: number;
}

export interface CommentsAttributes extends CommentsType {
    id: number;
    boardId: number;
    userId: number;
    content: string;
    parentCommentsId: number;
    userNickname?: string;
    userImg?: string;
    userGrade?: string;
}
