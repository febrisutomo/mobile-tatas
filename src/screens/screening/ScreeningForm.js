import React from 'react';
import { View, SafeAreaView, ScrollView, ToastAndroid } from 'react-native';
import TextInput from '@components/TextInput';
import Button from '@components/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAddScreening } from '@src/api/screeningApi';

export default function ScreeningForm({ navigation }) {
  const { mutateAsync: addScreening, isLoading } = useAddScreening();

  const schema = yup.object().shape({
    hb: yup.string().required('HB tidak boleh kosong'),
    mcv: yup.string().required('MCV tidak boleh kosong'),
    mch: yup.string().required('MCH tidak boleh kosong'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hb: '',
      mcv: '',
      mch: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await addScreening(data);
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
      // console.log(response);
      navigation.goBack();
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
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="HB"
                required
                keyboardType="number-pad"
                placeholder="Masukkan HB"
                value={value}
                onChangeText={onChange}
                error={errors?.hb?.message}
              />
            )}
            name="hb"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="MCV"
                required
                keyboardType="number-pad"
                placeholder="Masukkan MCV"
                value={value}
                onChangeText={onChange}
                error={errors?.mcv?.message}
              />
            )}
            name="mcv"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="MCH"
                required
                keyboardType="number-pad"
                placeholder="Masukkan MCH"
                value={value}
                onChangeText={onChange}
                error={errors?.mch?.message}
              />
            )}
            name="mch"
          />
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          backgroundColor: 'white',
          padding: 20,
          width: '100%',
        }}
      >
        <Button
          title="Submit Data"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}
