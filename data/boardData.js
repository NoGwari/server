let posting = [
    {
        id: 1,
        content: "게시판 test",
        username: "test1",
        userId: "1",
        createdAt: new Date().toString(),
    },
    {
        id: 2,
        content: "안뇽!",
        username: "test2",
        userId: "1",
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
