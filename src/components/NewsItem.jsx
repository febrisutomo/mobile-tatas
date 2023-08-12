import { View, Text, Image, Pressable } from 'react-native';
import React, { memo } from 'react';
import { FONTS, COLORS } from '@src/constants';

function NewsItem({ navigation, item, style }) {
  const thumbnailPlacehloder = require('@assets/images/img-placeholder.png');
  const getDateDiffString = (date) => {
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} menit yang lalu`;
      } else {
        return `${diffHours} jam yang lalu`;
      }
    } else if (diffDays === 1) {
      return 'Kemarin';
    } else if (diffDays <= 3) {
      return `${diffDays} hari yang lalu`;
    } else {
      return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }); // Tampilkan tanggal lengkap jika lebih dari 3 hari
    }
  };
  return (
    <Pressable
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          padding: 16,
          backgroundColor: pressed ? '#eaeaea' : '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#f1f1f1',
        },
        style,
      ]}
      onPress={() =>
        navigation.navigate('Show News', {
          news: item,
          category: item.category.name,
        })
      }
    >
      <Image
        defaultSource={thumbnailPlacehloder}
        source={
          item.thumbnail
            ? {
                uri: item.thumbnail,
              }
            : thumbnailPlacehloder
        }
        style={{ flex: 1, height: 60, borderRadius: 8, marginRight: 16 }}
      />

      <View style={{ flex: 3 }}>
        <Text
          numberOfLines={2}
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: 14,
            color: COLORS.dark,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: FONTS.medium,
            color: 'gray',
            marginTop: 4,
          }}
        >
          Kemenkes • {getDateDiffString(new Date(item.created_at))}
        </Text>
      </View>
    </Pressable>
  );
}

export default memo(NewsItem);
