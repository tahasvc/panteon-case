import axios from 'axios';

var ip = '';
if (process.env.NODE_ENV == 'production')
    ip = '192.168.1.44';
else if (process.env.NODE_ENV == 'development')
    ip = 'localhost'

const API_ROOT = 'http://' + ip + ':3001/api';

const instance = axios.create({
    baseURL: API_ROOT,
    timeout: 10000
});

const encode = encodeURIComponent;

const responseBody = res => res.body;

const requests = {
    del: url =>
        instance.delete(`${url}`),
    get: url =>
        instance.get(`${url}`),
    put: (url, body) =>
        instance.put(`${url}`),
    post: (url, body) =>
        instance.post(`${url}`, body)
};

const PrizePool = {
    getTopList: () =>
        requests.get('/getTopList')
};

export default {
    PrizePool
};