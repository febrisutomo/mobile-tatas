import { Text, View, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS, FONTS } from '@src/constants';

const About = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: FONTS.medium,
            marginBottom: 14,
            color: COLORS.dark,
          }}
        >
          TATAS (Thalassemia Tracking Application System) adalah aplikasi yang
          dikembangkan Tim Peneliti Thalassemia Fakultas Kedokteran Unsoed dan
          Jurusan Informatika Unsoed. TATAS diharapkan dapat menjadi alat bantu
          dalam kegiatan screening thalassemia minor di Kabupaten Banyumas.
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: FONTS.medium,
            marginBottom: 14,
            color: COLORS.dark,
          }}
        >
          Aplikasi tersedia dalam bentuk Website dan aplikasi Mobile. Aplikasi
          Web dan Aplikasi Mobile memiliki perbedaan dalam proses diagnosis
          thalassemia minor. Aplikasi Website menggunakan metode Algoritma C4.5
          dalam melakukan prediksi, sedangkan Aplikasi Mobile menggunakan metode
          Naive Bayes untuk memprediksi keberadaan thalassemia minor pada
          individu.
        </Text>
        <Text
          style={{ fontSize: 14, fontFamily: FONTS.bold, color: COLORS.dark }}
        >
          Thalassemia Expert:
        </Text>
        <Text
          style={{ fontSize: 14, fontFamily: FONTS.medium, color: COLORS.dark }}
        >
          DR. Lantip Rujito, MD,MSC,PhD
        </Text>
        <Text
          style={{ fontSize: 14, fontFamily: FONTS.medium, color: COLORS.dark }}
        >
          DR. Wahyu Siswandari, MD,MSc,PhD, Clinical Pathologist
        </Text>
        <Text
          style={{
            marginTop: 14,
            fontSize: 14,
            fontFamily: FONTS.bold,
            color: COLORS.dark,
          }}
        >
          Web Based Application Developer:
        </Text>
        <Text
          style={{ fontSize: 14, fontFamily: FONTS.medium, color: COLORS.dark }}
        >
          Nicolas Sohputro, S.Kom
        </Text>
        <Text
          style={{
            marginTop: 14,
            fontSize: 14,
            fontFamily: FONTS.bold,
            color: COLORS.dark,
          }}
        >
          Mobile Based Application Developer:
        </Text>
        <Text
          style={{ fontSize: 14, fontFamily: FONTS.medium, color: COLORS.dark }}
        >
          Febri Sutomo, S.Kom
        </Text>
        <Text
          style={{
            marginTop: 14,
            fontSize: 14,
            fontFamily: FONTS.bold,
            color: COLORS.dark,
          }}
        >
          Backend Application Consultant:
        </Text>
        <Text
          style={{ fontSize: 14, fontFamily: FONTS.medium, color: COLORS.dark }}
        >
          Ir. Bangun Wijayanto, S.T.,M.Cs.,IPM
        </Text>
        <Text
          style={{ fontSize: 14, fontFamily: FONTS.medium, color: COLORS.dark }}
        >
          Ir. Yogiek Indra Kurniawan, S.T., M.T.
        </Text>
        <Text
          style={{
            marginTop: 14,
            marginBottom: 14,
            fontSize: 14,
            fontFamily: FONTS.bold,
            color: COLORS.dark,
          }}
        >
          Supported by:
        </Text>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 12,
          }}
        >
          <Image
            style={{
              width: 64,
              height: 64,
              resizeMode: 'contain',
            }}
            source={require('@assets/images/logo-unsoed.png')}
          />
          <Image
            style={{
              width: 64,
              height: 64,
              resizeMode: 'contain',
            }}
            source={require('@assets/images/logo-kab-bms.png')}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 32,
            fontSize: 14,
            textAlign: 'center',
            fontFamily: FONTS.bold,
            color: COLORS.dark,
          }}
        >
          Copyright © 2023
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
