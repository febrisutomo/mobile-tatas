import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FONTS } from '@src/constants';
import React from 'react';
import { useSelector } from 'react-redux';
import HomeTabs from './HomeTab';
import EditProfile from '@src/screens/profile/EditProfile';
import ChangePassword from '@src/screens/profile/ChangePassword';
import ShowNews from '@src/screens/news/ShowNews';
import Screening from '@src/screens/screening/Screening';
import Login from '@src/screens/auth/Login';
import ScreeningList from '@src/screens/screening/ScreeningList';
import Faskes from '@src/screens/faskes/Faskes';
import Register from '@src/screens/auth/Register';
import { TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import ScreeningForm from '@src/screens/screening/ScreeningForm';

export const AppStack = () => {
  const Stack = createNativeStackNavigator();
  const { loggedIn } = useSelector((state) => state.authSlice);
  const { navigate } = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: FONTS.semiBold },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Home Tabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Ubah Profil" component={EditProfile} />
      <Stack.Screen name="Ubah Password" component={ChangePassword} />

      <Stack.Screen
        name="Show News"
        component={ShowNews}
        options={({ route }) => ({ title: route.params.kategori })}
      />
      <Stack.Screen
        name="Screening"
        component={loggedIn ? Screening : Login}
        options={{
          headerShown: loggedIn ? true : false,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity onPress={() => navigate('Riwayat Screening')}>
              <FAIcon name="history" size={24} style={{ color: 'black' }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Riwayat Screening"
        component={loggedIn ? ScreeningList : Login}
        options={{
          headerShown: loggedIn ? true : false,
        }}
      />
      <Stack.Screen name="Form Screening" component={ScreeningForm} />
      <Stack.Screen
        name="Faskes"
        component={Faskes}
        options={{ title: 'Info Lokasi Faskes' }}
      />
      <Stack.Screen name="Pendaftaran" component={Register} />
    </Stack.Navigator>
  );
};

export default AppStack;
