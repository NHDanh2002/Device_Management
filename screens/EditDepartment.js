import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const EditDepartment = ({ route, navigation }) => {
  const { id } = route.params;
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchDepartment = async () => {
      const departmentRef = firestore().collection('DEPARTMENTS').doc(id);
      const doc = await departmentRef.get();
      if (doc.exists) {
        const departmentData = doc.data();
        setName(departmentData.name);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleSave = async () => {
    const departmentRef = firestore().collection('DEPARTMENTS').doc(id);
    await departmentRef.update({ name });
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Cập nhật phòng</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        value={name}
        onChangeText={setName}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default EditDepartment;
