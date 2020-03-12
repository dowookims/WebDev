module.exports = {
    posts: (userId) => {
        return {query:
        `query {
            posts(userId: "${userId}") {
                id
                title
                text
                createdAt
                updatedAt
            }
        }
        `}
    },
    login: (userId, password) => {
        return {query: 
            `query {
                login(userId: "${userId}", password: "${password}") {
                    id
                    nickname
                    isLogin
                    success
                    token
                }
            }`
        }
    },
    userWorkingState: (userId) => {
        return {query:
                `query {
                    userWorkingState(userId: "${userId}") {
                        tabs
                        selectedTab
                        cursorLen
                        userId
                    }
                }`
        }
    },
    createPost: ({title, text, userId}) => {
        return {query:
            `mutation {
                createPost(title:"${title}", text: "${text}", userId: "${userId}") {
                  id
                  title
                  text
                  createdAt
                  updatedAt
                  userId
                }
            }`
        }
    },
    updatePost: ({id, title, text, userId}) => {
        return {query:
            `mutation {
                updatePost(id: "${id}", title:"${title}", text: "${text}", userId: "${userId}") {
                  id
                  title
                  text
                  createdAt
                  updatedAt
                  userId
                }
            }`
        }
    },
    createWorkingState: ({userId, tabs, selectedTab, cursor}) => {
        const sTabs = JSON.stringify(tabs).replace(/"/g, "'");
        return {query:
            `mutation {
                createWorkingState(userId: "${userId}", tabs: "${sTabs}", selectedTab: ${selectedTab}, cursorLen: ${cursor}) {
                    tabs
                    selectedTab
                    cursorLen
                }
            }`
        }
    },
    updateWorkingState: ({userId, tabs, selectedTab, cursor}) => {
        const sTabs = JSON.stringify(tabs).replace(/"/g, "'");
        console.log("ASD", sTabs)
        console.log("BDS", sTabs.replace(/"/g, "'"))
        return {query:
            `mutation {
                createWorkingState(userId: "${userId}", tabs: "${sTabs}", selectedTab: ${selectedTab}, cursorLen: ${cursor}) {
                    tabs
                    selectedTab
                    cursorLen
                }
            }`
        }
    }
}