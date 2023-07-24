import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, ToastAndroid } from 'react-native';
import TextInput from '@components/TextInput';
import Button from '@components/Button';
import ModalSelect from '@components/ModalSelect';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCheckEmail, useRegister } from '@src/api/authApi';
import {
  useGetProvinces,
  useGetRegenciesByProvinceId,
  useGetDistrictsByRegencyId,
} from '@src/api/provinceApi';
import { COLORS, FONTS } from '@src/constants';
import { Text } from 'react-native';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { resetFormData, setFormData } from '@src/redux/slice/registerFormSlice';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

const BuatAkun = ({ setStep }) => {
  const { mutateAsync: checkEmail, isLoading } = useCheckEmail();

  const { formData } = useSelector((state) => state.registerForm);

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Email tidak valid')
      .required('Email tidak boleh kosong'),
    password: yup
      .string()
      .required('Password tidak boleh kosong')
      .min(6, 'Password minimal 6 karakter'),
    confirm_password: yup
      .string()
      .required('Konfirmasi password tidak boleh kosong')
      .oneOf([yup.ref('password'), null], 'Konfirmasi password tidak sesuai'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      email: formData.email,
      password: formData.password,
      confirm_password: formData.password,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    clearErrors();
    try {
      const response = await checkEmail(data);
      console.log(response);
      dispatch(setFormData(data));
      setStep(2);
    } catch (error) {
      ToastAndroid.show(
        error?.response?.data?.message || error.message,
        ToastAndroid.SHORT,
      );
      setError('email', {
        type: 'unique',
        message: error?.response?.data?.message || error.message,
      });
      console.log('error', error);
    }
  };

  return (
    <View style={{ gap: 16, marginBottom: 40 }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          style={{
            width: 250,
            height: 180,
            resizeMode: 'contain',
          }}
          source={require('@assets/images/register-red.png')}
        />
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            required
            // keyboardType="email-address"
            placeholder="Masukkan Email"
            value={value}
            onChangeText={onChange}
            error={errors?.email?.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            required
            isPassword
            placeholder="Masukkan Password"
            value={value}
            onChangeText={onChange}
            error={errors?.password?.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Konfirmasi Password"
            required
            isPassword
            placeholder="Masukkan Konfirmasi Password"
            value={value}
            onChangeText={onChange}
            error={errors?.confirm_password?.message}
          />
        )}
        name="confirm_password"
      />

      <Button
        title="Lanjutkan"
        style={{ marginTop: 16 }}
        onPress={handleSubmit(onSubmit)}
        buttonStyle={{ marginTop: 16 }}
        disabled={isLoading}
      />
    </View>
  );
};

const DataDiri = ({ setStep }) => {
  const { formData } = useSelector((state) => state.registerForm);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    nik: yup
      .string()
      .required('NIK tidak boleh kosong')
      .length(16, 'NIK harus terdiri dari 16 karakter'),
    name: yup.string().required('Nama tidak boleh kosong'),
    blood_type_id: yup.number().required('Golongan darah tidak boleh kosong'),
    gender_id: yup.number().required('Jenis kelamin tidak boleh kosong'),
    phone_number: yup.string().required('No. handphone tidak boleh kosong'),
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nik: formData.nik,
      name: formData.name,
      blood_type_id: formData.blood_type_id,
      gender_id: formData.gender_id,
      phone_number: formData.phone_number,
    },
    resolver: yupResolver(schema),
  });

  const handleNextStep = async (data) => {
    dispatch(setFormData(data));
    setStep(3);
  };

  const handlePreviousStep = () => {
    let data = getValues();
    console.log(data);
    dispatch(setFormData(data));
    setStep(1);
  };

  return (
    <View style={{ gap: 16, marginBottom: 40 }}>
      <Text
        style={{ color: COLORS.dark, fontFamily: FONTS.semiBold, fontSize: 16 }}
      >
        Informasi Data Diri
      </Text>

      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          paddingHorizontal: 8,
          borderRadius: 8,
          // borderWidth: 1,
          borderColor: COLORS.lightGrey,
          backgroundColor: '#e0f2fe',
          gap: 6,
        }}
      >
        <Icon name="information-circle-outline" size={16} color={COLORS.info} />
        <Text
          style={{
            fontFamily: FONTS.medium,
            fontSize: 12,
            color: COLORS.dark,
          }}
        >
          Pastikan data yang dimasukkan sesuai dengan KTP
        </Text>
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="NIK"
            required
            keyboardType="number-pad"
            placeholder="Masukkan NIK"
            value={value}
            onChangeText={onChange}
            error={errors?.nik?.message}
          />
        )}
        name="nik"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Nama Lengkap"
            required
            placeholder="Masukkan Nama Lengkap"
            value={value}
            onChangeText={onChange}
            error={errors?.name?.message}
          />
        )}
        name="name"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <ModalSelect
            label="Jenis Kelamin"
            required
            placeholder="Pilih Jenis Kelamin"
            height={30}
            value={value}
            onChange={onChange}
            options={[
              { label: 'Laki-laki', value: 1 },
              { label: 'Perempuan', value: 2 },
            ]}
            error={errors?.gender_id?.message}
          />
        )}
        name="gender_id"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <ModalSelect
            label="Golongan Darah"
            placeholder="Pilih Golongan Darah"
            height={40}
            value={value}
            onChange={onChange}
            options={[
              { label: 'Gol Darah A', value: 1 },
              { label: 'Gol Darah B', value: 2 },
              { label: 'Gol Darah AB', value: 3 },
              { label: 'Gol Darah O', value: 4 },
            ]}
            error={errors?.blood_type_id?.message}
          />
        )}
        name="blood_type_id"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="No. Handphone"
            required
            keyboardType="phone-pad"
            placeholder="Masukkan No. Handphone"
            value={value}
            onChangeText={onChange}
            error={errors?.phone_number?.message}
          />
        )}
        name="phone_number"
      />

      <Button
        title="Lanjutkan"
        style={{ marginTop: 16 }}
        onPress={handleSubmit(handleNextStep)}
        buttonStyle={{ marginTop: 16 }}
      />

      <Button
        title="Kembali"
        onPress={handlePreviousStep}
        style={{ backgroundColor: '#fff' }}
        titleStyle={{ color: COLORS.primary }}
      />
    </View>
  );
};

