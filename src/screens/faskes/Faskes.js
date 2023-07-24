import MapboxGL from '@rnmapbox/maps';
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Text, Pressable, View, PermissionsAndroid } from 'react-native';
import { COLORS, FONTS } from '@src/constants';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZmVicmlzb2V0IiwiYSI6ImNrdm0zMDFoa2RrajMzMnE2bHdmZ3Nlc2gifQ.xEhvQMKMtB_g-5QeasQ-jw',
);

// Fungsi untuk mengonversi derajat menjadi radian
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Fungsi untuk menghitung jarak antara dua titik koordinat menggunakan rumus Haversine
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius Bumi dalam kilometer
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Jarak dalam kilometer

  return distance;
}

const locationsApi = [
  {
    id: 1,
    name: 'RSUD Banyumas',
    address:
      'Jl. Rumah Sakit No.1, Karangpucung, Kejawar, Kec. Banyumas, Kabupaten Banyumas, Jawa Tengah 53192',
    phone: '(0281) 796031',
    coordinates: '-7.529621357095523, 109.2923916796076',
  },
  {
    id: 2,
    name: 'RSU Siaga Medika Banyumas',
    address:
      'Jl. Pramuka No.55, Mruyung, Sudagaran, Kec. Banyumas, Kabupaten Banyumas, Jawa Tengah 53192',
    phone: '(0281) 796645',
    coordinates: '-7.524962494298697, 109.29355031961433',
  },
  {
    id: 3,
    name: 'RSU Wiradadi Husada',
    address:
      'Jl. Menteri Supeno No.25, Dusun I Wiradadi, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah 53181',
    phone: '(0281) 6846225',
    coordinates: '-7.4583297669642885, 109.27196758000761',
  },
  {
    id: 4,
    name: 'RSUP Margono Soekarjo',
    address:
      'Jl. Dr. Gumbreg No.1, Kebontebu, Berkoh, Kec. Purwokerto Sel., Kabupaten Banyumas, Jawa Tengah 53146',
    phone: '(0281) 632708',
    coordinates: '-7.436033001935134, 109.26741183275088',
  },
];

const FeatureLabel = ({ message }) => {
  return (
    <View
      style={{
        // backgroundColor: 'white',
        marginTop: 32,
        width: 100,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: 'black',
          fontSize: 12,
          textAlign: 'center',
        }}
      >
        {message}
      </Text>
    </View>
  );
};

const ListItem = ({ item, camera, bottomSheet, onClick }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          backgroundColor: pressed ? '#f1f1f1' : 'white',
          elevation: 4,
          padding: 8,
          height: 100,
          // borderColor: COLORS.lightGrey,
          borderRadius: 12,
        },
      ]}
      onPress={() => {
        onClick(item);
        camera.current?.setCamera({
          centerCoordinate: item.geometry.coordinates,
          animationDuration: 500,
          zoomLevel: 14,
        });
        bottomSheet.current?.snapToIndex(0);
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          borderRadius: 12,
          marginRight: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontFamily: FONTS.semiBold,
            color: 'white',
          }}
        >
          {item.properties.distance.toFixed(2)} Km
        </Text>
      </View>
      <View style={{ flex: 3 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: FONTS.semiBold,
            marginBottom: 4,
            color: COLORS.dark,
          }}
        >
          {item.properties.name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: FONTS.medium,
            marginBottom: 4,
          }}
          numberOfLines={2}
        >
          {item.properties.address}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: FONTS.medium,
            marginBottom: 4,
          }}
          numberOfLines={2}
        >
          {item.properties.phone}
        </Text>
      </View>
    </Pressable>
  );
};

