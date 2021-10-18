import React, { useEffect, useState } from 'react';
import './AddFilm.css';
import { Formik, useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup'
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinFilmUpdate, updateFilm } from '../../../redux/actions/QuanLiPhimAction';


export default function EditFilm(props) {
    const [imgSrc, setimgSrc] = useState('')
    const dispatch = useDispatch();
    const { filmDetail } = useSelector(state => state.FilmReducer)

    let { id } = props.match.params;
    useEffect(() => {

        dispatch(layThongTinFilmUpdate(id));

    }, [])

    const { TextArea } = Input;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: id,
            tenPhim: filmDetail?.tenPhim,
            trailer: filmDetail?.trailer,
            moTa: filmDetail?.moTa,
            ngayKhoiChieu: filmDetail?.ngayKhoiChieu,
            sapChieu: filmDetail.sapChieu,
            danChieu: filmDetail.dangChieu,
            hot: filmDetail.hot,
            danhGia: filmDetail?.danhGia,
            hinhAnh: null,
            maNhom: 'GP01'
        },
        validationSchema: Yup.object().shape({
            tenPhim: Yup.string().required('tên phim không được bỏ trống'),
            trailer: Yup.string().required('trailer không được bỏ trống'),
            moTa: Yup.string().required('mô tả không được bỏ trống'),
            ngayKhoiChieu: Yup.string().required('ngày khởi chiếu không được bỏ trống'),
            danhGia: Yup.string().required('đánh giá không được bỏ trống')
        }),
        onSubmit: (value) => {

            let frmData = new FormData();
            for (let key in value) {
                if (key !== 'hinhAnh') {
                    frmData.append(key, value[key]);
                } else {
                    if (value.hinhAnh !== null) {
                        frmData.append(key, value.hinhAnh, value.hinhAnh.name);
                    }
                }
                console.log(key, frmData.get(key));
            }
            console.log(frmData);
            dispatch(updateFilm(frmData))
        }
    })

    const handleChangeDatePicker = (value) => {
        console.log('1', value);
        let formatDate = moment(value).format('DD/MM/YYYY');
        console.log('2', formatDate);

        formik.setFieldValue('ngayKhoiChieu', formatDate)
        console.log('3', formik.values.ngayKhoiChieu);
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
                <h3 className="text-center mb-5">Cập nhật phim</h3>
                <Form.Item label="Tên phim">
                    <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
                    {formik.errors.tenPhim && formik.touched.tenPhim ?
                        (<div className="text text-danger">{formik.errors.tenPhim}</div>) : null}
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
                    {formik.errors.trailer && formik.touched.trailer ?
                        (<div className="text text-danger">{formik.errors.trailer}</div>) : null}
                </Form.Item>
                <Form.Item label="Mô tả">
                    <TextArea rows={4} name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
                    {formik.errors.moTa && formik.touched.moTa ?
                        (<div className="text text-danger">{formik.errors.moTa}</div>) : null}
                </Form.Item>
                <Form.Item label="Ngãy Khởi chiếu">
                    {/* <DatePicker
                        defaultValue={moment(moment(formik.values.ngayKhoiChieu).format('DD/MM/YYYY'),'DD/MM/YYYY')}
                        // defaultValue={moment('20/10/2021','DD/MM/YYYY')}
                        onChange={handleChangeDatePicker}
                        format={value => `${value.format('DD/MM/YYYY')}`}
                    /> */}
                    <DatePicker
                        defaultValue={moment(formik.values.ngayKhoiChieu)}
                        // defaultValue={moment('20/10/2021','DD/MM/YYYY')}
                        onChange={handleChangeDatePicker}
                        format='DD/MM/YYYY'
                    />
                    {/* <Input name="" value={moment(formik.values.ngayKhoiChieu,'DD/MM/YYYY').format('DD/MM/YYYY')} /> */}
                    {formik.errors.ngayKhoiChieu && formik.touched.ngayKhoiChieu ?
                        (<div className="text text-danger">{formik.errors.ngayKhoiChieu}</div>) : null}
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch name="sapChieu" onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
                </Form.Item>
                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch name="dangChieu" onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch name="hot" onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
                </Form.Item>
                <Form.Item label="Đánh giá">
                    <InputNumber type="number" min={1} max={10} defaultValue={10} placeholder="1->10" onChange={(value) => {
                        formik.setFieldValue('danhGia', value);
                    }} value={formik.values.danhGia} />
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
                        <img width="100" height="150" alt="hinh ảnh"
                            src={imgSrc === '' ? filmDetail.hinhAnh : imgSrc}
                        />
                    </div>
                    {formik.errors.hinhAnh && formik.touched.hinhAnh ?
                        (<div className="text text-danger">{formik.errors.hinhAnh}</div>) : null}
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="btn btn-primary">Cập nhật phim</button>
                </Form.Item>
            </Form>
        </>
    )
}