const SelectProvince = ({ control, errors, setValue }) => {
  const { data: provinces = [] } = useGetProvinces();
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <ModalSelect
          options={provinces}
          label="Provinsi"
          required
          placeholder="Pilih Provinsi"
          isSearchable
          value={value}
          onChange={(val) => {
            onChange(val);
            setValue('regency_id', null);
            setValue('district_id', null);
          }}
          error={errors?.province_id?.message}
        />
      )}
      name="province_id"
    />
  );
};

const SelectRegency = ({ control, provinceId, errors }) => {
  console.log(provinceId);
  const { data: regencies = [] } = useGetRegenciesByProvinceId(provinceId);
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <ModalSelect
          options={regencies}
          label="Kabupaten/Kota"
          required
          placeholder={'Pilih Kabupaten'}
          isSearchable
          value={value}
          onChange={onChange}
          error={errors?.regency_id?.message}
        />
      )}
      name="regency_id"
    />
  );
};

const SelectDistrict = ({ control, regencyId, errors }) => {
  console.log(regencyId);
  const { data: regencies = [] } = useGetDistrictsByRegencyId(regencyId);
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <ModalSelect
          options={regencies}
          label="Kecamatan"
          required
          placeholder={'Pilih Kecamatan'}
          isSearchable
          value={value}
          onChange={onChange}
          error={errors?.district_id?.message}
        />
      )}
      name="district_id"
    />
  );
};

