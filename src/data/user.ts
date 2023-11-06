import User, {UserAttributes, UserType} from "../models/user.js";

export async function findByRealId(email: string): Promise<UserAttributes | null> {
    return User.findOne({where: {email: email}});
}

export async function findById(id: number): Promise<UserAttributes | null> {
    return User.findByPk(id);
}

export async function findByNickname(nickname: string): Promise<UserAttributes | null> {
    return User.findOne({where: {nickname}});
}

export async function createUser(user: UserType): Promise<string> {
    const {password, nickname, email} = user;
    return User.create({
        password: password,
        nickname: nickname,
        email: email,
        grade: "grade1",
        img: "https://nogwari2.s3.ap-northeast-2.amazonaws.com/user/defalut.png",
        posting_num: 0,
        reply_num: 0,
        reported: 0,
    }).then((result) => result.dataValues.id.toString());
}

export async function deleteUser(id: number) {
    return User.findByPk(id).then((user: User | null) => {
        return user!.destroy();
    });
}

export async function updateNickname(id: number, changeNickname: string) {
    return User.findByPk(id).then((user: User | null) => {
        user!.nickname = changeNickname;
        return user!.save();
    });
}

export async function updatePassword(id: number, changePassword: string) {
    return User.findByPk(id).then((user: User | null) => {
        user!.password = changePassword;
        return user!.save();
    });
}

export async function updateImg(id: number, changeImg: string) {
    return User.findByPk(id).then((user: User | null) => {
        user!.img = changeImg;
        return user!.save();
    });
}

export async function checkAdmin(email: string): Promise<UserAttributes | null> {
    return User.findOne({where: {email: email, grade: "admin"}});
}

export async function incrementPostNum(id: number) {
    return User.findByPk(id).then((user: User | null) => {
        user!.posting_num++;
        return user!.save();
    });
}

export async function incrementReplyNum(id: number) {
    return User.findByPk(id).then((user: User | null) => {
        user!.reply_num++;
        return user!.save();
    });
}

export async function decrementPostNum(id: number) {
    return User.findByPk(id).then((user: User | null) => {
        user!.posting_num--;
        return user!.save();
    });
}

export async function decrementReplyNum(id: number) {
    return User.findByPk(id).then((user: User | null) => {
        user!.reply_num--;
        return user!.save();
    });
}

export async function incrementReportedNum(id: number) {
    return User.findByPk(id).then((user: User | null) => {
        user!.reported += 1;
        return user!.save();
    });
}
