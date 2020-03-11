import axios from 'axios';
import Query from '../graphql'

const options = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const tokenOptions = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    }
}
export default {
    async login({userId, password}) {
        try {
            const res = await axios.post('http://127.0.0.1:4000', Query.login(userId, password), options);
            return res;
        } catch (e) {
            console.error(e);
        }
    },
    async logout () {
        try {
            const res = axios.post('http://127.0.0.1:4000');
            return res;
        } catch (e) {
            console.errorr(e);
        }
    },
    async getUserData (userId, token) {
        try {
            const res = axios.post('http://127.0.0.1:4000', Query.userWorkingState(userId), tokenOptions(token))
            return res;
        } catch (e) {
            console.error(e)
        }
    },
    async postUserData (token, data) {
        try {
            const res = await axios.post('http://127.0.0.1:4000', data, tokenOptions(token));
            return res;
        } catch (e) {
            console.error(e);
        }
    },

    async putUserData (token, data) {
        try {
            const res = await axios.post('http://127.0.0.1:4000', data, {
                headers: {
                    'x-access-token': token
                },
            })
            return res;
        } catch (e) {
            console.error(e);
        }
    },
    async savePost (token, data) {
        try {
            const res = await axios.post('http://127.0.0.1:4000', data, {
                headers: {
                    'x-access-token': token
                },
            })
            return res;
        } catch (e) {
            console.error(e);
        }
    },

    async putPost (token, data) {
        try {
            const res = await axios.post('http://127.0.0.1:4000', data, {
                headers: {
                    'x-access-token': token
                },
            })
            return res;
        } catch (e) {
            console.error(e);
        }
    },

    async getAllPost (token) {
        try {
            const res = await axios.post('http://127.0.0.1:4000', {
                headers: {
                    'x-access-token': token
                },
            })
            return res;
        } catch (e) {
            console.error(e);
        }
    }
}