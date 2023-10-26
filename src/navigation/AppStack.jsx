import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FONTS } from '@src/constants';
import React from 'react';
import { useSelector } from 'react-redux';
import EditProfile from '@src/screens/account/EditProfile';
import ChangePassword from '@src/screens/account/ChangePassword';
import ShowNews from '@src/screens/news/ShowNews';
import Screening from '@src/screens/screening/ScreeningResult';
import Login from '@src/screens/auth/Login';
import Faskes from '@src/screens/faskes/Faskes';
import Register from '@src/screens/auth/Register';
import { TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import ScreeningForm from '@src/screens/screening/ScreeningForm';
import Model from '@src/screens/model/Model';
import Home from '@src/screens/home/Home';
import NewsList from '@src/screens/news/NewsList';
import Profile from '@src/screens/account/Account';
import ScreeningHistory from '@src/screens/screening/ScreeningHistory';
import ScreeningAll from '@src/screens/confirm-screening/ConfirmScreening';
import AgendaList from '@src/screens/agenda/AgendaList';
import HbElfoForm from '@src/screens/screening/HbElfoForm';
import DetailConfirmScreening from '@src/screens/confirm-screening/DetailConfirmScreening';
import About from '@src/screens/about/About';
import DataMaster from '@src/screens/data-master/DataMaster';
import Icon from 'react-native-vector-icons/Ionicons';
import DetailDataMaster from '@src/screens/data-master/DetailDataMaster';

export const AppStack = () => {
  const Stack = createNativeStackNavigator();
  const { loggedIn } = useSelector((state) => state.authSlice);
  console.info('AppStack ~ loggedIn:', loggedIn);
  const { navigate } = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: FONTS.semiBold },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Ubah Profil" component={EditProfile} />
      <Stack.Screen name="Ubah Password" component={ChangePassword} />

      <Stack.Screen
        name="Show News"
        component={ShowNews}
        options={({ route }) => ({ title: route.params.category })}
      />
      <Stack.Screen
        name="Screening"
        component={loggedIn ? Screening : Login}
        options={{
          headerTitle: loggedIn ? 'Hasil Screening' : 'Login',
          // headerShown: loggedIn ? true : false,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () =>
            loggedIn && (
              <TouchableOpacity onPress={() => navigate('Riwayat Screening')}>
                <FAIcon name="history" size={24} style={{ color: 'black' }} />
              </TouchableOpacity>
            ),
        }}
      />
      <Stack.Screen
        name="Riwayat Screening"
        component={loggedIn ? ScreeningHistory : Login}
        options={{
          headerShown: loggedIn ? true : false,
        }}
      />
      <Stack.Screen
        name="Konfirmasi Screening"
        component={loggedIn ? ScreeningAll : Login}
        options={{
          headerShown: loggedIn ? true : false,
        }}
      />
      <Stack.Screen
        name="Form Screening"
        component={ScreeningForm}
        options={{ headerTitle: 'Screening' }}
      />
      <Stack.Screen
        name="Form Hb Elfo"
        component={HbElfoForm}
        options={{ headerTitle: 'Screening Lanjutan' }}
      />
      <Stack.Screen name="Tentang Aplikasi" component={About} />
      <Stack.Screen
        name="Detail Konfirmasi"
        component={DetailConfirmScreening}
      />
      <Stack.Screen
        name="Faskes"
        component={Faskes}
        options={{ headerTitle: 'Info Lokasi Faskes' }}
      />
      <Stack.Screen name="Pendaftaran" component={Register} />
      <Stack.Screen
        name="Manajemen Model"
        component={Model}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity onPress={() => navigate('Data Master')}>
              <Icon
                name="shield-checkmark-outline"
                size={24}
                style={{ color: 'black' }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Berita dan Artikel" component={NewsList} />
      <Stack.Screen name="Agenda" component={AgendaList} />
      <Stack.Screen
        name="Akun"
        component={loggedIn ? Profile : Login}
        options={{ headerTitle: loggedIn ? 'Akun' : 'Login' }}
      />
      <Stack.Screen name="Data Master" component={DataMaster} />
      <Stack.Screen name="Detail Data Master" component={DetailDataMaster} />
    </Stack.Navigator>
  );
};

export default AppStack;
