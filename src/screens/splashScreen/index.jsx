import { Text, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native';
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
        Mobile Tatas
      </Text>
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
        style={{ position: 'absolute', bottom: 32 }}
      />
    </SafeAreaView>
  );
}
