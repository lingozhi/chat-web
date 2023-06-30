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

// 根据段落重绘
export const fetchRedrawParagraph = (params) => {
    return axios.post('/redraw_paragraph', params);
};

// 根据分镜重绘
export const fetchRedrawStoryboard = (params) => {
    return axios.post('/redraw_storyboard', params);
};
