import React, { useState } from 'react';
import './AddFilm.css';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup'
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';
import { useDispatch } from 'react-redux';
import { themPhimAction } from '../../../redux/actions/QuanLiPhimAction';


export default function AddFilm() {
    const [imgSrc, setimgSrc] = useState()
    const dispatch =  useDispatch();

    const { TextArea } = Input;

    const formik = useFormik({
        initialValues: {
            tenPhim: "",
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            SapChieu: false,
            DangChieu: false,
            Hot: false,
            danhGia: 0,
            hinhAnh: {},
            maNhom:'GP01'
        },
        validationSchema: Yup.object().shape({
            tenPhim: Yup.string().required('tên phim không được bỏ trống'),
            trailer: Yup.string().required('trailer không được bỏ trống'),
            moTa: Yup.string().required('mô tả không được bỏ trống'),
            ngayKhoiChieu: Yup.string().required('ngày khởi chiếu không được bỏ trống'),
            danhGia: Yup.string().required('đánh giá không được bỏ trống')
        }),
        onSubmit: (value) => {
            // console.log(value);
            let frmData = new FormData();
            for(let key in value){
                if(key !== 'hinhAnh'){
                    frmData.append(key, value[key]);
                }else{
                    if(value.hinhAnh){
                        frmData.append(key, value.hinhAnh, value.hinhAnh.name);
                    }
                }
                console.log(key,frmData.get(key));
            }
            dispatch(themPhimAction(frmData))
        }
    })

    const handleChangeDatePicker = (value) => {

        let ngayKhoiChieu = (moment(value).format("DD/MM/YYYY"))

        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }
    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }
    const handleChangeFile = (e) => {
        let file = e.target.files[0]
        console.log(file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setimgSrc(e.target.result)
            console.log(e.target.result);
        }

        formik.setFieldValue('hinhAnh', file);

    }
    return (
        <>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal">
                <h3 className="text-center mb-5">Thêm mới phim</h3>
                <Form.Item label="Tên phim">
                    <Input name="tenPhim" onChange={formik.handleChange} />
                    {formik.errors.tenPhim && formik.touched.tenPhim ?
                                    (<div className="text text-danger">{formik.errors.tenPhim}</div>) : null}
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} />
                    {formik.errors.trailer && formik.touched.trailer ?
                                    (<div className="text text-danger">{formik.errors.trailer}</div>) : null}
                </Form.Item>
                <Form.Item label="Mô tả">
                    <TextArea rows={4} name="moTa" onChange={formik.handleChange} />
                    {formik.errors.moTa && formik.touched.moTa ?
                                    (<div className="text text-danger">{formik.errors.moTa}</div>) : null}
                </Form.Item>
                <Form.Item label="Ngãy Khởi chiếu">
                    <DatePicker name="ngayKhoiChieu" format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} />
                    {formik.errors.ngayKhoiChieu && formik.touched.ngayKhoiChieu ?
                                    (<div className="text text-danger">{formik.errors.ngayKhoiChieu}</div>) : null}
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch name="SapChieu" onChange={handleChangeSwitch('SapChieu')} />
                </Form.Item>
                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch name="DangChieu" onChange={handleChangeSwitch('DangChieu')} />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch name="Hot" onChange={handleChangeSwitch('Hot')} />
                </Form.Item>
                <Form.Item label="Đánh giá">
                    <InputNumber type="number" placeholder="1->10" min={1} max={10} onChange={(value) => {
                        formik.setFieldValue('danhGia', value);
                    }} />
                    {formik.errors.danhGia && formik.touched.danhGia ?
                                    (<div className="text text-danger">{formik.errors.danhGia}</div>) : null}
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <div className="d-block">
                        <input type="file" name="hinhAnh" id="hinhAnh" onChange={handleChangeFile}
                            accept="image/png, image/jpeg, image/gif, image/jpg" />
                    </div>
                    <br />
                    <div className="d-block mt-5">
                        <img src={imgSrc} width="100" height="150" alt="hinh ảnh" />
                    </div>
                    {formik.errors.hinhAnh && formik.touched.hinhAnh ?
                                    (<div className="text text-danger">{formik.errors.hinhAnh}</div>) : null}
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="btn btn-primary">Thêm phim</button>
                </Form.Item>
            </Form>
        </>
    )
}
