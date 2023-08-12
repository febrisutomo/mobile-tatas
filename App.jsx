import React, { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import { Provider } from 'react-redux';
import store, { persistor } from '@src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppStack from '@src/navigation/AppStack';
import SplashScreen from '@src/screens/splashScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('All permissions granted!');
      } else {
        console.log('Permissions denied!, You need to give permissions');
      }
    } catch (error) {
      console.log('Error while requesting permissions:', error);
    }
    return null;
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    requestPermissions();
  }, []);

  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer theme={DefaultTheme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                {loading ? <SplashScreen /> : <AppStack />}
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </NavigationContainer>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

// pk.eyJ1IjoiZmVicmlzb2V0IiwiYSI6ImNrdm0zMDFoa2RrajMzMnE2bHdmZ3Nlc2gifQ.xEhvQMKMtB_g-5QeasQ-jw
