import { View } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInput from './TextInput';

export default function DateInput({
  value = '2001-01-01',
  onChange,
  label,
  required,
  style,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={[{ width: '100%', position: 'relative' }, style]}>
      <TextInput
        label={label}
        required={required}
        onPress={() => setShowDatePicker(!showDatePicker)}
        value={new Date(value).toLocaleDateString()}
        editable={false}
      />

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(value)}
          mode="date"
          is24Hour
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            console.log(selectedDate);
            const offset = selectedDate.getTimezoneOffset();
            selectedDate = new Date(
              selectedDate.getTime() - offset * 60 * 1000,
            );
            onChange(selectedDate.toISOString().split('T')[0]);
          }}
        />
      )}
    </View>
  );
}
