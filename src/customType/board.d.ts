export interface BoardType {
    title: string;
    content: string;
    views: number;
    hits: number;
    reported: number;
    hidden: string;
    userId: number;
    categoryId: number;
}

export interface BoardAttributes extends BoardType {
    id: number;
    title: string;
    content: string;
    views: number;
    hits: number;
    reported: number;
    hidden: string;
    userId: number;
    categoryId: number;
    userNickname?: string;
    userImg?: string;
    userGrade?: string;
    categoryName?: string;
}
