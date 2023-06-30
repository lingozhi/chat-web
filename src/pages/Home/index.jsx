/* eslint-disable jsx-a11y/media-has-caption */
import './index.less';
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Form, InputNumber, Popconfirm, Typography, Input } from 'antd';
import { fetchTest, fetchSymboSplit, fetchRedrawParagraph, fetchRedrawStoryboard } from '@/api';

const { TextArea } = Input;
function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [updateCounter, setUpdateCounter] = useState(0);

    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const getData = async () => {
        const data = await fetchTest({ text: 'fetchSymboSplit' });
        setData(data);
        setLoading(false);
    };
    // 根据段落重绘
    // const getRedrawParagraphData = async (part, image_path) => {
    //     const data = await fetchRedrawParagraph({ text: part, image_path });
    //     console.log(data, updateCounter);
    //     setUpdateCounter(updateCounter + 1);
    //     // setData(data);
    //     setLoading(false);
    //     console.log(updateCounter);
    // };
    useEffect(() => {
        console.log(updateCounter);
        const newdata = [...data];
        setData(newdata);
    }, [updateCounter]);
    // 根据分镜重绘
    const getfetchRedrawStoryboardData = async (storyboard, image_path) => {
        const data2 = await fetchRedrawStoryboard({ text: storyboard, image_path });
        console.log(data2, updateCounter);
        setUpdateCounter(updateCounter + 1);
        // setData(data);
        setLoading(false);
        console.log(updateCounter);
        // setData(data);
        setLoading(false);
    };
    useEffect(() => {}, [loading]);
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const cancel = () => {
        setEditingKey('');
    };
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: '段落',
            dataIndex: 'part',
            key: 'part',
            editable: true,
            ellipsis: true,
            width: '23%',
        },
        {
            title: '处理后的段落',
            dataIndex: 'text',
            key: 'text',
            ellipsis: true,
        },
        // {
        //     title: '翻译',
        //     dataIndex: 'translate',
        //     key: 'translate',
        // },
        {
            title: '分镜',
            dataIndex: 'storyboard',
            key: 'storyboard',
            editable: true,
            ellipsis: true,
            width: '23%',
        },
        {
            title: '图片',
            dataIndex: 'image_path',
            key: 'image_path',
            width: '200px',
            render: (text) => (
                <>
                    <img
                        src={`http://localhost:8071/test/images/${text}?update=${updateCounter}`}
                        className=""
                        alt=""
                        style={{ height: '200px', width: '200px' }}
                    />
                </>
            ),
        },
        //     <audio controls>
        //     <source src="/path/to/output_1.wav" type="audio/wav" />
        //     Your browser does not support the audio element.
        //   </audio>
        {
            title: '语音',
            dataIndex: 'audio_path',
            key: 'audio_path',
            width: '20%',
            render: (text) => (
                <>
                    <audio controls style={{ width: '250px', height: '54px' }}>
                        <source
                            src={`http://localhost:8071/test/audio/${text}?update=${updateCounter}`}
                            type="audio/wav"
                        />
                    </audio>
                </>
            ),
        },
        {
            title: '操作',
            dataIndex: 'handle',
            // key: 'handle',
            render: (_, record) => {
                const editable = isEditing(record);
                const { storyboard, part, image_path } = record;
                console.log(record);
                return (
                    <div className="handle">
                        <div>
                            <a
                                onClick={() => {
                                    getfetchRedrawStoryboardData(storyboard, image_path);
                                }}
                            >
                                根据分镜重绘
                            </a>
                        </div>
                        <div>
                            <a
                            // onClick={() => {
                            //     getRedrawParagraphData(part, image_path);
                            // }}
                            >
                                根据段落重绘
                            </a>
                        </div>
                        <div>
                            <a>语音重制</a>
                        </div>
                        <div>
                            {editable ? (
                                <span>
                                    <Typography.Link
                                        onClick={() => save(record.key)}
                                        style={{
                                            marginRight: 8,
                                        }}
                                    >
                                        保存
                                    </Typography.Link>
                                    <Popconfirm title="确认取消?" onConfirm={cancel}>
                                        <a>取消</a>
                                    </Popconfirm>
                                </span>
                            ) : (
                                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                    编辑
                                </Typography.Link>
                            )}
                        </div>
                    </div>
                );
            },
        },
    ];

    // eslint-disable-next-line react/prop-types
    const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <TextArea rows={4} autoSize />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const split = async () => {
        const data = await fetchSymboSplit({ text: 'fetchSymboSplit' });
        setData(data);
        setLoading(false);
    };

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    // useEffect(() => {
    //     getData();
    //     split();
    // }, []);

    return (
        <div className="home">
            <div className="home_input">
                <div className="input">
                    <div className="text">输入key_api：</div>
                    <Input placeholder="请输入key_api" />
                </div>
                <br />
                <div className="input">
                    <div className="text">输入stable diffusion地址：</div>
                    <Input placeholder="请输入stable diffusion地址" />
                </div>
                <br />
            </div>
            <div className="home_btn">
                <Button
                    onClick={() => {
                        setLoading(true);
                        split();
                    }}
                >
                    一键绘制
                </Button>
                <Button
                    onClick={() => {
                        setLoading(true);
                        getData();
                    }}
                >
                    测试
                </Button>
            </div>

            <Form form={form} component={false}>
                <Table
                    columns={mergedColumns}
                    dataSource={data}
                    loading={loading}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    rowClassName="editable-row"
                    rowKey={(record) => record.image_path}
                />
            </Form>
        </div>
    );
}

export default Home;
