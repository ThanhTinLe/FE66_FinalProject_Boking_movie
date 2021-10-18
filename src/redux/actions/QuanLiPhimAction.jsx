import axios from 'axios';
import { GET_CUM_RAP, GET_CUM_RAP_HE_THONG, GET_FILMS, GET_THONG_TIN_DAT_VE, GET_THONG_TIN_FILM_UPDATE, PLAY_MODAL } from './types/QuanLiPhimType';

import { FilmManagerService, FilmService } from './../../services/FilmService';
import { LAY_THONG_TIN_LICH_CHIEU_PHIM, LAY_THONG_TIN_PHIM } from './types/UserType';
import { history } from '../../App';

export const getFilmsAction = (tenPhim = '') => {
    return async dispatch => {
        try {
            let result = '';
            if (tenPhim != '') {
                result = await axios({
                    url: `http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${tenPhim}`,
                    method: 'GET',
                });
            } else {
                result = await axios({
                    url: `http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`,
                    method: 'GET',
                });
            }
            dispatch({
                type: GET_FILMS,
                mangPhim: result.data.content,
            })
        } catch (errors) {
            console.log(errors);
        }
    }
}
export const playModal = (maPhim, trailerId, isOpen) => ({
    type: PLAY_MODAL,
    maPhim: maPhim, trailerId: trailerId, isOpen: isOpen
})

export const getCumRapAction = () => {
    return async dispatch => {
        try {
            const result = await axios({
                url: 'http://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01',
                method: 'GET',
            });
            dispatch({
                type: GET_CUM_RAP,
                cumRap: result.data.content,
            })
        } catch (errors) {
            console.log(errors.response.data);
        }
    }
}
export const getCumRapHeThongAction = (maHeThong) => {
    return async dispatch => {
        try {
            const result = await axios({
                url: `http://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThong}`,
                method: 'GET',
            });
            dispatch({
                type: GET_CUM_RAP_HE_THONG,
                cumRapTheoHeThong: result.data.content,
            })
        } catch (errors) {
            console.log(errors.response.data);
        }
    }
}

export const layThongTinPhimAction = (idPhim) => {
    return async dispatch => {
        try {
            const result = await FilmManagerService.layThongTinPhim(idPhim);

            dispatch({
                type: LAY_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })

        } catch (error) {
            console.log(error);
        }
    }
}
export const layThongTinLichChieuPhimAction = (idPhim) => {
    return async dispatch => {
        try {
            const result = await FilmManagerService.layThongTinLichChieuPhim(idPhim);

            dispatch({
                type: LAY_THONG_TIN_LICH_CHIEU_PHIM,
                thongTinLichChieuPhim: result.data.content
            })

        } catch (error) {
            console.log(error);
        }
    }
}

export const layThongTinDatVeAction = (maLichChieu) => {
    return async dispatch => {
        try {
            const result = await FilmManagerService.layThongTinDatVe(maLichChieu);
            // console.log({result});
            dispatch({
                type: GET_THONG_TIN_DAT_VE,
                data: result.data.content
            })

        } catch (errors) {
            console.log(errors);
        }
    }
}

export const datVeAction = (data, token) => {
    return async () => {
        try {
            await FilmManagerService.datVeService(data, token);
            window.location.reload();
        } catch (errors) {
            console.log(errors);
        }
    }
}

export const themPhimAction = (data) => {
    return async (dispatch, getState) => {

        try {
            const result = FilmManagerService.themMoiPhimService(data);

            alert('Thêm phim thành công');

            await dispatch(getFilmsAction());

            window.location.reload();

        } catch (errors) {
            console.log(errors.response?.data);
        }

    }
}

export const layThongTinFilmUpdate = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await FilmManagerService.layThongTinFilmUpdate(maPhim);

            dispatch({
                type: GET_THONG_TIN_FILM_UPDATE,
                filmDetail: result.data.content
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await FilmManagerService.xoaPhim(maPhim);
            alert('xóa phim thành công')

            dispatch(getFilmsAction());
        } catch (error) {
            console.log(error)
        }

    }
}

export const updateFilm = (data) => {
    return async (dispatch) => {

        try {

            const result = FilmManagerService.capNhatPhim(data);

            console.log(result);

            alert('cập nhật phim thành công');

            await dispatch(getFilmsAction());

            history.push('/admin/films');

        } catch (errors) {
            console.log(errors.response.data);
        }

    }
}

export const taoLichChieuDatve = (data) => {
    return async (dispatch) => {
        try {
            const result = await FilmManagerService.taoLichChieu(data);
            alert(result.data.content)
        } catch (error) {
            console.log(error.response.data);
        }
    }
}
