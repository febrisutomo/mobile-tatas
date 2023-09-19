import { View, Image, FlatList, useWindowDimensions } from 'react-native';
import React, { useRef, useState } from 'react';
import { COLORS } from '@src/constants';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Item = ({ item }) => {
  const width = useWindowDimensions().width;
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Show News', {
          news: item,
          category: item.category.name,
        })
      }
    >
      <Image
        key={item.id}
        style={{
          width: (width * 3) / 5,
          backgroundColor: 'gray',
          borderRadius: 12,
          height: 400,
          borderColor: COLORS.lightGrey,
          borderWidth: 1,
        }}
        source={{ uri: 'http://192.168.1.234:8000/storage/' + item.image }}
      />
    </Pressable>
  );
};

const Separator = () => <View style={{ width: 12 }} />;

const ImageSlider = ({ images }) => {
  const width = useWindowDimensions().width;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = (width * 3) / 5 + 12;
    const currentIndex = Math.round(offsetX / itemWidth);

    setActiveIndex(currentIndex);
  };

  return (
    <View
      style={{
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ index, item }) => <Item item={item} />}
        ItemSeparatorComponent={Separator}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        snapToStart={true}
        snapToInterval={(width * 3) / 5 + 12}
        decelerationRate="fast"
        horizontal
        onScroll={handleScroll}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
        }}
      >
        {images.map((data, index) => (
          <View
            key={index}
            style={[
              {
                width: 6,
                height: 6,
                borderRadius: 4,
                backgroundColor: COLORS.lightGrey,
                margin: 3,
              },
              index === activeIndex && {
                width: 18,
                backgroundColor: COLORS.primary,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageSlider;
