import { TextInput as Input, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS } from '@src/constants';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TextInput({
  value,
  onChangeText,
  placeholder,
  error,
  label,
  required,
  multiline,
  onFocus = () => {},
  onBlur = () => {},
  onPress,
  leftIcon,
  rightIcon,
  isPassword,
  editable,
  keyboardType,
  style,
  defaultValue,
}) {
  const [focused, setFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  return (
    <View style={[{ width: '100%', position: 'relative' }, style]}>
      {label && (
        <View style={{ marginBottom: 6, flexDirection: 'row' }}>
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: 14,
              marginRight: 4,
              color: COLORS.dark,
            }}
          >
            {label}
          </Text>
          {required && (
            <Text style={{ fontFamily: FONTS.medium, color: COLORS.red }}>
              *
            </Text>
          )}
        </View>
      )}
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: COLORS.lightGrey,
            backgroundColor: '#fafafa',
          },
          focused && {
            borderColor: 'gray',
          },
          error && {
            borderColor: COLORS.red,
          },
        ]}
      >
        <Input
          onFocus={() => {
            setFocused(true);
            onFocus();
          }}
          onBlur={() => {
            setFocused(false);
            onBlur();
          }}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="grey"
          multiline={multiline}
          defaultValue={defaultValue}
          style={[
            {
              width: '100%',
              fontFamily: FONTS.medium,
              fontSize: 14,
              color: COLORS.dark,
            },
            leftIcon && {
              paddingLeft: 30,
            },
            (rightIcon || isPassword) && {
              paddingRight: 30,
            },
            rightIcon &&
              isPassword && {
                paddingRight: 60,
              },
          ]}
          editable={editable}
          keyboardType={keyboardType}
        />
        {isPassword && (
          <Icon
            name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="grey"
            style={{ position: 'absolute', right: 10 }}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          />
        )}
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={24}
            color="grey"
            style={{ position: 'absolute', left: 10 }}
          />
        )}
        {rightIcon && (
          <Icon
            name={rightIcon}
            size={24}
            color="grey"
            style={{ position: 'absolute', right: 10 }}
          />
        )}
      </TouchableOpacity>

      {error && (
        <Text
          style={{
            fontFamily: FONTS.medium,
            color: COLORS.red,
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
