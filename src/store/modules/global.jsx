/**
 * 全局模块
 */
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'global',
    initialState: {
        // 内容状态 loading=>数据获取中 | resolved=> 获取成功，显示页面 | rejected=> 配置错误
        contentState: 'loading',
        // 用户信息
        userInfo: {},
        // 个人中心信息
        centerUserInfo: {},
        // 用户列表
        userSimpleList: [],
        // 当前选中的公司
        storeCurrentFactory: {},
    },
    reducers: {
        setContentState: (state, action) => {
            state.contentState = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setCenterUserInfo: (state, action) => {
            state.centerUserInfo = action.payload;
        },
        setUserSimpleList: (state, action) => {
            state.userSimpleList = action.payload;
        },
        setStoreCurrentFactory: (state, action) => {
            state.storeCurrentFactory = action.payload;
        },
    },
});

export const { setContentState, setUserInfo, setUserSimpleList, setCenterUserInfo, setStoreCurrentFactory } =
    slice.actions;

export default slice.reducer;
