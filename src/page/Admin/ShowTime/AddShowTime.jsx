import React, { useEffect, useState } from 'react'
import { Form, DatePicker, InputNumber, Button, Select } from 'antd';
import { FilmManagerService } from '../../../services/FilmService';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinFilmUpdate, taoLichChieuDatve } from '../../../redux/actions/QuanLiPhimAction';
import * as Yup from 'yup'

export default function AddShowTime(props) {

    const [state, setstate] = useState({
        heThongRap: [],
        cumRap: [],
        rap: []
    })
    const dispatch = useDispatch();
    let { id } = props.match.params;
    const { filmDetail } = useSelector(state => state.FilmReducer)

    useEffect(async () => {
        let result = await FilmManagerService.layThongTinHeThongRap()
        dispatch(layThongTinFilmUpdate(id));
        setstate({
            ...state,
            heThongRap: result.data.content
        })

    }, [])

    const formik = useFormik({
        initialValues: {
            maPhim: parseInt(id),
            ngayChieuGioChieu: '',
            maRap: "",
            giaVe: 75000
        },
        validationSchema: Yup.object().shape({
            ngayChieuGioChieu: Yup.string().required('Ngày giờ chiếu không được bỏ trống'),
            maRap: Yup.string().required('Vui lòng chọn cụm rạp'),
            giaVe: Yup.number(),
        }),
        onSubmit: (value) => {
            console.log(value);
            try {
                dispatch(taoLichChieuDatve(value));
            } catch (error) {
                console.log(error)
            }
           
        }
    })

    const onChangeHeThong = async (value) => {
        try {
            let result = await FilmManagerService.layThongTinCumRapTheoHeThong(value);
            setstate({
                ...state,
                cumRap: result.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
    const onChangeRap = async (value) => {
        console.log('value', value);
        formik.setFieldValue('maRap', value);
    }
    const onChangeDate = (value) => {
        console.log(value)
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'));
    }
    const onchangePrice = (value) => {
        formik.setFieldValue('giaVe', value);
    }
    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onSubmitCapture={formik.handleSubmit}
            >
                <h3>Tạo lịch chiếu - {filmDetail.tenPhim}</h3>
                <img src={filmDetail.hinhAnh} alt="hinhAnh" />
                <Form.Item label="Chọn hệ thống rạp">
                    <Select options={state.heThongRap?.map((htr, index) => {
                        return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
                    })} onChange={onChangeHeThong} placeholder="Please select" />
                </Form.Item>
                <Form.Item label="Chọn cụm rạp">
                    <Select name="maRap" options={state.cumRap?.map((rap, index) => {
                        return { label: rap.tenCumRap, value: rap.maCumRap }
                    })} onChange={onChangeRap} placeholder="Please select" />
                    {formik.errors.maRap && formik.touched.maRap ?
                        (<div className="text text-danger">{formik.errors.maRap}</div>) : null}
                </Form.Item>
                <Form.Item label="Chọn ngày giờ chiếu">
                    <DatePicker name="ngayChieuGioChieu" format="DD/MM/YYYY hh:mm:ss" showTime onOk={onChangeDate} onChange={onChangeDate} />
                    {formik.errors.ngayChieuGioChieu && formik.touched.ngayChieuGioChieu ?
                        (<div className="text text-danger">{formik.errors.ngayChieuGioChieu}</div>) : null}
                </Form.Item>
                <Form.Item label="Giá vé">
                    <InputNumber name="giaVe" min={75000} max={150000} value={formik.values.giaVe} onChange={onchangePrice} />
                    {formik.errors.giaVe && formik.touched.giaVe ?
                        (<div className="text text-danger">{formik.errors.giaVe}</div>) : null}
                </Form.Item>
                <Form.Item label="Chức năng">
                    <button className="btn btn-primary" type="submit">Tạo lịch chiếu</button>
                </Form.Item>
            </Form>
        </div>
    )
}
