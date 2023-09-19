import { View, Text, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { ScrollView } from 'react-native';
import { FONTS, COLORS } from '@src/constants';

export default function ShowAgenda({ route }) {
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

        <Text
          style={{
            fontSize: 14,
            fontFamily: FONTS.medium,
            color: 'gray',
            marginBottom: 16,
          }}
        >
          {new Date(news.created_at).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>

        <View style={{ height: 200, marginBottom: 16 }}>
          <Image
            source={
              news.image
                ? {
                    uri: 'http://192.168.1.234:8000/storage/' + news.image,
                  }
                : require('@assets/images/img-placeholder.jpg')
            }
            defaultSource={require('@assets/images/img-placeholder.jpg')}
            style={{
              flex: 1, // This makes the image expand to fill the parent View's height
              borderRadius: 12,
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
