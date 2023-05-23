let posting = [
    {
        id: "1",
        title: "title1",
        content: "게시판 test",
        userId: "1",
        username: "test1",
        createdAt: new Date().toString(),
    },
    {
        id: "2",
        title: "title2",
        content: "안뇽!",
        userId: "2",
        username: "test2",
        createdAt: new Date().toString(),
    },
];

export async function getAll() {
    return posting;
}

export async function getAllByUsername(username) {
    const arr = posting.filter((post) => post.username === username);
    return arr;
}

export async function getById(id) {
    const posts = posting.find((post) => post.id === id);
    return posts;
}

export async function create(title, content, username, userId) {
    const newPosts = {
        id: posting.length + 1,
        title,
        content,
        username,
        userId,
        createdAt: new Date().toString(),
    };
    posting.push(newPosts);
    return newPosts;
}
