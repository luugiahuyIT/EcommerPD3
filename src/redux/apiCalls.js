import { loginStart, loginFailure, loginSuccess } from './userRedux';
import { publicRequest, userRequest } from '../api/request';
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  getRecommendList
} from './productRedux';

import { getInvoice } from './invoiceRedux';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
    const { accessToken, _id } = res.data;
    localStorage.setItem('USER_TOKEN', accessToken);
    localStorage.setItem('USER_ID', _id);
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch, params) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get('/products', { params });
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const addInvoice = async (dispatch, order) => {
  // dispatch(getProductStart());
  try {
    const res = await userRequest.post('/orders/create', order);
    // dispatch(getProductSuccess(res.data));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const getInvoiceList = async (dispatch, userId) => {
  // dispatch(getProductStart());
  console.log('userId', userId);
  try {
    const res = await userRequest.get(`/orders/find/${userId}`);
    dispatch(getInvoice(res.data));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};

export const getRecommendBook = async (dispatch) => {
  // dispatch(getProductStart());
  try {
    const res = await userRequest.get(`/products/recommend`);
    dispatch(getRecommendList(res.data));
  } catch (err) {
    // dispatch(getProductFailure());
  }
};
