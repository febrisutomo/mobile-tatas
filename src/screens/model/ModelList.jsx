import { View, Text, Alert, ToastAndroid } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';
import { COLORS, FONTS } from '@src/constants';
import { useActivateModel, useGetListModel } from '@src/api/modelApi';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native';
import { Modal } from 'react-native';

const Item = ({ item, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          backgroundColor: pressed ? '#f1f1f1' : 'white',
          paddingHorizontal: 8,
          borderColor: item.is_active ? COLORS.primary : COLORS.lightGrey,
          borderWidth: item.is_active ? 2 : 1,
          borderRadius: 12,
          alignItems: 'center',
        },
      ]}
      onPress={() => (item.is_active ? {} : onPress(item.id))}
    >
      <View
        style={{
          padding: 8,
          paddingRight: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon name="server-outline" size={32} color={COLORS.primary} />
      </View>
      <View style={{ flexGrow: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 10,
                fontFamily: FONTS.semiBold,
                color: COLORS.gray,
              }}
            >
              {new Date(item.created_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {' • '}
              {new Date(item.created_at).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontFamily: FONTS.semiBold,
                color: COLORS.dark,
              }}
            >
              {item.name}
            </Text>
          </View>
          <View>
            <Text
              style={{
                marginRight: 8,
                fontSize: 12,
                fontFamily: FONTS.bold,
                color: item.is_active ? COLORS.primary : COLORS.gray,
              }}
            >
              {item.is_active ? 'Aktif' : 'Nonaktif'}
            </Text>
            {/* <Icon name="chevron-forward" size={16} color={COLORS.primary} /> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const ModelList = () => {
  const { data = [], isSuccess, isRefetching, isLoading } = useGetListModel();

  const { mutateAsync: activateModel, isLoading: isUpdating } =
    useActivateModel();

  const handlePress = (model_id) => {
    Alert.alert(
      'Aktifkan Model', // judul
      'Apakah Anda yakin ingin mengaktifkan model ini?', // pesan
      [
        { text: 'Batal', onPress: () => {} },
        { text: 'Ya', onPress: () => onActivateModel(model_id) },
      ],
    );
  };

  const onActivateModel = async (model_id) => {
    try {
      const response = await activateModel(model_id);
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  if (isLoading || isRefetching) {
    return (
      <View
        style={{
          flex: 1,
          padding: 16,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View>
      {isSuccess && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Item key={item.id} item={item} onPress={handlePress} />
          )}
          ItemSeparatorComponent={<View style={{ marginBottom: 8 }} />}
        />
      )}
      {/* Loading Modal */}
      <Modal
        transparent={true}
        animationType="none"
        visible={isUpdating}
        onRequestClose={() => {}}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'white',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModelList;
