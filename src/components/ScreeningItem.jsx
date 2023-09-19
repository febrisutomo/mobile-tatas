import { View, Text, Pressable } from 'react-native';
import React, { memo } from 'react';
import { FONTS, COLORS } from '@src/constants';
import Icon from 'react-native-vector-icons/Ionicons';

const ScreeningItem = ({ item, onPress, hideName = false }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          backgroundColor: pressed ? '#f1f1f1' : 'white',
          elevation: 4,
          padding: 8,
          // borderColor: COLORS.lightGrey,
          borderRadius: 12,
        },
      ]}
      onPress={() => onPress(item)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor:
            item.dna != null
              ? item.dna
                ? COLORS.danger
                : COLORS.success
              : item.prediction
              ? COLORS.danger
              : COLORS.success,
          borderRadius: 12,
          marginRight: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon name="flask-outline" size={32} color="white" />
      </View>
      <View style={{ flex: 4 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 10,
                fontFamily: FONTS.semiBold,
                color: COLORS.gray,
                marginBottom: 4,
              }}
            >
              {new Date(item.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {' •  Pukul '}
              {new Date(item.date).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            {hideName === false && (
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: FONTS.semiBold,
                  marginBottom: 4,
                  color: COLORS.dark,
                }}
              >
                {item?.user?.name}
              </Text>
            )}

            <Text
              style={{
                fontSize: 14,
                fontFamily: FONTS.semiBold,
                marginBottom: 4,
                color: COLORS.dark,
              }}
            >
              {item.dna != null
                ? `Terkonfirmasi ${item.dna ? 'Positif' : 'Negatif'}`
                : `Kemungkinan ${item.prediction ? 'Positif' : 'Negatif'} (${
                    item.probability
                  }%) `}
            </Text>
          </View>
          <Icon name="chevron-forward" size={16} color={COLORS.primary} />
        </View>
      </View>
    </Pressable>
  );
};

export default memo(ScreeningItem);
