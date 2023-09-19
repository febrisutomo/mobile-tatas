import React, { useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ToastAndroid,
  Text,
  TouchableOpacity,
} from 'react-native';
import TextInput from '@components/TextInput';
import Button from '@components/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FONTS, COLORS } from '@src/constants';
import { useLogin } from '@src/api/authApi';
import { API_URL } from '@env';
import { Image } from 'react-native';

export default function Login({ navigation }) {
  const { mutateAsync: login, isLoading } = useLogin();

  const schema = yup.object().shape({
    username: yup.string().required('Username tidak boleh kosong'),
    password: yup.string().required('Password tidak boleh kosong'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await login(data);
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(
        error?.response?.data?.message || error.message,
        ToastAndroid.SHORT,
      );
    }
  };

  useEffect(() => {
    console.log(API_URL);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <View style={{ padding: 20 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            style={{
              width: 250,
              height: 200,
              resizeMode: 'contain',
            }}
            source={require('@assets/images/login.png')}
          />
        </View>
        <Text
          style={{
            fontSize: 32,
            fontFamily: FONTS.bold,
            color: COLORS.dark,
            marginBottom: 20,
          }}
        >
          Login
        </Text>

        <View style={{ gap: 16, alignItems: 'center' }}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Username"
                required
                placeholder="Masukkan Username"
                value={value}
                onChangeText={onChange}
                error={errors?.username?.message}
              />
            )}
            name="username"
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

          <Button
            style={{ width: '100%', marginTop: 16 }}
            title={'Login'}
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 16,
            gap: 8,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: FONTS.semiBold,
              color: COLORS.dark,
            }}
          >
            Belum punya akun?
          </Text>
          <TouchableOpacity onPress={() => navigation.push('Pendaftaran')}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: FONTS.semiBold,
                color: COLORS.primary,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