const DataAlamat = ({ setStep }) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  const { formData } = useSelector((state) => state.registerForm);
  const dispatch = useDispatch();
  const { mutateAsync: register, isLoading } = useRegister();

  const navigation = useNavigation();

  const schema = yup.object().shape({
    province_id: yup.number().required('Provinsi tidak boleh kosong'),
    regency_id: yup.number().required('Kabupaten tidak boleh kosong'),
    district_id: yup.number().required('Kecamatan tidak boleh kosong'),
    address: yup.string().required('Alamat tidak boleh kosong'),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      province_id: formData.province_id,
      regency_id: formData.regency_id,
      district_id: formData.district_id,
      address: formData.address,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let registerData = { ...formData, ...data, longitude, latitude };
    delete registerData.confirm_password;
    delete registerData.province_id;
    delete registerData.regency_id;

    console.log(registerData);
    try {
      const payload = await register(registerData);
      ToastAndroid.show(payload.message, ToastAndroid.SHORT);
      console.log(payload);
      navigation.pop();
      dispatch(resetFormData());
    } catch (error) {
      ToastAndroid.show(
        error?.response?.data?.message || error.message,
        ToastAndroid.SHORT,
      );
      console.log('error', error);
    }
  };

  const handlePreviousStep = () => {
    let data = getValues();
    console.log(data);
    dispatch(setFormData(data));
    setStep(2);
  };

  return (
    <View style={{ gap: 16, marginBottom: 40 }}>
      <Text
        style={{ color: COLORS.dark, fontFamily: FONTS.semiBold, fontSize: 16 }}
      >
        Alamat Sesuai KTP
      </Text>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          paddingHorizontal: 8,
          borderRadius: 8,
          // borderWidth: 1,
          borderColor: COLORS.lightGrey,
          backgroundColor: '#e0f2fe',
          gap: 6,
        }}
      >
        <Icon name="information-circle-outline" size={16} color={COLORS.info} />
        <Text
          style={{
            fontFamily: FONTS.medium,
            fontSize: 12,
            color: COLORS.dark,
          }}
        >
          Pastikan data yang dimasukkan sesuai dengan KTP
        </Text>
      </View>

      <SelectProvince control={control} setValue={setValue} errors={errors} />

      {watch('province_id') && (
        <SelectRegency
          control={control}
          provinceId={watch('province_id')}
          errors={errors}
        />
      )}

      {watch('regency_id') && (
        <SelectDistrict
          control={control}
          regencyId={watch('regency_id')}
          errors={errors}
        />
      )}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Alamat Lengkap"
            required
            multiline
            placeholder="Masukkan Alamat Lengkap"
            value={value}
            onChangeText={onChange}
            error={errors?.address?.message}
          />
        )}
        name="address"
      />

      <Button
        title="Daftar Akun"
        style={{ marginTop: 16 }}
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />

      <Button
        title="Kembali"
        style={{ backgroundColor: '#fff' }}
        titleStyle={{ color: COLORS.primary }}
        onPress={handlePreviousStep}
      />
    </View>
  );
};

const StepBar = ({ progress = 0 }) => {
  return (
    <View
      style={{
        flex: 1,
        height: 6,
        backgroundColor: COLORS.lightGrey,
        borderRadius: 6,
        marginBottom: 20,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          height: '100%',
          backgroundColor: COLORS.primary,
          width: progress + '%',
        }}
      />
    </View>
  );
};

export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    dispatch(resetFormData());
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <ScrollView style={{ padding: 20 }}>
        <Text
          style={{
            color: COLORS.dark,
            fontFamily: FONTS.bold,
            fontSize: 18,
            marginBottom: 16,
          }}
        >
          {step === 1 ? 'Buat Akun' : 'Lengkapi Data Diri'}
        </Text>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <StepBar progress={100} />
          <StepBar progress={step === 2 ? 50 : step === 3 ? 100 : 0} />
        </View>

        {step === 1 && <BuatAkun setStep={setStep} />}
        {step === 2 && <DataDiri setStep={setStep} />}
        {step === 3 && <DataAlamat setStep={setStep} />}
      </ScrollView>
    </SafeAreaView>
  );
}
