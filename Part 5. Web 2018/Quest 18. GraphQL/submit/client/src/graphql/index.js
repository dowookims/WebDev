module.exports = {
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
        return {
            query: `
                query {
                    userWorkingState(userId: "${userId}") {
                        tabs
                        selectedTab
                        cursor
                        userId
                    }
                }
            `
        }
    }
}