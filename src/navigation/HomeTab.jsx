import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLORS, FONTS } from '@src/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import Home from '@src/screens/home/Home';
import NewsList from '@src/screens/news/NewsList';
import Profile from '@src/screens/profile/Profile';
import Login from '@src/screens/auth/Login';
import Edication from '@src/screens/education/Edication';

export const HomeTabs = () => {
  const Tab = createBottomTabNavigator();
  const { loggedIn } = useSelector((state) => state.authSlice);
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 64,
          justifyContent: 'center',
          alignItems: 'center',
        },
        // headerShown: false,
        headerTitleAlign: 'center',
        headerTitleStyle: { fontFamily: FONTS.semiBold },
        tabBarLabelStyle: { fontFamily: 'Manrope-Medium', paddingBottom: 8 },
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 16 }}
          >
            <Icon name="arrow-back" size={24} />
          </TouchableOpacity>
        ),
        // tabBarShowLabel: false,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Edukasi') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Check') {
            iconName = focused ? 'flask' : 'flask-outline';
          } else if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          // headerShown: false,
          headerTitle: 'Mobile Tatas',
          headerTitleStyle: { fontFamily: FONTS.bold, color: COLORS.primary },
          headerLeftContainerStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsList}
        options={{
          title: 'Berita',
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => alert('add news')}
          //     style={{ padding: 16 }}
          //   >
          //     <Icon name="add" size={24} />
          //   </TouchableOpacity>
          // ),
        }}
      />
      {/* <Tab.Screen name="Check" component={Screening} /> */}
      <Tab.Screen name="Edukasi" component={Edication} />
      <Tab.Screen
        name="Profile"
        component={loggedIn ? Profile : Login}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
