import { View } from 'react-native';
import React from 'react';

const Col = ({ children, span = 4 }) => {
  <View style={{ flex: span }}>{children}</View>;
};

const RowComponent = ({ children }) => {
  return <View style={{ flexDirection: 'row' }}>{children}</View>;
};

const Row = Object.assign(RowComponent, {
  Col,
});

export default Row;
