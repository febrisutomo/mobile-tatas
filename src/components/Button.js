import { Text, ActivityIndicator, Pressable } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '@src/constants';

export default function Button({
  title,
  onPress,
  style,
  isLoading,
  titleStyle,
  disabled,
  rightIcon,
  type = 'primary',
}) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'white' }}
      style={[
        {
          height: 48,
          paddingHorizontal: 16,
          backgroundColor: COLORS[type],
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: rightIcon ? 'space-between' : 'center',
          alignItems: 'center',
        },
        (isLoading || disabled) && {
          opacity: 0.5,
        },
        style,
      ]}
      disabled={isLoading || disabled}
    >
      {isLoading && (
        <ActivityIndicator
          size="small"
          color="white"
          style={{ marginRight: 4 }}
        />
      )}
      <Text
        style={[
          {
            fontFamily: FONTS.semiBold,
            color: 'white',
            textAlign: 'center',
            fontSize: 16,
          },
          titleStyle,
        ]}
      >
        {isLoading ? 'Loading...' : title}
      </Text>
      {rightIcon && <Icon name={rightIcon} size={24} color="#fff" />}
    </Pressable>
  );
}
