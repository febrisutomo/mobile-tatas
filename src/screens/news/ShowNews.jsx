import { View, Text, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { ScrollView } from 'react-native';
import { FONTS, COLORS } from '@src/constants';

export default function ShowNews({ route }) {
  const thumbnailPlacehloder = require('@assets/images/img-placeholder.png');
  const { width } = useWindowDimensions();
  const { news } = route.params;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ScrollView style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: FONTS.semiBold,
            marginBottom: 12,
            color: COLORS.dark,
          }}
        >
          {news.title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Image
            style={{ height: 24, width: 24, borderRadius: 16, marginRight: 6 }}
            defaultSource={thumbnailPlacehloder}
            source={require('@assets/images/logo-kemenkes.png')}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: FONTS.medium,
            }}
          >
            {news.AUTHOR.NAMA}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: FONTS.medium,
              color: 'gray',
              marginHorizontal: 4,
            }}
          >
            •
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: FONTS.medium,
              color: 'gray',
            }}
          >
            {new Date(news.created_at).toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        <Image
          source={
            news.thumbnail
              ? {
                  uri: news.thumbnail,
                }
              : require('@assets/images/img-placeholder.png')
          }
          defaultSource={require('@assets/images/img-placeholder.png')}
          style={{
            height: 200,
            borderRadius: 12,
            marginBottom: 16,
            width: '100%',
          }}
        />

        <RenderHTML
          contentWidth={width}
          source={{
            html: news.content,
          }}
          tagsStyles={{ p: { fontSize: 16 } }}
        />
        <View style={{ marginBottom: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
