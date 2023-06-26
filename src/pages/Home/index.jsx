import './index.less';
import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { fetchTest, fetchSymboSplit } from '@/api';

function Home() {
    const [data, setData] = useState([]);
    const getData = async () => {
        const data = await fetchTest();
    };
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            title: 'index',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'part',
            dataIndex: 'part',
            key: 'part',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'text',
            dataIndex: 'text',
            key: 'text',
        },
    ];

    const split = async () => {
        const data = await fetchSymboSplit({ text: 'fetchSymboSplit' });
        setData(data);
        setLoading(false);
    };
    // useEffect(() => {
    //     getData();
    //     split();
    // }, []);

    return (
        <div className="home">
            <div
                onClick={() => {
                    setLoading(true);
                    split();
                }}
            >
                文本切割
            </div>
            <Table columns={columns} dataSource={data} loading={loading} />
        </div>
    );
}

export default Home;
