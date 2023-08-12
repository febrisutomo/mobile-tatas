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
import Icon from 'react-native-vector-icons/Ionicons';
import Alert from '@components/Alert';
import { useGetProfile } from '@src/api/authApi';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import Button from '@components/Button';

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

export default function Screening({ navigation }) {
  const { data: result, isLoading, error, isError } = useGetScreeningResult();

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
          <ScrollView style={{ padding: 20 }}>
            <View style={{ gap: 16, marginBottom: 40 }}>
              <Alert>Anda belum melakukan screening thalassemia</Alert>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Form Screening')}
              >
                <View
                  style={{
                    backgroundColor: COLORS.gray,
                    borderRadius: 12,
                    marginBottom: 16,
                    padding: 16,
                    height: 180,
                    position: 'relative',
                  }}
                >
                  <View
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 100,
                      borderColor: 'white',
                      borderWidth: 4,
                      // backgroundColor: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 12,
                      position: 'absolute',
                      bottom: 0,
                      right: 16,
                      opacity: 0.25,
                    }}
                  >
                    <Icon name="flask-outline" size={64} color={'white'} />
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
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: 16,
                      left: 16,
                      fontSize: 14,
                      fontFamily: FONTS.semiBold,
                      color: 'white',
                    }}
                  >
                    Screening Sekarang {'>'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
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
        <View style={{ gap: 16, marginBottom: 40 }}>
          {result.prediction && (
            <Alert type="danger">
              Hasil screening menunjukkan Anda terindikasi mengidap thalassemia.
              Kami sarankan Anda untuk segera mengunjungi rumah sakit terdekat
              untuk pemeriksaan lanjutan.
            </Alert>
          )}

          <TouchableOpacity onPress={handlePresentModal}>
            <View
              style={{
                backgroundColor: result.prediction
                  ? COLORS.red
                  : COLORS.success,
                borderRadius: 12,
                marginBottom: 16,
                padding: 16,
                height: 180,
                position: 'relative',
              }}
            >
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                  borderColor: 'white',
                  borderWidth: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                  position: 'absolute',
                  bottom: 0,
                  right: 16,
                  opacity: 0.25,
                }}
              >
                <Icon name="flask-outline" size={64} color={'white'} />
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
                    : {result.prediction ? 'POSITIF' : 'NEGATIF'} ({' '}
                    {result.probability}%)
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  fontSize: 14,
                  fontFamily: FONTS.semiBold,
                  color: 'white',
                }}
              >
                Klik untuk detail {'>'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
          <View style={{ gap: 8 }}>
            <Row
              label="Tanggal"
              value={
                new Date(result.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }) +
                ' ' +
                new Date(result.date)
                  .toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                  .replace('.', ':')
              }
            />
            <Row label="HB" value={`${result.hb} g/dL`} />
            <Row label="MCH" value={`${result.mch} pg`} />
            <Row label="MCV" value={`${result.mcv} fL`} />
            <Row
              label="Prediksi"
              value={`${result.prediction ? 'POSITIF' : 'NEGATIF'}`}
            />
            <Row label="Probabilitas" value={`${result.probability}%`} />
          </View>
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
