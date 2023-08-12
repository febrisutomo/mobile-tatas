import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const CustomToast = ({ message, duration = 2000 }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    showAnimation();
    return () => {
      hideAnimation();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        hideAnimation();
      }, duration);
    });
  };

  const hideAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.customToast, { opacity: fadeAnim }]}>
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  customToast: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  message: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomToast;
