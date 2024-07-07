const mongoose = require('mongoose');
const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const { faker } = require('@faker-js/faker');

mongoose.connect('mongodb://localhost:27017/blog_app');


const seedData = async () => {
    try {
        await Blog.deleteMany({});
        await User.deleteMany({});

        const users = new Set(); // Use a Set to ensure unique users
        const usedUsernames = new Set();
        const usedEmails = new Set();

        while (users.size < 100) { // Generate 10 unique users
            let username = faker.internet.userName();
            let email = faker.internet.email();
            let password = faker.internet.password();

            // Ensure unique and non-null username and email
            while (usedUsernames.has(username) || !username) {
                username = faker.internet.userName();
            }
            while (usedEmails.has(email) || !email) {
                email = faker.internet.email();
            }

            usedUsernames.add(username);
            usedEmails.add(email);

            if (username && email && password) {
                const existingUser = await User.findOne({ username: username });
                if (!existingUser) {
                    const user = new User({
                        username: username,
                        email: email,
                        password: password
                    });

                    try {
                        await user.save(); // Save the user to ensure _id is generated
                        users.add(user); // Store the saved user document in the Set
                    } catch (err) {
                        console.log('Error saving user:', { username, email, password, err });
                    }
                }
            } else {
                console.log('Invalid user data:', { username, email, password });
            }
        }

        // Convert Set to array for easier manipulation if needed
        const usersArray = Array.from(users);

        // Debug: Log users before inserting
        console.log('Users to insert:', usersArray);

        const blogs = [];

        const images = [
            "https://cdn.pixabay.com/photo/2020/02/11/19/56/laptop-4840790_1280.jpg",
            "https://cdn.pixabay.com/photo/2015/09/04/23/28/wordpress-923188_1280.jpg",
            "https://cdn.pixabay.com/photo/2016/11/20/09/06/laptop-1842297_1280.jpg",
            "https://cdn.pixabay.com/photo/2014/08/27/08/07/blogging-428954_1280.jpg",
            "https://cdn.pixabay.com/photo/2015/10/02/15/00/diary-968592_1280.jpg",
            "https://cdn.pixabay.com/photo/2020/06/19/21/18/laptop-5318837_1280.jpg",
            "https://cdn.pixabay.com/photo/2017/04/05/01/16/food-2203732_1280.jpg",
            "https://cdn.pixabay.com/photo/2019/04/08/12/01/flatlay-4111862_1280.jpg",
            "https://cdn.pixabay.com/photo/2019/05/21/23/26/strawberry-4220380_1280.jpg",
            "https://cdn.pixabay.com/photo/2020/05/24/02/00/barber-shop-5212059_1280.jpg",
            "https://cdn.pixabay.com/photo/2017/11/11/19/45/fashion-2940197_1280.jpg"
        ];

        for (let i = 0; i < 100; i++) {
            const title = faker.lorem.sentence();
            const content = faker.lorem.paragraphs();
            const media = images[Math.floor(Math.random() * images.length)];
            const author = usersArray[Math.floor(Math.random() * usersArray.length)]._id;

            // Debug: Log generated blog data
            console.log('Generated blog data:', { title, content, media, author });

            if (title && content && media && author) {
                const blog = new Blog({
                    title: title,
                    content: content,
                    media: media,
                    author: author,
                    love: []
                });
                blogs.push(blog);
            } else {
                console.log('Invalid blog data:', { title, content, media, author });
            }
        }

        // Debug: Log blogs before inserting
        console.log('Blogs to insert:', blogs);

        await Blog.insertMany(blogs);

        console.log('Seed data inserted successfully!');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error inserting seed data: ', err);
        mongoose.connection.close();
    }
};

seedData();