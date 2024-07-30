import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const AddDepartment = ({ navigation }) => {
  const [name, setName] = useState('');

  const handleAdd = async () => {
    if (name.trim() === '') {
      alert('Vui lòng nhập tên phòng');
      return;
    }
    await firestore().collection('DEPARTMENTS').add({
      name,
    });
    setName('');
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20, }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Thêm một phòng mới</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        value={name}
        onChangeText={setName}
        placeholder="Nhập tên phòng"
      />
      <View style={{flexDirection:'row', justifyContent:'center'}}>
        <Button mode='contained' onPress={handleAdd} style={styles.button}>
            Thêm phòng
        </Button>
        <Button mode='contained' onPress={()=> navigation.goBack()} style={styles.button}>
            Hủy
        </Button>
      </View>
    </View>
  );
};

export default AddDepartment;

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#0000CD',
        margin:5
    }
})
