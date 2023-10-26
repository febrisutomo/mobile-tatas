import React from 'react';
import { ActivityIndicator, Image } from 'react-native';
import {
  SafeAreaView,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { FONTS, COLORS } from '@src/constants';
import { useGetAllScreeningsInfinite } from '@src/api/screeningApi';
import ScreeningItem from '@components/ScreeningItem';

const DataMaster = ({ navigation }) => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllScreeningsInfinite(true);

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>An error occurred while fetching data</Text>
      </SafeAreaView>
    );
  }

  const screenings = data?.pages?.flatMap((page) => page.screenings);

  const onRefresh = () => {
    refetch();
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      {screenings.length === 0 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            style={{
              width: 250,
              height: 200,
              resizeMode: 'contain',
            }}
            source={require('@assets/images/404-red.png')}
          />
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: 14,
              color: COLORS.gray,
              textAlign: 'center',
            }}
          >
            Belum ada data screening
          </Text>
        </View>
      ) : (
        <FlatList
          data={screenings}
          // style={{ padding: 20 }}
          renderItem={({ item }) => (
            <ScreeningItem
              key={item.id}
              item={item}
              navigation={navigation}
              onPress={() =>
                navigation.navigate('Detail Data Master', {
                  screening: item,
                })
              }
              showApproved
            />
          )}
          ItemSeparatorComponent={<View style={{ marginBottom: 16 }} />}
          contentContainerStyle={{ padding: 16 }}
          ListFooterComponent={
            isFetchingNextPage && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  marginBottom: 20,
                  padding: 16,
                }}
              >
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            )
          }
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
        />
      )}
    </SafeAreaView>
  );
};

export default DataMaster;
