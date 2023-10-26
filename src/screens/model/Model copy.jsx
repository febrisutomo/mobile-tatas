import React, { useCallback, useRef } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import { downloadDataset, useGetEvaluateModel } from '@src/api/screeningApi';
import { COLORS, FONTS } from '@src/constants';
import { useGetProfile } from '@src/api/authApi';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import Button from '@components/Button';
import UploadFileScreen from './UploadFile';
import ModelList from './ModelList';

const Row = ({ label, value }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text
        style={{
          flex: 1,
          fontSize: 14,
          fontFamily: FONTS.bold,
          color: COLORS.dark,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          flex: 3,
          fontSize: 14,
          fontFamily: FONTS.semiBold,
          color: COLORS.gray,
        }}
      >
        : {value}
      </Text>
    </View>
  );
};

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
  const { data: result, isLoading, error, isError } = useGetEvaluateModel();

  const { data: user } = useGetProfile();

  const bottomSheetModalRef = useRef(null);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {}, []);

  const renderBackdrop = useCallback(
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
    if (error.response.status === 404) {
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
              marginBottom: 16,
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
          <Button title="Download Dataset" onPress={downloadDataset} />
          <UploadFileScreen />
          {/* <ListFile /> */}
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
            Detail Screeening
          </Text>
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
            title="Screeening Ulang"
            onPress={() => {
              bottomSheetModalRef.current?.dismiss();
              navigation.navigate('Form Screening');
            }}
          />
        </View>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
