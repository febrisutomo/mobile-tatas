import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { View, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import NewsItem from '@components/NewsItem';
import { COLORS } from '@src/constants';
import { useGetNewsInfinite } from '@src/api/newsApi';

export default function NewsList({ navigation }) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isRefetching,
    isFetchingNextPage,
  } = useGetNewsInfinite();

  if (isLoading || isRefetching) {
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

  const news = data?.pages?.flatMap((page) => page.berita);

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
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <NewsItem key={item.ID} item={item} navigation={navigation} />
        )}
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
    </SafeAreaView>
  );
}
