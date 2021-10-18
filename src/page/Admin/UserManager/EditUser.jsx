import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { capNhatAction, capNhatNguoiDung, danhSachNguoiDungUpdate } from '../../../redux/actions/UserAction';
import * as Yup from 'yup'
import {
    Form,
    Input,
    Button,
    Select
} from 'antd';
import { ACCESS_TOKEN } from '../../../util/settings';

export default function EditUser(props) {

    const dispatch = useDispatch();
    let { detailUser } = useSelector(state => state.UserReducer);

    let { id } = props.match.params;
    useEffect(() => {
        dispatch(danhSachNguoiDungUpdate(id))
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: detailUser[0]?.taiKhoan,
            matKhau: detailUser[0]?.matKhau,
            email: detailUser[0]?.email,
            soDt: detailUser[0]?.soDt,
            maNhom: 'GP01',
            maLoaiNguoiDung: detailUser[0]?.maLoaiNguoiDung,
            hoTen: detailUser[0]?.hoTen,
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống'),
            matKhau: Yup.string().required('Mật khẩu không được bỏ trống'),
            email: Yup.string().required('Email không được bỏ trống'),
            soDt: Yup.string().required('Số điện thoại không được bỏ trống'),
            hoTen: Yup.string().required('Họ và tên không được bỏ trống')
        }),
        onSubmit: (value) => {

            console.log(value)
            dispatch(capNhatNguoiDung(value))
        }
    })

    console.log(formik.values.maLoaiNguoiDung);

    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const nguoiDung = [
        {
            name: 'Quản trị',
            value: 'QuanTri'
        },
        {
            name: 'Khách hàng',
            value: 'KhachHang'
        }
    ];
    let chuc = formik.values.maLoaiNguoiDung
    const [chucvu, setchucvu] = useState(chuc)
    console.log('akda', chucvu);
    const handleChangeNguoi = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value);
    }
    return (
        <div>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"

                onSubmitCapture={formik.handleSubmit}
            >
                <h3 className="text-center mb-5">Cập nhật người dùng</h3>
                <Form.Item label="Họ và tên">
                    <Input name="hoTen" value={formik.values.hoTen} onChange={formik.handleChange} />
                    {formik.errors.hoTen && formik.touched.hoTen ?
                        (<div className="text text-danger">{formik.errors.hoTen}</div>) : null}
                </Form.Item>
                <Form.Item label="Tài khoản">
                    <Input name="taiKhoan" value={formik.values.taiKhoan} onChange={formik.handleChange} />
                    {formik.errors.taiKhoan && formik.touched.taiKhoan ?
                        (<div className="text text-danger">{formik.errors.taiKhoan}</div>) : null}
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name="matKhau" value={formik.values.matKhau} onChange={formik.handleChange} />
                    {formik.errors.matKhau && formik.touched.matKhau ?
                        (<div className="text text-danger">{formik.errors.matKhau}</div>) : null}
                </Form.Item>
                <Form.Item label="Email">
                    <Input name="email" value={formik.values.email} onChange={formik.handleChange} />
                    {formik.errors.email && formik.touched.email ?
                        (<div className="text text-danger">{formik.errors.email}</div>) : null}
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name="soDt" value={formik.values.soDt} onChange={formik.handleChange} />
                    {formik.errors.soDt && formik.touched.soDt ?
                        (<div className="text text-danger">{formik.errors.soDt}</div>) : null}
                </Form.Item>
                <Form.Item label="chức năng người dùng">
                <Select name="maRap" options={nguoiDung?.map((nguoi, index) => {
                        return { label: nguoi.name, value: nguoi.value }
                    })} onChange={handleChangeNguoi} placeholder="Please select" value={formik.values.maLoaiNguoiDung} />
                </Form.Item>
                <Form.Item label="Button">
                    <button type="submit" className="btn btn-primary">Cập nhật</button>
                </Form.Item>
            </Form>
        </div>
    )
}
