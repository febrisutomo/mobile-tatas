import { View, Text } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';
import { useGetListFiles } from '@src/api/screeningApi';
import { COLORS } from '@src/constants';

const File = ({ item, index }) => {
  return (
    <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 12 }}>
      <Text style={{ color: COLORS.dark }}>{item}</Text>
    </View>
  );
};

const ListFile = () => {
  const { data: files, isSuccess } = useGetListFiles();
  return (
    <View>
      {isSuccess && (
        <FlatList
          data={files}
          renderItem={File}
          ItemSeparatorComponent={<View style={{ marginBottom: 8 }} />}
        />
      )}
      {/* {isSuccess &&
        files.map((file, index) => (
          <View key={index} style={{ backgroundColor: 'white' }}>
            <Text>{file}</Text>
          </View>
        ))} */}
    </View>
  );
};

export default ListFile;
