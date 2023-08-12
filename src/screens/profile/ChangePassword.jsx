import React from 'react';
import { View, SafeAreaView, ScrollView, ToastAndroid } from 'react-native';
import TextInput from '@components/TextInput';
import Button from '@components/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useChangePassword } from '@src/api/authApi';

export default function ChangePassword({ navigation }) {
  const { mutateAsync: changePassword, isLoading } = useChangePassword();

  const schema = yup.object().shape({
    current_password: yup
      .string()
      .required('Password saat ini tidak boleh kosong'),
    new_password: yup
      .string()
      .required('Password baru tidak boleh kosong')
      .min(6, 'Password baru minimal 6 karakter'),
    confirm_password: yup
      .string()
      .required('Konfirmasi password baru tidak boleh kosong')
      .oneOf(
        [yup.ref('new_password'), null],
        'Konfirmasi password baru tidak sesuai',
      ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await changePassword(data);
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
      console.log(response);
      navigation.navigate('Profile');
    } catch (error) {
      ToastAndroid.show(
        error?.response?.data?.message || error.message,
        ToastAndroid.SHORT,
      );
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <ScrollView style={{ padding: 20 }}>
        <View style={{ gap: 16, marginBottom: 80 }}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Password Saat Ini"
                required
                isPassword
                placeholder="Masukkan Password Saat Ini"
                value={value}
                onChangeText={onChange}
                error={errors?.current_password?.message}
              />
            )}
            name="current_password"
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Password Baru"
                required
                isPassword
                placeholder="Masukkan Password Baru"
                value={value}
                onChangeText={onChange}
                error={errors?.new_password?.message}
              />
            )}
            name="new_password"
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Konfirmasi Password Baru"
                required
                isPassword
                placeholder="Masukkan Konfirmasi Password Baru"
                value={value}
                onChangeText={onChange}
                error={errors?.confirm_password?.message}
              />
            )}
            name="confirm_password"
          />
        </View>
      </ScrollView>
      <View style={{ padding: 20, backgroundColor: 'white' }}>
        <Button
          title={'Ubah Password'}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}
