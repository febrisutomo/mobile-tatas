import { View, Text, FlatList, Pressable, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '@src/constants';
import NewsItem from '@components/NewsItem';
import ImageSlider from '@components/ImageSlider';
import Card from '@components/Card';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useGetNews } from '@src/api/newsApi';

export default function Home({ navigation }) {
  const auth = useSelector((state) => state.authSlice);
  console.log('Home ~ auth:', auth);

  const images = [
    {
      id: 0,
      uri: 'https://images.unsplash.com/photo-1607326957431-29d25d2b386f',
      title: 'Dahlia',
    }, // https://unsplash.com/photos/Jup6QMQdLnM
    {
      id: 1,
      uri: 'https://images.unsplash.com/photo-1512238701577-f182d9ef8af7',
      title: 'Sunflower',
    }, // https://unsplash.com/photos/oO62CP-g1EA
    {
      id: 2,
      uri: 'https://images.unsplash.com/photo-1627522460108-215683bdc9f6',
      title: 'Zinnia',
    }, // https://unsplash.com/photos/gKMmJEvcyA8

    {
      id: 3,
      uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e',
      title: 'Hydrangea',
    }, // https://unsplash.com/photos/coIBOiWBPjk
  ];

  const menu = [
    {
      title: 'Skrining Talasemia',
      icon: 'clipboard-outline',
      route: 'Form Screening',
    },
    {
      title: 'Screening',
      icon: 'flask-outline',
      route: 'Screening',
    },

    {
      title: 'Agenda',
      icon: 'calendar-outline',
      route: 'Faskes',
    },
    {
      title: 'Faskes',
      icon: 'map-outline',
      route: 'Faskes',
    },
  ];

  const { data: news = [], refetch } = useGetNews();

  const onRefresh = () => {
    refetch();
  };

  const [iconCuaca, setIconCuaca] = useState('cloudy-outline');
  const [ucapan, setUcapan] = useState([]);
  const [cuaca, setCuaca] = useState({});
  const [temperature, setTemperature] = useState({});

  const getCuaca = async () => {
    try {
      const h = new Date().getHours();
      let greeting = '';
      if (h >= 4 && h < 10) {
        greeting = 'Selamat Pagi';
      } else if (h >= 10 && h < 15) {
        greeting = 'Selamat Siang';
      } else if (h >= 15 && h < 18) {
        greeting = 'Selamat Sore';
      } else if (h >= 18 || h < 4) {
        greeting = 'Selamat Malam';
      }
      setUcapan(greeting);

      const { data } = await axios.get(
        'https://cuaca-gempa-rest-api.vercel.app/weather/jawa-tengah/purwokerto',
      );
      let weather = data.data.params[6].times[2].name;
      setCuaca(weather);
      setTemperature(data.data.params[5].times[2].celcius.replace(' C', '℃'));
      if (weather.toLowerCase().includes('hujan')) {
        setIconCuaca('rainy-outline');
      } else if (
        weather.toLowerCase().includes('berawan') &&
        greeting === 'Selamat Malam'
      ) {
        setIconCuaca('cloudy-night-outline');
      } else {
        setIconCuaca('cloudy-outline');
      }
      console.log('temperature', data.data.params[5].times[2].celcius);
      console.log('cuaca', data.data.params[6].times[2].name);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCuaca();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <FlatList
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        style={{ padding: 16 }}
        data={news}
        renderItem={({ item, index }) => (
          <NewsItem
            item={item}
            navigation={navigation}
            style={
              index === news.length - 1 && {
                borderBottomRightRadius: 12,
                borderBottomLeftRadius: 12,
              }
            }
          />
        )}
        ListHeaderComponent={
          <View>
            <View>
              <View
                style={{
                  marginBottom: 16,
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Icon
                  name={iconCuaca}
                  size={32}
                  color={COLORS.dark}
                  style={{ marginRight: 8 }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: FONTS.medium,
                      color: COLORS.dark,
                    }}
                  >
                    {ucapan},
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: FONTS.semiBold,
                      color: COLORS.dark,
                    }}
                  >
                    {`${temperature} ${cuaca} di Kabupaten Banyumas`}
                  </Text>
                </View>
              </View>

              {/* IMAGE SLIDER  */}
              <ImageSlider images={images} />

              {/* MENU  */}
              <Card title="Menu" icon="grid-outline">
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  {menu.map((item, index) => (
                    <View
                      style={{
                        alignItems: 'center',
                        width: 72,
                      }}
                      key={index}
                    >
                      <Pressable
                        onPress={() => navigation.navigate(item.route)}
                        style={({ pressed }) => [
                          {
                            height: 64,
                            width: 64,
                            borderRadius: 32,
                            borderColor: COLORS.lightGrey,
                            backgroundColor: '#f1f1f1',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 12,
                          },
                          pressed && {
                            backgroundColor: '#eaeaea',
                          },
                        ]}
                      >
                        <Icon
                          name={item.icon}
                          size={32}
                          color={COLORS.primary}
                        />
                      </Pressable>
                      <View style={{ width: 80 }}>
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
              </Card>
            </View>

            <View
              style={{
                paddingHorizontal: 16,
                paddingTop: 16,
                backgroundColor: '#fff',
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <Icon
                  name="newspaper-outline"
                  size={18}
                  color={COLORS.dark}
                  style={{ marginRight: 8 }}
                />

                <Text
                  style={{
                    fontFamily: FONTS.semiBold,
                    fontSize: 18,
                    color: COLORS.dark,
                  }}
                >
                  Berita Terkini
                </Text>
              </View>
            </View>
          </View>
        }
        ListFooterComponent={
          <View
            style={{
              marginBottom: 32,
            }}
          />
        }
        ListEmptyComponent={
          <View
            style={{
              borderBottomRightRadius: 12,
              borderBottomLeftRadius: 12,
              backgroundColor: '#fff',
              paddingHorizontal: 16,
              paddingBottom: 16,
            }}
          >
            <Text style={{ fontFamily: FONTS.medium, fontSize: 14 }}>
              Tidak ada data yang tersedia
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
