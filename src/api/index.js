import axios from './service';

// 获取用户信息
export const fetchAccountInfo = () => {
    return axios.get('/users/current-user-info/user-info').then((res) => {
        if (res?.code === 200) {
            return res.data;
        }
        return Promise.reject(res);
    });
};

export const fetchTest = (params) => {
    return axios.post('/123', params);
};

// 符号分割语句
export const fetchSymboSplit = (params) => {
    return axios.post('/split', params);
};
