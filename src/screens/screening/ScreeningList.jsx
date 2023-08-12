import React, { useCallback, useState, useRef } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import {
  SafeAreaView,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import ScreeningItem from '@components/ScreeningItem';
import { FONTS, COLORS } from '@src/constants';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useGetScreeningsInfinite } from '@src/api/screeningApi';

const Row = ({ label, value }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text
        style={{
          flex: 1,
          fontSize: 14,
          fontFamily: FONTS.bold,
          color: COLORS.dark,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          flex: 3,
          fontSize: 14,
          fontFamily: FONTS.semiBold,
          color: COLORS.gray,
        }}
      >
        : {value}
      </Text>
    </View>
  );
};

export default function ScreeningList({ navigation }) {
  const [selected, setSelected] = useState(null);

  const {
    data,
    isLoading,
    isError,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetScreeningsInfinite();

  const bottomSheetModalRef = useRef(null);

  const handlePresentModal = useCallback((screening) => {
    bottomSheetModalRef.current?.present();
    setSelected(screening);
  }, []);

  const handleSheetChanges = useCallback((index) => {}, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

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
            Anda belum melakukan screening
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
              onPress={handlePresentModal}
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

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['50%', '75%']}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        // enableHandlePanningGesture={false}
      >
        {selected != null && (
          <View style={{ flex: 1, padding: 16, paddingTop: 0 }}>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 18,
                color: COLORS.primary,
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              Detail Skrining
            </Text>
            <View style={{ gap: 12 }}>
              <Row
                label="Tanggal"
                value={
                  new Date(selected.date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }) +
                  ' ' +
                  new Date(selected.date).toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }
              />
              <Row label="HB" value={`${selected.hb} g/dL`} />
              <Row label="MCH" value={`${selected.mch} pg`} />
              <Row label="MCV" value={`${selected.mcv} fL`} />
              <Row
                label="Prediksi"
                value={`${selected.prediction ? 'POSITIF' : 'NEGATIF'}`}
              />
              <Row label="Probabilitas" value={`${selected.probability}%`} />
            </View>
          </View>
        )}
      </BottomSheetModal>
    </SafeAreaView>
  );
}
