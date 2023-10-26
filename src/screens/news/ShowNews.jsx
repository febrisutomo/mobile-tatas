import { View, Text, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { ScrollView } from 'react-native';
import { FONTS, COLORS } from '@src/constants';
import { STORAGE_URL } from '@src/config';

export default function ShowNews({ route }) {
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
            marginBottom: 8,
            color: COLORS.dark,
          }}
        >
          {news.title}
        </Text>

        <Text
          style={{
            fontSize: 14,
            fontFamily: FONTS.medium,
            color: 'gray',
            marginBottom: 20,
          }}
        >
          {new Date(news.created_at).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>

        <View
          style={{
            height: 200,
            marginBottom: 16,
            borderRadius: 12,
            overflow: 'hidden',
            borderColor: COLORS.lightGrey,
            borderWidth: 1,
          }}
        >
          <Image
            source={
              news.image
                ? {
                    uri: STORAGE_URL + news.image,
                  }
                : require('@assets/images/img-placeholder.jpg')
            }
            defaultSource={require('@assets/images/img-placeholder.jpg')}
            style={{
              flex: 1,
              resizeMode: 'contain',
            }}
          />
        </View>

        <RenderHTML
          contentWidth={width}
          source={{
            html: news.body,
          }}
          tagsStyles={{
            body: { fontSize: 16, color: COLORS.dark, textAlign: 'justify' },
          }}
        />
        <View style={{ marginBottom: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
