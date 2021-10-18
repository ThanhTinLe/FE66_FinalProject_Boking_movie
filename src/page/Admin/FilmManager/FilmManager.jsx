import React, { Fragment, useEffect } from 'react'
import { Table, Input, Space } from 'antd';
import './FilmManager.css';
import { useSelector, useDispatch } from 'react-redux'
import { getFilmsAction, xoaPhimAction } from "./../../../redux/actions/QuanLiPhimAction";
import { NavLink } from 'react-router-dom';


export default function FilmManager() {

    let { danhSachPhim } = useSelector(state => state.FilmReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilmsAction(''));
    }, [])

    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            width: '10%',
            sorter: (a, b) => a.maPhim - b.maPhim,
            // sortDirections: ['descend'],
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'tenPhim',
            width: '10%',
            render: (text, film) => {
                return <Fragment>
                    <img src={film.hinhAnh} alt={film.hinhAnh} width={50} height={50} onError={(e) => {
                        e.target.onError = null;
                        e.target.src = `https://picsum.photos/200/300`
                    }} />
                </Fragment>
            }
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            defaultSortOrder: 'descend',
            // sorter: (a, b) => a.tenPhim - b.tenPhim,
            width: '25%'
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            width: '45%',
            render: (text, film) => {
                return <Fragment>
                    {film.moTa.length > 100 ? film.moTa.substr(0, 100) + '...' : film.moTa}
                </Fragment>
            }
        },
        {
            title: 'Hoạt động',
            dataIndex: '',
            width: '10%',
            render: (text, film) => {
                return <Fragment>
                    <div className="d-flex" style={{ justifyContent: 'space-around' }}>
                        <div>
                            <NavLink key={1} to={`/admin/editfilm/${film.maPhim}`}><i className="fa fa-wrench text-warning"></i></NavLink>
                        </div>
                        <div>
                            <NavLink key={2} to={`/admin/addshowtimes/${film.maPhim}`}><i class="fa fa-calendar-alt text-success"></i></NavLink>
                        </div>
                        <div>
                            <span style={{cursor:'pointer'}} onClick={()=>{
                                if(window.confirm('bạn có chắc muốn xóa phim ' + film.tenPhim + ' không ?')){
                                    dispatch(xoaPhimAction(film.maPhim))
                                }
                            }} key={3} to="/"><i className="fa fa-trash-alt text-danger   "></i></span>
                        </div>

                    </div>
                </Fragment>
            }
        },

    ];
    const data = danhSachPhim;
    
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    const { Search } = Input;

    const onSearch = (value) => {
        dispatch(getFilmsAction(value));
    }

    return (
        <div className="container-fluid">
            <h3 className="text-center">Quản lí Phim</h3>
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

            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"}/>
        </div>
    )
}
