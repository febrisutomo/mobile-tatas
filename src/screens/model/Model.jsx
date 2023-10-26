import React from 'react';
import { View, SafeAreaView, Text, ActivityIndicator } from 'react-native';
import { useGetEvaluateModel } from '@src/api/screeningApi';
import { COLORS, FONTS } from '@src/constants';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import Button from '@components/Button';
import ModelList from './ModelList';
import TextInput from '@components/TextInput';
import { useGenerateModel } from '@src/api/modelApi';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastAndroid } from 'react-native';

const Widget = ({ value, label }) => {
  return (
    <View style={{ gap: 6, width: 64 }}>
      <View
        style={{
          borderRadius: 40,
          height: 64,
          width: 64,
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontFamily: FONTS.bold, color: 'white' }}>
          {value.toFixed(2)}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          color: COLORS.dark,
          fontSize: 12,
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default function Model({ navigation }) {
  const { mutateAsync: generateModel, isLoading: generatingModel } =
    useGenerateModel();

  const schema = yup.object().shape({
    name: yup.string().required('Nama tidak boleh kosong'),
  });

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    clearErrors('name');
    try {
      const response = await generateModel(data);
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
      // console.log(response);
      bottomSheetModalRef.current?.dismiss();
      setValue('name', '');
    } catch (error) {
      ToastAndroid.show(
        error?.response?.data?.message || error.message,
        ToastAndroid.SHORT,
      );
      setError('name', {
        type: 'unique',
        message: error?.response?.data?.message || error.message,
      });
    }
  };

  const { data: result, isLoading, isError } = useGetEvaluateModel();

  const bottomSheetModalRef = React.useRef(null);

  const handlePresentModal = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = React.useCallback((index) => {}, []);

  const renderBackdrop = React.useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text>Error</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // justifyContent: 'center',
        // backgroundColor: 'white',
      }}
    >
      <View style={{ padding: 20 }}>
        <View style={{ gap: 16, marginBottom: 40 }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: COLORS.lightGrey,
              position: 'relative',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Widget value={result.accuracy} label={'Acuracy'} />
            <Widget value={result.recall} label={'Recall'} />
            <Widget value={result.precision} label={'Precision'} />
            <Widget value={result.f1} label={'F1'} />
          </View>
          <Button title="Generate Model Baru" onPress={handlePresentModal} />
          <ModelList />
        </View>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['50%']}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        // enableHandlePanningGesture={false}
      >
        <View style={{ padding: 16, paddingTop: 0, marginBottom: 80 }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 18,
              color: COLORS.primary,
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            Generate Model Baru
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Nama Model"
                required
                placeholder="Masukkan Nama Model"
                value={value}
                onChangeText={onChange}
                error={errors?.name?.message}
              />
            )}
            name="name"
          />
        </View>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            padding: 16,
            backgroundColor: 'white',
          }}
        >
          <Button
            title="Simpan"
            onPress={handleSubmit(onSubmit)}
            isLoading={generatingModel}
          />
        </View>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
