import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FONTS } from '@src/constants';
import React from 'react';
import { useSelector } from 'react-redux';
import HomeTabs from './HomeTab';
import EditProfile from '@src/screens/profile/EditProfile';
import ChangePassword from '@src/screens/profile/ChangePassword';
import ShowNews from '@src/screens/news/ShowNews';
import Screening from '@src/screens/screening/ScreeningIndex';
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
import Profile from '@src/screens/profile/Profile';
import ScreeningHistory from '@src/screens/screening/ScreeningHistory';
import ScreeningAll from '@src/screens/screening/ScreeningAll';
import AgendaList from '@src/screens/agenda/AgendaList';

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
        name="Konfirmasi DNA"
        component={loggedIn ? ScreeningAll : Login}
        options={{
          headerShown: loggedIn ? true : false,
        }}
      />
      <Stack.Screen name="Form Screening" component={ScreeningForm} />
      <Stack.Screen
        name="Faskes"
        component={Faskes}
        options={{ headerTitle: 'Info Lokasi Faskes' }}
      />
      <Stack.Screen name="Pendaftaran" component={Register} />
      <Stack.Screen name="Model" component={Model} />
      <Stack.Screen name="Berita dan Artikel" component={NewsList} />
      <Stack.Screen name="Agenda" component={AgendaList} />
      <Stack.Screen
        name="Profil"
        component={loggedIn ? Profile : Login}
        options={{ headerTitle: loggedIn ? 'Profil' : 'Login' }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
