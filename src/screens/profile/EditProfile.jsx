import * as React from 'react';
import { View, ToastAndroid } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS } from '@src/constants';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@components/TextInput';
import ModalSelect from '@components/ModalSelect';
import Button from '@components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import {
  useGetDistrictsByRegencyId,
  useGetProvinces,
  useGetRegenciesByProvinceId,
} from '@src/api/provinceApi';
import { useGetProfile, useUpdateProfile } from '@src/api/authApi';
import Alert from '@components/Alert';

const DataDiri = () => {
  const { data: user } = useGetProfile();
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfile();

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
    formState: { errors },
  } = useForm({
    defaultValues: {
      nik: user?.nik,
      name: user?.name,
      blood_type_id: user?.blood_type.id,
      gender_id: user?.gender.id,
      phone_number: user?.phone_number,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const payload = await updateProfile(data);
      ToastAndroid.show(payload.message, ToastAndroid.SHORT);
      console.log(payload);
    } catch (error) {
      ToastAndroid.show(
        error?.response?.data?.message || error.message,
        ToastAndroid.SHORT,
      );
      console.log('error', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ padding: 20, backgroundColor: 'white' }}>
        <View style={{ gap: 16, marginBottom: 120 }}>
          <Alert>Pastikan data yang Anda Masukkan sesuai dengan KTP</Alert>

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
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          padding: 20,
        }}
      >
        <Button
          title="Simpan Perubahan"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
        />
      </View>
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

const DataAlamat = () => {
  const { data: user } = useGetProfile();
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfile();

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
  } = useForm({
    defaultValues: {
      province_id: user?.district?.regency?.province?.id,
      regency_id: user?.district?.regency?.id,
      district_id: user?.district?.id,
      address: user?.address,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let profil = { ...data };
    delete profil.province_id;
    delete profil.regency_id;
    console.log(data);
    try {
      const payload = await updateProfile(profil);
      ToastAndroid.show(payload.message, ToastAndroid.SHORT);
      console.log(payload);
    } catch (error) {
      ToastAndroid.show(
        error?.response?.data?.message || error.message,
        ToastAndroid.SHORT,
      );
      console.log('error', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ padding: 20, backgroundColor: 'white' }}>
        <View style={{ gap: 16, marginBottom: 120 }}>
          <Alert>Pastikan data yang Anda Masukkan sesuai dengan KTP</Alert>

          <SelectProvince
            control={control}
            setValue={setValue}
            errors={errors}
          />

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
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          padding: 20,
        }}
      >
        <Button
          title="Simpan Perubahan"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

const App = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 14, textTransform: 'none' },
        tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
      }}
    >
      <Tab.Screen name="Identitas Diri" component={DataDiri} />
      <Tab.Screen name="Alamat" component={DataAlamat} />
    </Tab.Navigator>
  );
};

export default App;
