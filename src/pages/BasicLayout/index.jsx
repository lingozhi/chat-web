import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { menuList } from '../../routers/const';
import './index.less';

const { Header, Content, Sider } = Layout;

const BasicLayout = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = window.location;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        if (pathname === '' || pathname === '/') {
            navigate(`/index`);
        }
    }, [pathname]);
    return (
        <Layout className="layout">
            <Header className="header">
                首页
                <div className="logo" />
            </Header>
            <Layout>
                <Sider
                    width={200}
                    style={{
                        background: colorBgContainer,
                        overflowY: 'auto',
                    }}
                >
                    <Menu
                        mode="horizontal"
                        defaultSelectedKeys={['/index']}
                        items={menuList}
                        onSelect={({ key }) => {
                            navigate(key);
                        }}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    );
};
export default BasicLayout;
