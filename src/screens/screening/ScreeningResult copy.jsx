import React, { useCallback, useRef } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useGetScreeningResult } from '@src/api/screeningApi';
import { COLORS, FONTS } from '@src/constants';
import Alert from '@components/Alert';
import { useGetProfile } from '@src/api/authApi';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import Button from '@components/Button';
import Row from '@components/Row';

export default function ScreeeningResult({ navigation }) {
  const { data: result, isLoading, isError } = useGetScreeningResult();

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
    console.log('loading');
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
    // if (error.response.status === 404) {
    return navigation.replace('Form Screening');
    // }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <ScrollView style={{ padding: 20 }}>
        <View style={{ gap: 16 }}>
          {result.prediction && (
            <Alert type="info">
              Hasil screening menunjukkan Anda terindikasi mengidap thalassemia.
              Segera lakukan tes Hemoglobin Elektroforensi untuk pemeriksaan
              lanjutan.
            </Alert>
          )}

          <TouchableOpacity activeOpacity={0.8} onPress={handlePresentModal}>
            <View
              style={{
                backgroundColor: result.prediction
                  ? COLORS.red
                  : COLORS.success,
                borderRadius: 12,
                padding: 16,
                height: 180,
                position: 'relative',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FONTS.bold,
                      color: 'white',
                    }}
                  >
                    Nama
                  </Text>
                </View>

                <View style={{ flex: 3 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FONTS.semiBold,
                      color: 'white',
                    }}
                  >
                    : {user?.name}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FONTS.bold,
                      color: 'white',
                    }}
                  >
                    NIK
                  </Text>
                </View>

                <View style={{ flex: 3 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FONTS.semiBold,
                      color: 'white',
                    }}
                  >
                    : {user?.nik}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FONTS.bold,
                      color: 'white',
                    }}
                  >
                    Alamat
                  </Text>
                </View>

                <View style={{ flex: 3 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FONTS.semiBold,
                      color: 'white',
                    }}
                  >
                    : {user?.district?.name}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FONTS.bold,
                      color: 'white',
                    }}
                  >
                    Hasil
                  </Text>
                </View>

                <View style={{ flex: 3 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FONTS.semiBold,
                      color: 'white',
                    }}
                  >
                    :{' '}
                    {result.dna != null
                      ? `Terkonfirmasi ${result.dna ? 'Positif' : 'Negatif'}`
                      : `Kemungkinan ${
                          result.prediction ? 'Positif' : 'Negatif'
                        } (${result.probability}%) `}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  fontSize: 14,
                  fontFamily: FONTS.semiBold,
                  color: 'white',
                }}
              >
                Klik untuk detail {'>'}
              </Text>
            </View>
          </TouchableOpacity>
          {result.prediction && (
            <Button
              title="Kunjungi Faskes Terdekat"
              onPress={() => {
                navigation.navigate('Faskes');
              }}
              rightIcon="arrow-forward-outline"
            />
          )}
        </View>
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['75%']}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        // enableHandlePanningGesture={false}
      >
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
        <ScrollView style={{ padding: 16, paddingTop: 0, marginBottom: 80 }}>
          <View style={{ gap: 8 }}>
            <Row
              label="Tanggal"
              value={new Date(result.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            />
            <Row label="Hb" value={`${result.hb} g/dL`} />
            <Row label="MCV" value={`${result.mcv} fL`} />
            <Row label="MCH" value={`${result.mch} pg`} />
            <Row
              label="Prediksi"
              value={result.prediction ? 'POSITIF' : 'NEGATIF'}
            />
            <Row label="Probabilitas" value={`${result.probability}%`} />
            <Row label="Hb A" value={`${result.hb_a ?? '-'} %`} />
            <Row label="Hb F" value={`${result.hb_f ?? '-'} %`} />
            <Row label="Hb A2" value={`${result.hb_a2 ?? '-'} %`} />
            <Row
              label="Hasil"
              value={
                result.dna != null ? (result.dna ? 'Positif' : 'Negatif') : '-'
              }
            />
          </View>
        </ScrollView>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            padding: 16,
            gap: 8,
            backgroundColor: 'white',
          }}
        >
          <Button
            title="Masukkan Hb Elfo"
            onPress={() => {
              bottomSheetModalRef.current?.dismiss();
              navigation.navigate('Form Hb Elfo', { screening: result });
            }}
          />
          <Button
            title="Screening Ulang"
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
