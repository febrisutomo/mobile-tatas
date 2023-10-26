import { View, Text, FlatList, Pressable, Image } from 'react-native';
import React, { useRef, useCallback } from 'react';
import Button from '@components/Button';
import { COLORS, FONTS } from '@src/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useDispatch } from 'react-redux';
import { logout } from '@src/redux/slice/authSlice';
import { useGetProfile } from '@src/api/authApi';
import Alert from '@components/Alert';
import { useQueryClient } from '@tanstack/react-query';

export default function Account({ navigation }) {
  const { data: user } = useGetProfile();
  console.log('Profile ~ user:', user);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    queryClient.invalidateQueries({
      queryKey: ['profile'],
    });
    navigation.navigate('Home');
  };

  const data = [
    {
      title: 'Ubah Profil',
      icon: 'person',
      route: 'Ubah Profil',
    },
    {
      title: 'Ubah Password',
      icon: 'lock-closed',
      route: 'Ubah Password',
    },

    // {
    //   title: 'Kebijakan dan Ketentuan',
    //   icon: 'shield-checkmark',
    //   route: 'Edit Profile',
    // },
    {
      title: 'Tentang Aplikasi',
      icon: 'help-circle',
      route: 'Tentang Aplikasi',
    },
  ];

  // if (user?.role?.name === 'Admin') {
  //   data.push({
  //     title: 'Model',
  //     icon: 'server',
  //     route: 'Model',
  //   });
  // }

  const bottomSheetModalRef = useRef(null);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
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

  const renderModalFooter = () => (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: 16,
        gap: 16,
        flexDirection: 'row',
      }}
    >
      <View style={{ flex: 1 }}>
        <Button title="Ya" onPress={handleLogout} />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          title="Batal"
          style={{
            backgroundColor: '#fff',
            borderColor: COLORS.primary,
            borderWidth: 1,
          }}
          titleStyle={{ color: COLORS.primary }}
          onPress={() => bottomSheetModalRef.current?.dismiss()}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <View>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 16,
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 16,
          }}
        >
          <View
            style={{
              height: 64,
              width: 64,
              borderRadius: 50,
              marginBottom: 8,
              overflow: 'hidden',
            }}
          >
            <Image
              defaultSource={require('@assets/images/default-profile-picture.png')}
              source={{
                uri: `https://ui-avatars.com/api/?name=${user?.name}&background=dc2626&color=fff`,
              }}
              style={{
                flex: 1,
                resizeMode: 'cover',
              }}
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: FONTS.semiBold,
                textAlign: 'center',
                color: COLORS.dark,
              }}
            >
              {user?.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: FONTS.semiBold,
                color: 'gray',
                textAlign: 'center',
              }}
            >
              {user?.role?.name}
            </Text>
          </View>
        </View>
        <FlatList
          style={{
            backgroundColor: '#FFF',
            // elevation: 4,
            borderRadius: 12,
            // paddingHorizontal: 16,
            marginBottom: 16,
          }}
          data={data}
          renderItem={({ item, index }) => (
            <Pressable
              style={({ pressed }) => [
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 64,
                  alignItems: 'center',
                  borderBottomWidth: index === data.length - 1 ? 0 : 1,
                  borderBottomColor: '#f1f1f1',
                  paddingHorizontal: 16,
                },
                pressed && {
                  backgroundColor: '#eaeaea',
                  borderRadius: 12,
                },
              ]}
              onPress={() => navigation.push(item.route)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    backgroundColor: '#f1f1f1',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                    height: 42,
                    width: 42,
                    borderRadius: 100,
                  }}
                >
                  <Icon name={item.icon} size={20} color={COLORS.primary} />
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: FONTS.semiBold,
                    color: COLORS.dark,
                  }}
                >
                  {item.title}
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={COLORS.primary} />
            </Pressable>
          )}
        />
        <Button
          title="Keluar Akun"
          onPress={handlePresentModal}
          rightIcon="log-out-outline"
        />
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['40%']}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        // enableHandlePanningGesture={false}
        footerComponent={renderModalFooter}
      >
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
            Keluar Akun TATAS Mobile
          </Text>
          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: 14,
              color: COLORS.dark,
              marginBottom: 16,
            }}
          >
            Apakah anda yakin ingin keluar dari akun TATAS Mobile?
          </Text>
          <Alert>Semua data Anda akan tetap tersimpan secara otomatis.</Alert>
        </View>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
