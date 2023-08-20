import User, {UserAttributes, UserType} from "../models/user.js";

export async function findByRealId(email: string): Promise<UserAttributes | null> {
    return User.findOne({where: {email: email}});
}

export async function findById(id: number): Promise<UserAttributes | null> {
    return User.findByPk(id);
}

export async function createUser(user: UserType): Promise<string> {
    const {password, nickname, email, img} = user;
    return User.create({
        password: password,
        nickname: nickname,
        email: email,
        grade: "grade1",
        img: img,
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

export async function decrementPostNum(id: number) {
    return User.findByPk(id).then((user: User | null) => {
        user!.posting_num--;
        return user!.save();
    });
}
