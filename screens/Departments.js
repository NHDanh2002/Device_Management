import React, { useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity, Alert } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Department = ({ name, onPress, onEdit, onDelete }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, borderWidth: 0.5, padding: 15, margin: 10 }}>
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      <Text style={{ fontSize: 20 }}>{name}</Text>
    </TouchableOpacity>
    <IconButton
      icon="pencil"
      style={{borderWidth:1}}
      size={24}
      onPress={onEdit}
    />
    <IconButton
      icon="delete"
      style={{borderWidth:1}}
      size={24}
      onPress={onDelete}
    />
  </View>
);

const Departments = ({ navigation }) => {
  const [departments, setDepartments] = useState([]);
  const DEPARTMENTS = firestore().collection('DEPARTMENTS');

  useEffect(() => {
    const unsubscribe = DEPARTMENTS.onSnapshot((querySnapshot) => {
      const departmentlist = [];
      querySnapshot.forEach((doc) => {
        const { name } = doc.data();
        departmentlist.push({
          id: doc.id,
          name,
        });
      });
      setDepartments(departmentlist);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (id) => {
    navigation.navigate('EditDepartment', { id });
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Xóa phòng',
      'Bạn chắc chắn muốn xóa phòng này chứ?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore().collection('DEPARTMENTS').doc(id).delete();
              Alert.alert('Thông báo', 'Xóa phòng thành công');
            } catch (error) {
              Alert.alert('Thông báo', 'xóa phòng thất bại');
            }
          },
        },
      ]
    );
  };

  const handleSelectDepartment = (name, id) => {
    navigation.navigate('Devices', { departmentName: name, departmentId: id });
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: 'bold',
            marginLeft: 6,
          }}
        >
          Thêm phòng mới
        </Text>
        <IconButton
          icon="plus-circle"
          iconColor="#0000CD"
          size={35}
          onPress={() => navigation.navigate('AddDepartment')}
        />
      </View>
      <FlatList
        data={departments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Department
            name={item.name}
            onPress={() => handleSelectDepartment(item.name, item.id)}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
    </View>
  );
};

export default Departments;
