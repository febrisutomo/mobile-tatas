import { Text, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '@src/constants';

export default function SplashScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
      }}
    >
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          color: COLORS.primary,
          fontSize: 32,
        }}
      >
        TATAS Mobile
      </Text>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          color: COLORS.gray,
          fontSize: 12,
          position: 'absolute',
          bottom: 32,
        }}
      >
        Thalassemia Tracking Application System
      </Text>
    </SafeAreaView>
  );
}
