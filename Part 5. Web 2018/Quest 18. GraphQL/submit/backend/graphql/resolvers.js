const makeToken = require('../middleware/makeToken');
const { User, Post, UserWorkingState } = require('../models');
const resolvers = {
    Query: {
        posts: async (_, { userId}) => {
            const res = await Post.findAll({ where: { userId }})
            return res.map(post => post.dataValues)
        },
        userWorkingState: async (_, { userId }, { request, isAuthenticated }) => {
            return await UserWorkingState.findOne({ where: { userId }})
        },
        login: async (_, { userId, password }, { request }) => {
            const user = await User.findOne({ where: { id: userId }})
            let isLogin = false;
            let success = false;
            let token = null;
            if (!user) {
                return {success, isLogin}
            }
            else if (user.dataValues.password === password) {
                token = makeToken(userId, user.dataValues.nickname)
                isLogin = true;
                success = true;
                request.user = userId
            } else {
                success = true;
            };
            return { ...user.dataValues, isLogin, success, token}
        }
    },
    Mutations: {
        createPost: async (_, { title, text, userId}, { request, isAuthenticated }) => {
            const post = await Post.create({
                title,
                text,
                userId,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            return post.dataValues
        },
        updatePost: async (_, {id, title, text, userId}, { request, isAuthenticated }) => {
            const post = await Post.update({
                title,
                text,
                userId,
                updatedAt: new Date()
            }, {
                where: { id }
            });
            return post
        },
        createWorkingState: async (_, { userId, tabs, selectedTab, cursor}, { request, isAuthenticated }) => {
            const UserWorkingState = await UserWorkingState.create({
                tabs: JSON.stringify(tabs),
                selectedTab,
                cursor,
                userId,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return UserWorkingState.dataValues;
        },
        updateWorkingState: async (_, { userId, tabs, selectedTab, cursor}, { request, isAuthenticated }) => {
            const userWorkingState = await UserWorkingState.update(
                {
                    tabs: JSON.stringify(tabs),
                    selectedTab,
                    cursor,
                    updatedAt: new Date()
                }, 
                { where: { userId }}
            )
            return userWorkingState;
        }
    }
}

module.exports = resolvers