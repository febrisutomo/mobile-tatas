import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  Text,
} from 'react-native';
import TextInput from '@components/TextInput';
import Button from '@components/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUpdateHbElfo } from '@src/api/screeningApi';
import { COLORS, FONTS } from '@src/constants';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HbElfoForm({ route, navigation }) {
  const { screening } = route.params;
  console.log('HbElfoForm ~ screening:', screening);

  const { mutateAsync: updateHbElfo, isLoading } = useUpdateHbElfo(
    screening.id,
  );

  const convertToString = (value) => {
    return value === null || value === undefined ? '' : String(value);
  };

  const schema = yup.object().shape({
    hb_a: yup
      .number()
      .typeError('HB A harus berupa angka')
      .required('HB A tidak boleh kosong'),
    hb_f: yup
      .number()
      .typeError('HB F harus berupa angka')
      .required('HB F tidak boleh kosong'),
    hb_a2: yup
      .number()
      .typeError('HB A2 harus berupa angka')
      .required('HB A2 tidak boleh kosong'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hb_a: convertToString(screening.hb_a),
      hb_f: convertToString(screening.hb_f),
      hb_a2: convertToString(screening.hb_a2),
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await updateHbElfo(data);
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
      // console.log(response);
      navigation.navigate('Screening');
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
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
        <View style={{ gap: 16, marginBottom: 40 }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              padding: 10,
              borderRadius: 8,
              backgroundColor: COLORS.lightBlue,
              gap: 6,
            }}
          >
            <Icon
              name="information-circle-outline"
              size={16}
              color={COLORS.blue}
            />
            <View>
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  fontSize: 14,
                  color: COLORS.dark,
                }}
              >
                Lakukan tes Hemoglobin Elektroforesis di salah satu rumah sakit
                berikut.
              </Text>
              <Pressable onPress={() => navigation.navigate('Faskes')}>
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: 14,
                    color: COLORS.blue,
                  }}
                >
                  RSUD Banyumas
                </Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Faskes')}>
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: 14,
                    color: COLORS.blue,
                  }}
                >
                  RSUP Margono Soekarjo
                </Text>
              </Pressable>
            </View>
          </View>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Hb A"
                required
                keyboardType="number-pad"
                placeholder="Masukkan Hb A"
                value={value}
                onChangeText={onChange}
                error={errors?.hb_a?.message}
              />
            )}
            name="hb_a"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Hb F"
                required
                keyboardType="number-pad"
                placeholder="Masukkan Hb F"
                value={value}
                onChangeText={onChange}
                error={errors?.hb_f?.message}
              />
            )}
            name="hb_f"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Hb A2"
                required
                keyboardType="number-pad"
                placeholder="Masukkan Hb A2"
                value={value}
                onChangeText={onChange}
                error={errors?.hb_a2?.message}
              />
            )}
            name="hb_a2"
          />
        </View>
        <Button
          title="Simpan"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
