import { Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '@src/constants';

const Row = ({ label, value }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text
        style={{
          fontSize: 14,
          fontFamily: FONTS.bold,
          color: COLORS.dark,
          marginRight: 16,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: FONTS.semiBold,
          color: COLORS.gray,
        }}
      >
        {value}
      </Text>
    </View>
  );
};
export default Row;
