import { View, Text, Image, Pressable } from 'react-native';
import React, { memo } from 'react';
import { FONTS, COLORS } from '@src/constants';
import { STORAGE_URL } from '@src/config';

function PostItem({ navigation, item, style }) {
  const thumbnailPlacehloder = require('@assets/images/img-placeholder.jpg');

  // const getDateDiffString = (date) => {
  //   const today = new Date();
  //   const diffTime = today.getTime() - date.getTime();
  //   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  //   if (diffDays === 0) {
  //     const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  //     if (diffHours === 0) {
  //       const diffMinutes = Math.floor(diffTime / (1000 * 60));
  //       return `${diffMinutes} menit yang lalu`;
  //     } else {
  //       return `${diffHours} jam yang lalu`;
  //     }
  //   } else if (diffDays === 1) {
  //     return 'Kemarin';
  //   } else if (diffDays <= 3) {
  //     return `${diffDays} hari yang lalu`;
  //   } else {
  //     return date.toLocaleDateString('id-ID', {
  //       weekday: 'long',
  //       year: 'numeric',
  //       month: 'long',
  //       day: 'numeric',
  //     }); // Tampilkan tanggal lengkap jika lebih dari 3 hari
  //   }
  // };

  //format date to locale string
  const formatDate = (date) => {
    date = new Date(date);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
          gap: 8,
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
      <View
        style={{
          flex: 1,
          height: 60,
          borderRadius: 8,
          borderColor: COLORS.lightGrey,
          borderWidth: 1,
          overflow: 'hidden',
        }}
      >
        <Image
          defaultSource={thumbnailPlacehloder}
          source={
            item.image
              ? {
                  uri: STORAGE_URL + item.image,
                }
              : thumbnailPlacehloder
          }
          style={{ flex: 1, resizeMode: 'cover' }}
        />
      </View>

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
          {item.category.name} • {formatDate(item.created_at)}
        </Text>
      </View>
    </Pressable>
  );
}

export default memo(PostItem);
