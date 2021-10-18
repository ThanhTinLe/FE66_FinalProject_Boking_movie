import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { danhSachNguoiDung, xoaNguoiDung } from './../../../redux/actions/UserAction'
import { Table, Input, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import Search from 'antd/lib/transfer/search';

export default function UserManager() {

    let { thongTinNguoiDung } = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(danhSachNguoiDung());
    }, [])
    console.log(thongTinNguoiDung)

    const data1 = thongTinNguoiDung;

    const columns1 = [
        {
            title: 'Họ và tên',
            dataIndex: 'hoTen',
            width: '15%'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '30%'
        },
        {
            title: 'Số điện thoạt',
            dataIndex: 'soDt',
            width: '15%'
        },
        {
            title: 'taiKhoan',
            dataIndex: 'taiKhoan',
            width: '20%'
        },
        {
            title: 'Loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
            // width: '20%'
        },
        {
            title: 'Chức năng',
            width: '10%',
            render: (text, user) => {
                return <Fragment>
                    <div className="d-flex" style={{ justifyContent: 'space-around' }}>
                        <div>
                            <NavLink key={1} to={`/admin/edituser/` + user.taiKhoan}><i className="fa fa-wrench text-warning"></i></NavLink>
                        </div>
                        {/* <div>
                            <span style={{ cursor: 'pointer' }} onClick={() => {
                                if (window.confirm(`bạn có chắc muốn xóa ` + user.hoTen )) {
                                    dispatch(xoaNguoiDung(user.taiKhoan))
                                }
                            }} key={3} to="/"><i className="fa fa-trash-alt text-danger"></i></span>
                        </div> */}

                    </div>
                </Fragment>
            }
        },
    ];

    const { Search } = Input;
    const onSearch = (value) => {
        dispatch(danhSachNguoiDung(value));
    }
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <div className="container-fluid">
            <h3 className="text-center">Quản lí người dùng</h3>
            <div className="text-right">
                <Space direction="vertical">
                    <Search
                        className="mt-2 mb-2"
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        onSearch={onSearch}
                    />
                </Space>
            </div>
            <Table columns={columns1} dataSource={data1} onChange={onChange} rowKey={"taiKhoan"} />
        </div>
    )
}
