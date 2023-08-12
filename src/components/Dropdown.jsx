import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Dropdown as RNDropdown } from 'react-native-element-dropdown';
import { COLORS, FONTS } from '@src/constants';

export default function Dropdown({
  data,
  value,
  onChange,
  placeholder,
  search = false,
  label,
  required,
  error,
}) {
  // const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <View style={{ marginBottom: 8, flexDirection: 'row' }}>
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
      <RNDropdown
        style={[
          {
            height: 48,
            borderColor: COLORS.lightGrey,
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            backgroundColor: '#fafafa',
          },
          isFocus && { borderColor: 'grey' },
          error && { borderColor: COLORS.red },
        ]}
        placeholderStyle={{
          color: 'grey',
          fontSize: 14,
        }}
        selectedTextStyle={{
          fontSize: 14,
          color: COLORS.dark,
        }}
        inputSearchStyle={{
          height: 40,
          fontSize: 14,
        }}
        iconStyle={{
          width: 20,
          height: 20,
        }}
        data={data}
        search={search}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Cari..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        // eslint-disable-next-line no-shadow
        onChange={({ value }) => onChange(value)}
        fontFamily={FONTS.medium}
      />
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
