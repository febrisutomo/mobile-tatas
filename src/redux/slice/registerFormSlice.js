import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    email: '',
    password: '',
    nik: '',
    name: '',
    gender_id: null,
    blood_type_id: null,
    phone_number: '',
    province_id: null,
    regency_id: null,
    district_id: null,
    address: null,
  },
};

export const registerFormSlice = createSlice({
  initialState,
  name: 'registerForm',
  reducers: {
    resetFormData: () => initialState,
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export default registerFormSlice;

export const { resetFormData, setFormData } = registerFormSlice.actions;