export default function Maps() {
  const [userCoordinates, setUserCoordinates] = useState(
    '-7.40391162312597, 109.24623016426392',
  );

  const [locations, setLocations] = useState(locationsApi);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['50%', '75%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [featureCollection, setFeatureCollection] = useState({
    type: 'FeatureCollection',
    features: [],
  });
  const [selectedFeature, setSelectedFeature] = useState();

  const requestLocationPermission = async () => {
    try {
      const userResponse = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      if (
        userResponse['android.permission.ACCESS_FINE_LOCATION'] &&
        userResponse['android.permission.ACCESS_COARSE_LOCATION'] === 'granted'
      ) {
        console.log('All permissions granted!');
      } else {
        console.log('Permissions denied!, You need to give permissions');
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  useEffect(() => {
    requestLocationPermission();

    const [referenceLat, referenceLon] = userCoordinates
      .split(',')
      .map(parseFloat);
    const sortedLocations = [...locations];
    sortedLocations.forEach((location) => {
      const [lat, lon] = location.coordinates.split(',').map(parseFloat);
      location.distance = calculateDistance(
        referenceLat,
        referenceLon,
        lat,
        lon,
      );
    });

    sortedLocations.sort((a, b) => a.distance - b.distance);

    let features = sortedLocations.map((data) => {
      return {
        type: 'Feature',
        id: data.id,
        properties: {
          icon: 'example',
          name: data.name,
          address: data.address,
          phone: data.phone,
          distance: data.distance,
        },
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(data.coordinates.split(',')[1]),
            parseFloat(data.coordinates.split(',')[0]),
          ],
        },
      };
    });
    setFeatureCollection({ type: 'FeatureCollection', features });
    console.log(features[0].geometry?.coordinates);
    camera.current?.setCamera({
      centerCoordinate: features[0].geometry?.coordinates,
      animationDuration: 500,
      zoomLevel: 14,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCoordinates]);

  const camera = useRef(null);

  const onPinPress = (e) => {
    bottomSheetRef.current?.snapToIndex(0);
    if (selectedFeature) {
      setSelectedFeature(undefined);
      return;
    }

    const feature = e?.features[0];
    setSelectedFeature(feature);
    // console.log(feature);
    // console.log(feature?.geometry?.coordinates);

    camera.current?.setCamera({
      centerCoordinate: feature?.geometry?.coordinates,
      animationDuration: 500,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView
        style={{ flex: 1 }}
        // onCameraChanged={(state) => {
        //   console.log('zoom', state.properties.zoom);
        //   if (state.properties.zoom < 12) {
        //     setSelectedFeature(undefined);
        //   }
        // }}
      >
        <MapboxGL.UserLocation
          onUpdate={({ coords }) =>
            setUserCoordinates(coords.latitude + ',' + coords.longitude)
          }
        />
        <MapboxGL.Camera
          ref={camera}
          centerCoordinate={[109.247833, -7.431391]}
          // followUserLocation
          // followZoomLevel={12}
          zoomLevel={12}
        />
        <MapboxGL.ShapeSource
          id="mapPinsSource"
          shape={featureCollection}
          onPress={onPinPress}
        >
          <MapboxGL.Images
            images={{ hospital: require('@assets/images/hospital.png') }}
          />
          <MapboxGL.SymbolLayer
            id="mapPinsLayer"
            style={{
              iconAllowOverlap: true,
              iconAnchor: 'bottom',
              iconSize: 1.0,
              iconImage: 'hospital',
            }}
          />
        </MapboxGL.ShapeSource>
        {selectedFeature && (
          <MapboxGL.MarkerView
            coordinate={selectedFeature.geometry.coordinates}
          >
            <FeatureLabel message={selectedFeature?.properties?.name} />
          </MapboxGL.MarkerView>
        )}
      </MapboxGL.MapView>
      <View style={{ flex: 1 }} />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 18,
              color: COLORS.primary,
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            Rumah Sakit
          </Text>
          <BottomSheetFlatList
            data={featureCollection.features}
            renderItem={({ item }) => (
              <ListItem
                key={item.id}
                item={item}
                camera={camera}
                bottomSheet={bottomSheetRef}
                onClick={setSelectedFeature}
              />
            )}
            ItemSeparatorComponent={<View style={{ marginBottom: 16 }} />}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
          />
        </View>
      </BottomSheet>
    </View>
  );
}
