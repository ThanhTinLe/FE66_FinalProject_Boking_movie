import React, { useState } from 'react'
import { Route, Redirect, NavLink } from 'react-router-dom';
import { Dropdown, Layout, Menu, message } from 'antd';
import ava from './../../assets/img/icons/noel/avatar.png'
import {
    UserOutlined,
} from '@ant-design/icons';
import { GiFilmSpool } from "react-icons/gi";
import { ACCESS_TOKEN, USER_LOGN } from '../../util/settings';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;


export default function AdminTemplate(props) {

    const [state, setstate] = useState({ collapsed: false });


    const onCollapse = collapsed => {
        setstate({ collapsed: !state.collapsed });
    };
    const { collapsed } = state;

    if (!localStorage.getItem(USER_LOGN)) {
        alert('bạn cần đăng nhập để vào trang này');

        return <Redirect to='/' />
    }

    const userLogin = localStorage.getItem(USER_LOGN);
    const user = JSON.parse(userLogin).hoTen;
    const maLoaNguoiDung = JSON.parse(userLogin).maLoaiNguoiDung;
    if (maLoaNguoiDung !== 'QuanTri') {
        alert('bạn không được quyền truy cập vào trang web này');
        return <Redirect to='/' />
    }

    const onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };
    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item>
                <a className="text-danger" onClick={() => {
                    localStorage.removeItem(USER_LOGN);
                    localStorage.removeItem(ACCESS_TOKEN);
                    window.location.reload();
                }}>
                    Đăng xuất
                </a>
            </Menu.Item>
        </Menu>
    );

    return <Route exact path={props.path} render={(propsRoute) => {

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>

                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <div className="logo">
                            <img src="https://png.pngtree.com/png-clipart/20190617/original/pngtree-beautiful-film-hand-painted-film-lovely-film-camera-roll-png-image_3875724.jpg" alt="logo" width="200" height="65" />
                        </div>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">

                            <Menu.Item key="1">
                                <NavLink to="/admin/users">
                                    Quản lí người dùng
                                </NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<GiFilmSpool />} title="Films">
                            <Menu.Item key="3">
                                <NavLink to="/admin/films">Quản lí phim</NavLink>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <NavLink to="/admin/addfilms">Thêm mới phim</NavLink>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <div className="text-right mr-5">
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link text-white" onClick={e => e.preventDefault()}>
                                    <img className="user__login" height={30} src={ava}
                                        style={{
                                            marginRight: '10px',
                                            borderRadius: '50%'
                                        }}
                                        alt="avatar" />
                                    {user}
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <props.component {...propsRoute} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }} />
}
