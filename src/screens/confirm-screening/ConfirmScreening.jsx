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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const List = ({ navigation, isConfirmed }) => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllScreeningsInfinite(isConfirmed);

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
                navigation.navigate('Detail Konfirmasi', {
                  screening: item,
                })
              }
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

//make component verified and unverified from List Component

const ListVerified = ({ navigation }) => {
  return <List navigation={navigation} isConfirmed={'true'} />;
};

const ListUnverified = ({ navigation }) => {
  return <List navigation={navigation} isConfirmed={'false'} />;
};

const ConfirmScreening = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 14, textTransform: 'none' },
        tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
      }}
    >
      <Tab.Screen name="Belum Dikonfirmasi" component={ListUnverified} />
      <Tab.Screen name="Sudah Dikonfirmasi" component={ListVerified} />
    </Tab.Navigator>
  );
};

export default ConfirmScreening;
