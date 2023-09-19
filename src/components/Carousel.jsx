import { View, Image, FlatList, useWindowDimensions } from 'react-native';
import React, { useRef, useState } from 'react';
import { COLORS } from '@src/constants';

const Carousel = ({ images }) => {
  const width = useWindowDimensions().width;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    setActiveIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  return (
    <View
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
      }}
    >
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={({ item, index }) => (
          <Image
            key={item.id}
            style={{
              height: 180,
              width: width,
              backgroundColor: 'gray',
              // height: 180,
            }}
            source={{ uri: item.uri }}
          />
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        snapToStart={true}
        snapToInterval={width}
        decelerationRate="fast"
        horizontal
        // onMomentumScrollEnd={handleScroll}
        onScroll={handleScroll}
      />

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 12,
          left: 12,
          justifyContent: 'center',
          alignItems: 'center',
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
                backgroundColor: 'white',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;
