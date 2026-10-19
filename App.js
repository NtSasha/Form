
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default function App() {
  const initialForm = {
    name: '',
    email: '',
    password: '',
    age: '',
    phone: '',
    address: '',
    comments: '',
    gender: '',
    country: 'Rwanda',
    notifications: false,
    experience: 'Beginner',
    rating: 5,
    agreed: false,
  };

  const [form, setForm] = useState(initialForm);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null);

  const updateForm = (key, value) => {
    setForm(previous => ({
      ...previous,
      [key]: value,
    }));
  };

  const chooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const chooseDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});

    if (!result.canceled) {
      setDocument(result.assets[0].name);
    }
  };

  const submitForm = () => {
    if (!form.name.trim()) {
      Alert.alert('Required field', 'Please enter your name.');
      return;
    }

    const submittedData = {
      ...form,
      date: date.toLocaleDateString(),
      time: time.toLocaleTimeString(),
      image: image ? 'Image selected' : 'No image selected',
      document: document || 'No document selected',
    };

    console.log('========== FORM SUBMISSION ==========');
    console.log(JSON.stringify(submittedData, null, 2));
    console.log('=====================================');

    Alert.alert(
      'Success',
      'Form submitted. Check your Expo terminal for the data.'
    );
  };

  const resetForm = () => {
    setForm(initialForm);
    setDate(new Date());
    setTime(new Date());
    setImage(null);
    setDocument(null);
    setShowDate(false);
    setShowTime(false);
  };

  const RadioOption = ({ label, value }) => (
    <Pressable
      style={styles.option}
      onPress={() => updateForm('gender', value)}
    >
      <View style={styles.radio}>
        {form.gender === value && <View style={styles.radioSelected} />}
      </View>
      <Text>{label}</Text>
    </Pressable>
  );

  const CheckOption = ({ label }) => (
    <Pressable
      style={styles.option}
      onPress={() => updateForm('agreed', !form.agreed)}
    >
      <View style={styles.checkbox}>
        {form.agreed && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text>{label}</Text>
    </Pressable>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>React Native Form Elements</Text>
      <Text style={styles.subtitle}>
        Complete the form and submit it to view the data in your terminal.
      </Text>

      <Text style={styles.section}>1. Text Inputs</Text>

      <Text style={styles.label}>Full Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={value => updateForm('name', value)}
      />

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={value => updateForm('email', value)}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={form.password}
        onChangeText={value => updateForm('password', value)}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        keyboardType="numeric"
        value={form.age}
        onChangeText={value => updateForm('age', value)}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={value => updateForm('phone', value)}
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={form.address}
        onChangeText={value => updateForm('address', value)}
      />

      <Text style={styles.label}>Additional Comments</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Write your comments here"
        multiline
        numberOfLines={4}
        value={form.comments}
        onChangeText={value => updateForm('comments', value)}
      />

      <Text style={styles.section}>2. Radio Buttons</Text>
      <Text style={styles.label}>Gender</Text>
      <View style={styles.options}>
        <RadioOption label="Female" value="Female" />
        <RadioOption label="Male" value="Male" />
        <RadioOption label="Prefer not to say" value="Not specified" />
      </View>

      <Text style={styles.section}>3. Checkbox</Text>
      <CheckOption label="I agree to the terms and conditions" />

      <Text style={styles.section}>4. Dropdown / Picker</Text>
      <Text style={styles.label}>Country</Text>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={form.country}
          onValueChange={value => updateForm('country', value)}
        >
          <Picker.Item label="Rwanda" value="Rwanda" />
          <Picker.Item label="Kenya" value="Kenya" />
          <Picker.Item label="Uganda" value="Uganda" />
          <Picker.Item label="Tanzania" value="Tanzania" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.section}>5. Switch / Toggle</Text>
      <View style={styles.switchRow}>
        <Text style={styles.label}>Enable notifications</Text>
        <Switch
          value={form.notifications}
          onValueChange={value => updateForm('notifications', value)}
        />
      </View>

      <Text style={styles.section}>6. Segmented Control</Text>
      <Text style={styles.label}>Programming Experience</Text>
      <View style={styles.segmentRow}>
        {['Beginner', 'Intermediate', 'Advanced'].map(item => (
          <Pressable
            key={item}
            style={[
              styles.segment,
              form.experience === item && styles.segmentActive,
            ]}
            onPress={() => updateForm('experience', item)}
          >
            <Text
              style={[
                styles.segmentText,
                form.experience === item && styles.segmentTextActive,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.section}>7. Slider</Text>
      <Text style={styles.label}>Rate your experience: {form.rating}/10</Text>
      <Slider
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={form.rating}
        onValueChange={value => updateForm('rating', value)}
      />

      <Text style={styles.section}>8. Date Picker</Text>
      <Text style={styles.label}>Select a date</Text>
      <Button title="Choose Date" onPress={() => setShowDate(true)} />
      <Text style={styles.result}>{date.toLocaleDateString()}</Text>

      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(event, selectedDate) => {
            setShowDate(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.section}>9. Time Picker</Text>
      <Button title="Choose Time" onPress={() => setShowTime(true)} />
      <Text style={styles.result}>{time.toLocaleTimeString()}</Text>

      {showTime && (
        <DateTimePicker
          value={time}
          mode="time"
          onChange={(event, selectedTime) => {
            setShowTime(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}

      <Text style={styles.section}>10. Image Picker</Text>
      <Button title="Choose Image" onPress={chooseImage} />
      <Text style={styles.result}>
        {image ? 'Image selected' : 'No image selected'}
      </Text>

      <Text style={styles.section}>11. File Picker</Text>
      <Button title="Choose Document" onPress={chooseDocument} />
      <Text style={styles.result}>
        {document || 'No document selected'}
      </Text>

      <View style={styles.buttons}>
        <Button title="Submit Form" onPress={submitForm} />
        <View style={styles.buttonGap} />
        <Button title="Reset Form" color="#B42318" onPress={resetForm} />
      </View>

      <Text style={styles.footer}>
        Submitted values will appear in the terminal running Expo.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  content: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#172554',
    marginTop: 25,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginTop: 25,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10,
    color: '#334155',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  options: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 5,
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  pickerBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  segmentRow: {
    flexDirection: 'row',
    gap: 6,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  segmentActive: {
    backgroundColor: '#1D4ED8',
    borderColor: '#1D4ED8',
  },
  segmentText: {
    fontSize: 12,
    color: '#334155',
  },
  segmentTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  result: {
    color: '#475569',
    marginTop: 10,
  },
  buttons: {
    marginTop: 30,
  },
  buttonGap: {
    height: 15,
  },
  footer: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 25,
    fontSize: 12,
  },
});
