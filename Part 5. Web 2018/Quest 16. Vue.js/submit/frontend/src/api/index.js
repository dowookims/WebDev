import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8082'

export default {
    async login(data) {
        try {
            const res = await axios.post('/auth/login', {data});
            return res;
        } catch (e) {
            console.error(e);
        }
    },
    async logout () {
        try {
            const res = axios.post('/auth/logout');
            return res;
        } catch (e) {
            console.errorr(e);
        }
    },
    async getUserData (token) {
        try {
            const res = axios.get('/userdata', {
                headers: {
                    'x-access-token': token
                }
            });
            return res;
        } catch (e) {
            console.error(e)
        }
    },
    async postUserData (token, data) {
        try {
            const res = await axios.post('/userdata', data, {
                headers: {
                    'x-access-token': token
                },
            })
            return res;
        } catch (e) {
            console.error(e);
        }
    },

    async putUserData (token, data) {
        try {
            const res = await axios.put('/userdata', data, {
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
            const res = await axios.post('/notepad', data, {
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
            const res = await axios.put('/notepad', data, {
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
            const res = await axios.get('/notepad', {
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