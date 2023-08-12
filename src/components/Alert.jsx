import { View, Text } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '@src/constants';
import Icon from 'react-native-vector-icons/Ionicons';

const Alert = ({ type = 'info', children }) => {
  const bgColor = {
    info: COLORS.lightBlue,
    danger: COLORS.lightRed,
    success: COLORS.lightGreen,
  };
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 8,
        backgroundColor: bgColor[type],
        gap: 6,
      }}
    >
      <Icon name="information-circle-outline" size={16} color={COLORS[type]} />
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: 14,
          color: COLORS.dark,
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default Alert;
