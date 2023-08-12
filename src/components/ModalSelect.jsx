/* eslint-disable eqeqeq */
import { View, Text, Pressable } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '@src/constants';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import Button from './Button';
import TextInput from './TextInput';

export default function ModalSelect({
  value = null,
  placeholder = 'Pilih',
  options = [],
  onChange,
  label,
  isSearchable = false,
  required,
  error,
  height = 50,
  style,
}) {
  const [searchText, setSearchText] = useState('');

  const [filteredOptions, setFilteredOptions] = useState([]);

  const [selectedValue, setSelectedValue] = useState(value);

  const [selectedLabel, setSelectedLabel] = useState(value);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // ref
  const bottomSheetModalRef = useRef(null);
  const listRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [height + '%'], [height]);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(
    (index) => {
      if (index === 0) {
        const [s] = options.filter((item) => item.value == selectedValue);
        listRef.current?.scrollToItem({ animated: true, item: s });
      }
    },
    [options, selectedValue],
  );

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

  const handleSearch = useCallback(
    (text) => {
      setSearchText(text);
      const filtered = options.filter((item) =>
        item.label.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredOptions(filtered);
    },
    [options],
  );

  const handleApply = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    onChange(selectedValue);
  }, [onChange, selectedValue]);

  const handleDismiss = useCallback(() => {
    setSelectedValue(value);
    handleSearch('');
  }, [handleSearch, value]);

  useEffect(() => {
    const [v] = options.filter((item) => item.value == value);
    setSelectedLabel(v?.label || '');
  }, [options, value]);

  // render
  const renderItemList = useCallback(
    ({ item }) => (
      <Pressable
        onPress={() => setSelectedValue(item.value)}
        style={({ pressed }) => [
          {
            height: 40,
            paddingHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          pressed && {
            backgroundColor: '#f1f1f1',
          },
        ]}
      >
        <Text
          numberOfLines={1}
          style={{
            fontFamily: FONTS.medium,
            fontSize: 14,
            color: selectedValue == item.value ? COLORS.primary : COLORS.dark,
          }}
        >
          {item.label}
        </Text>
        <Icon
          name={
            selectedValue == item.value ? 'radio-button-on' : 'radio-button-off'
          }
          size={20}
          color={COLORS.primary}
        />
      </Pressable>
    ),
    [selectedValue],
  );

  const renderFooter = useCallback(
    () => (
      <View style={{ padding: 16 }}>
        <Button
          title="Terapkan"
          onPress={handleApply}
          disabled={selectedValue === null}
        />
      </View>
    ),
    [handleApply, selectedValue],
  );

  return (
    <View style={[{ width: '100%', position: 'relative' }, style]}>
      <TextInput
        label={label}
        required={required}
        placeholder={placeholder}
        error={error}
        onPress={handlePresentModalPress}
        editable={false}
        rightIcon="chevron-down"
        value={selectedLabel ? selectedLabel.toString() : null}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onDismiss={handleDismiss}
        backdropComponent={renderBackdrop}
        enableContentPanningGesture={false}
        // enablePanDownToClose={false}
        // enableHandlePanningGesture={false}
        footerComponent={renderFooter}
        containerStyle={{ padding: 16 }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 16,
                color: COLORS.dark,
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              {placeholder}
            </Text>

            {isSearchable && (
              <TextInput
                placeholder={`Cari ${label}`}
                value={searchText}
                onChangeText={handleSearch}
              />
            )}
          </View>

          <BottomSheetFlatList
            ref={listRef}
            data={filteredOptions}
            keyExtractor={(i) => i.value}
            renderItem={renderItemList}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => setTimeout(resolve, 200));
              wait.then(() => {
                listRef.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                });
              });
            }}
          />
        </View>
      </BottomSheetModal>
    </View>
  );
}
