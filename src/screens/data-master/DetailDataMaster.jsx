import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  Text,
} from 'react-native';
import Button from '@components/Button';
import { COLORS, FONTS } from '@src/constants';
import Row from '@components/Row';
import { useApproveData } from '@src/api/screeningApi';

export default function DetailDataMaster({ route, navigation }) {
  const { screening } = route.params;

  const { mutateAsync: approve, isLoading: isUpdatingDNA } = useApproveData(
    screening.id,
  );

  const handleSave = async () => {
    try {
      const response = await approve();
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
      navigation.pop();
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
          <View style={{ gap: 10 }}>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 14,
                color: COLORS.primary,
              }}
            >
              Data Pasien
            </Text>
            <Row label="Nama" value={`${screening.user.name}`} />
            <Row label="NIK" value={`${screening.user.nik}`} />
            {/* <Row label="Kelamin" value={`${screening.user.gender.name}`} /> */}
            <Row label="Alamat" value={`${screening.user?.district?.name}`} />
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 14,
                marginTop: 14,
                color: COLORS.primary,
              }}
            >
              Hematologi Rutin
            </Text>
            <Row
              label="Tanggal"
              value={new Date(screening.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            />
            {/* <Row
                label="Jam"
                value={new Date(screening.date).toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              /> */}
            <Row label="Hb" value={`${screening.hb} g/dL`} />
            <Row label="MCV" value={`${screening.mcv} fL`} />
            <Row label="MCH" value={`${screening.mch} pg`} />
            <Row
              label="Prediksi"
              value={`${screening.prediction ? 'POSITIF' : 'NEGATIF'}`}
            />
            <Row label="Probabilitas" value={`${screening.probability}%`} />
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 14,
                marginTop: 14,
                color: COLORS.primary,
              }}
            >
              Hb Elektroforesis
            </Text>
            <Row label="Hb A" value={`${screening.hb_a ?? '-'} %`} />
            <Row label="Hb F" value={`${screening.hb_f ?? '-'} %`} />
            <Row label="Hb A2" value={`${screening.hb_a2 ?? '-'} %`} />
            <View style={{ marginTop: 14 }}>
              <Row
                label="Hasil"
                value={`${screening.dna ? 'POSITIF' : 'NEGATIF'}`}
              />
            </View>
            <View style={{ marginTop: 14 }}>
              <Row
                label="Status"
                value={`${
                  screening.verified ? 'Disetujui' : 'Belum Disetujui'
                }`}
              />
            </View>
          </View>
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
          onPress={handleSave}
          disabled={screening.verified}
          title="Setujui"
          isLoading={isUpdatingDNA}
        />
      </View>
    </SafeAreaView>
  );
}
