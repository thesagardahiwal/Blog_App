const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();


mongoose.connect("mongodb://localhost:27017/blogDB");


const users = [
    { username: 'JohnDoe', email: 'john@example.com', password: 'password123' },
    { username: 'JaneSmith', email: 'jane@example.com', password: 'password123' },
    { username: 'AliceJohnson', email: 'alice@example.com', password: 'password123' }
];

const posts = [
    { title: 'First Post', content: 'This is the content of the first post.', author: null },
    { title: 'Second Post', content: 'This is the content of the second post.', author: null },
    { title: 'Third Post', content: 'This is the content of the third post.', author: null }
];


async function seedUsers() {
    for (let user of users) {
        user.password = await bcrypt.hash(user.password, 12);
        await User.create(user);
    }
    console.log('Users seeded');
}


async function seedPosts() {
    const john = await User.findOne({ email: 'john@example.com' });
    const jane = await User.findOne({ email: 'jane@example.com' });
    const alice = await User.findOne({ email: 'alice@example.com' });

    posts[0].author = john._id;
    posts[1].author = jane._id;
    posts[2].author = alice._id;

    for (let post of posts) {
        await Post.create(post);
    }
    console.log('Posts seeded');
}

// Seed data and close connection
async function seedData() {
    await seedUsers();
    await seedPosts();
    mongoose.connection.close();
}

seedData().catch(err => {
    console.error(err);
    mongoose.connection.close();
});
