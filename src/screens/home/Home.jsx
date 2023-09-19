import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '@src/constants';

import { useSelector } from 'react-redux';
import { useGetStaticPosts } from '@src/api/postApi';
import Button from '@components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import ImageSlider from '@components/ImageSlider';

export default function Home({ navigation }) {
  const { user } = useSelector((state) => state.authSlice);

  // Gap stuff
  const { width } = Dimensions.get('window');
  const gap = 8;
  const itemPerRow = 4;
  const totalGapSize = (itemPerRow - 1) * gap;
  const windowWidth = width - 16;
  const childWidth = (windowWidth - totalGapSize) / itemPerRow;
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    let mn = [
      {
        title: 'Hasil Screening',
        icon: 'flask-outline',
        route: 'Screening',
      },

      {
        title: 'Berita dan Artikel',
        icon: 'newspaper-outline',
        route: 'Berita dan Artikel',
      },
      {
        title: 'Agenda',
        icon: 'calendar-outline',
        route: 'Agenda',
      },
      {
        title: 'Lokasi Faskes',
        icon: 'map-outline',
        route: 'Faskes',
      },
      {
        title: 'Konfirmasi DNA',
        icon: 'shield-checkmark-outline',
        route: 'Konfirmasi DNA',
      },
      {
        title: 'Model Prediksi',
        icon: 'server-outline',
        route: 'Model',
      },
    ];
    if (user?.role?.name === 'Admin') {
      setMenu(mn);
    } else {
      setMenu(mn.slice(0, 4));
    }
  }, [user]);

  const { data: news = [] } = useGetStaticPosts();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle={'dark-content'}
      />
      <ScrollView>
        <View
          style={{
            margin: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: 18,
              color: COLORS.dark,
            }}
          >
            Hi, {user ? user?.name : 'Guest'}
          </Text>
          <Pressable
            onPress={() => navigation.navigate('Profil')}
            style={({ pressed }) => [
              {
                height: 36,
                width: 36,
                borderRadius: 36,
                justifyContent: 'center',
                alignItems: 'center',
              },
              pressed && {
                backgroundColor: '#eaeaea',
              },
            ]}
          >
            <Icon
              name={'person-circle-outline'}
              size={32}
              color={COLORS.dark}
            />
          </Pressable>
        </View>
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 16,
            padding: 16,
            backgroundColor: '#fff',
            borderRadius: 12,
            overflow: 'hidden',
            elevation: 4,
          }}
        >
          <View style={{ marginRight: 80 }}>
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 18,
                color: COLORS.dark,
                marginBottom: 6,
              }}
            >
              Screening Thalassemia
            </Text>
            <Text
              style={{
                fontFamily: FONTS.medium,
                fontSize: 14,
                color: COLORS.dark,
                marginBottom: 10,
              }}
            >
              Mulai screening sekarang juga dengan mudah dan cepat.
            </Text>
            <Button
              onPress={() => navigation.navigate('Screening')}
              title="Screening"
              style={{ height: 40, width: 150 }}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              right: -80,
              bottom: -50,
              zIndex: -99,
            }}
          >
            <Image
              style={{
                width: 250,
                height: 200,
                resizeMode: 'contain',
              }}
              source={require('@assets/images/phone.png')}
            />
          </View>
        </View>
        <View
          style={{
            padding: 8,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginVertical: -(gap / 2) + 8,
            marginHorizontal: -(gap / 2),
          }}
        >
          {menu.map((item, index) => (
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: gap / 2,
                minWidth: childWidth,
                maxWidth: childWidth,
              }}
              key={index}
            >
              <Pressable
                onPress={() => navigation.navigate(item.route)}
                style={({ pressed }) => [
                  {
                    height: 64,
                    width: 64,
                    borderRadius: 8,
                    borderColor: COLORS.lightGrey,
                    backgroundColor: '#f1f1f1',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 4,
                    // borderWidth: 1,
                  },
                  pressed && {
                    backgroundColor: '#eaeaea',
                  },
                ]}
              >
                <Icon name={item.icon} size={32} color={COLORS.primary} />
              </Pressable>
              <View style={{ marginBottom: 12, maxWidth: 64 }}>
                <Text
                  style={{
                    fontFamily: FONTS.medium,
                    fontSize: 12,
                    textAlign: 'center',
                    color: COLORS.dark,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: 18,
              color: COLORS.dark,
              marginBottom: 12,
            }}
          >
            Kenali Thalassemia
          </Text>
          <ImageSlider images={news} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
