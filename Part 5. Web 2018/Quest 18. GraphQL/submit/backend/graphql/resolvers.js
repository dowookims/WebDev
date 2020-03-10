const { User, Post, UserWorkingState } = require('../models');
const resolvers = {
    Query: {
        posts: async (userId) => {
            const res = await Post.findAll({ where: {userId }})
            return res.map(post => post.dataValues)
        },
        userWorkingState: (userId) => {
            return UserWorkingState.findOne({ where: { userId }})
        },
        login: (userId, password) => {
            return User.findOne({ where: { id: userId }})
        }
    },
    Mutations: {
        createPost: (_, { title, text, userId}) => {
            const post = Post.create({
                title,
                text,
                userId,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            return post.dataValues
        },
        updatePost: (_, {id, title, text, userId}) => {
            const post = Post.update({
                title,
                text,
                userId,
                updatedAt: new Date()
            }, {
                where: { id }
            });
            return post
        },
        createWorkingState: (_, { userId, tabs, selectedTab, cursor}) => {
            const UserWorkingState = UserWorkingState.create({
                tabs: JSON.stringify(tabs),
                selectedTab,
                cursor,
                userId,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return UserWorkingState.dataValues;
        },
        updateWorkingState: (_, { userId, tabs, selectedTab, cursor}) => {
            const UserWorkingState = UserWorkingState.update({
                tabs: JSON.stringify(tabs),
                selectedTab,
                cursor,
                updatedAt: new Date()
            }, { where: { userId }})
        }
    }
}

module.exports = resolvers