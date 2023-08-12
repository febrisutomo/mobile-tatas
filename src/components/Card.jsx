import { View, Text } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '@src/constants';

export default function Card({ icon, title, children }) {
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
      }}
    >
      {title && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          {icon && (
            <Icon
              name={icon}
              size={18}
              color={COLORS.dark}
              style={{ marginRight: 8 }}
            />
          )}

          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: 18,
              color: COLORS.dark,
            }}
          >
            {title}
          </Text>
        </View>
      )}

      {children}
    </View>
  );
}
