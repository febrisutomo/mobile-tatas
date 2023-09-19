import { Text, Image, useWindowDimensions, Pressable } from 'react-native';
import React from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS, FONTS } from '@src/constants';
import { useNavigation } from '@react-navigation/native';

const Item = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        width: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        height: 250,
        padding: 10,
      }}
      onPress={() =>
        navigation.navigate('Show News', {
          news: item,
          category: item.category.name,
        })
      }
    >
      {/* <Image
        // source={{ uri: item.thumbnail }}
        source={{ uri: 'https://192.168.0.1/' + item.image }}
        style={{
          width: '100%',
          height: 200, // Adjust image height
          resizeMode: 'cover',
          borderRadius: 8,
        }}
      /> */}
      <Text
        style={{
          fontSize: 16,
          fontFamily: FONTS.semiBold,
          color: '#fff',
        }}
      >
        {item.title}
      </Text>
    </Pressable>
  );
};

const NewsCarousel = ({ data }) => {
  const width = useWindowDimensions().width;
  const [activeSlide, setActiveSlide] = React.useState(0);

  return (
    <>
      <Carousel
        data={data}
        renderItem={({ index, item }) => <Item item={item} />}
        sliderWidth={width - 32}
        itemWidth={((width - 32) * 2) / 5}
        onSnapToItem={(index) => setActiveSlide(index)}
        activeSlideAlignment="start"
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          paddingVertical: 16,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
        }}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.gray}
        // inactiveDotOpacity={0.4}
        inactiveDotScale={0.8}
      />
    </>
  );
};

export default NewsCarousel;
