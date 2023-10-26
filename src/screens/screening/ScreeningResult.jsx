import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useGetScreeningResult } from '@src/api/screeningApi';
import { COLORS, FONTS } from '@src/constants';
import Alert from '@components/Alert';
import Button from '@components/Button';
import Row from '@components/Row';

export default function ScreeeningResult({ navigation }) {
  const { data: result, isLoading, isError } = useGetScreeningResult();

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
          {result.prediction && result.hb_a === null && (
            <Alert type="danger">
              Jangan Panik. Anda kemungkinan Positif Thalassemia. Harap lakukan
              screening lanjutan untuk memastikan diagnosis.
            </Alert>
          )}

          {result.prediction && result.hb_a != null && (
            <Alert type="info">
              Hasil screening anda sedang dievaluasi oleh dokter. Silahkan cek
              kembali dalam 1x24 jam.
            </Alert>
          )}

          <View style={{ gap: 20 }}>
            <View style={{ gap: 6 }}>
              <Row label="Nama" value={result.user.name} />
              <Row label="NIK" value={result.user.nik} />
            </View>

            <View style={{ gap: 6 }}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 14,
                  color: COLORS.primary,
                }}
              >
                Hematologi Rutin
              </Text>
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
            </View>
            <View style={{ gap: 6 }}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 14,
                  color: COLORS.primary,
                }}
              >
                Hemoglobin Elektroforesis
              </Text>
              <Row label="Hb A" value={`${result.hb_a ?? '-'} %`} />
              <Row label="Hb F" value={`${result.hb_f ?? '-'} %`} />
              <Row label="Hb A2" value={`${result.hb_a2 ?? '-'} %`} />
            </View>

            <View>
              <Row
                label="Hasil"
                value={
                  result.dna != null
                    ? result.dna
                      ? 'Positif'
                      : 'Negatif'
                    : '-'
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          padding: 16,
          gap: 16,
          backgroundColor: 'white',
        }}
      >
        {result.dna === null && (
          <Button
            title="Screening Lanjutan"
            onPress={() => {
              navigation.navigate('Form Hb Elfo', { screening: result });
            }}
          />
        )}
        <Button
          title="Screening Ulang"
          style={{
            backgroundColor: '#fff',
            borderColor: COLORS.primary,
            borderWidth: 1,
          }}
          titleStyle={{ color: COLORS.primary }}
          onPress={() => {
            navigation.navigate('Form Screening');
          }}
        />
      </View>
    </SafeAreaView>
  );
}
