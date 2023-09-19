import React, { useCallback, useState, useRef, useEffect } from 'react';
import { ActivityIndicator, Image, ToastAndroid } from 'react-native';
import {
  SafeAreaView,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { FONTS, COLORS } from '@src/constants';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  useGetAllScreeningsInfinite,
  useUpdateDNA,
} from '@src/api/screeningApi';
import ScreeningItem from '@components/ScreeningItem';
import ModalSelect from '@components/ModalSelect';
import Button from '@components/Button';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView } from 'react-native-gesture-handler';
import Row from '@components/Row';

const List = ({ navigation, isConfirmed }) => {
  const [selected, setSelected] = useState(null);

  const { mutateAsync: updateDNA, isLoading: isUpdatingDNA } = useUpdateDNA(
    selected?.id,
  );

  const {
    data,
    isLoading,
    isError,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllScreeningsInfinite(isConfirmed);

  const bottomSheetModalRef = useRef(null);

  const handlePresentModal = useCallback((screening) => {
    bottomSheetModalRef.current?.present();
    setSelected(screening);
  }, []);

  const handleSheetChanges = useCallback((index) => {}, []);

  const handleSave = async () => {
    try {
      const response = await updateDNA({ dna });
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
      bottomSheetModalRef.current?.dismiss();
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

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

  const [dna, setDna] = useState(null);

  useEffect(() => {
    setDna(selected?.dna);
  }, [selected]);

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
        snapPoints={['75%']}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        // enableHandlePanningGesture={false}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 18,
            color: COLORS.primary,
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          Detail
        </Text>
        {selected != null && (
          <ScrollView style={{ flex: 1, padding: 16, paddingTop: 0 }}>
            <View style={{ gap: 10 }}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 14,
                  color: COLORS.primary,
                }}
              >
                Data Pasien
              </Text>
              <Row label="Nama" value={`${selected.user.name}`} />
              <Row label="NIK" value={`${selected.user.nik}`} />
              <Row label="Kelamin" value={`${selected.user.gender.name}`} />
              <Row label="Alamat" value={`${selected.user?.district?.name}`} />
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 14,
                  marginTop: 14,
                  color: COLORS.primary,
                }}
              >
                Data Screening
              </Text>
              <Row
                label="Tanggal"
                value={new Date(selected.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              />
              <Row
                label="Jam"
                value={new Date(selected.date).toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              />
              <Row label="HB" value={`${selected.hb} g/dL`} />
              <Row label="MCH" value={`${selected.mch} pg`} />
              <Row label="MCV" value={`${selected.mcv} fL`} />
              <Row
                label="Prediksi"
                value={`${selected.prediction ? 'POSITIF' : 'NEGATIF'}`}
              />
              <Row label="Probabilitas" value={`${selected.probability}%`} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: FONTS.bold,
                    color: COLORS.dark,
                  }}
                >
                  DNA
                </Text>
                <View style={{ width: 150 }}>
                  <ModalSelect
                    placeholder="Hasil Tes DNA"
                    height={40}
                    value={dna}
                    onChange={setDna}
                    options={[
                      { label: 'Belum Diketahui', value: 'null' },
                      { label: 'Positif', value: '1' },
                      { label: 'Negatif', value: '0' },
                    ]}
                  />
                </View>
              </View>
              <View style={{ paddingVertical: 16 }}>
                <Button
                  onPress={handleSave}
                  title="Konfirmasi"
                  isLoading={isUpdatingDNA}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </BottomSheetModal>
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

const ScreeningAll = () => {
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

export default ScreeningAll;
