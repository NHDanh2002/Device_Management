import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';

const MyDetailDevices = ({ route, navigation }) => {
  const { deviceId } = route.params;
  const [device, setDevice] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [departments, setDepartments] = useState([]);
  const [user, setUser] = useState('');  
  const [users, setUsers] = useState('');  
  const [specifications, setSpecifications] = useState({});
  const [note, setNote] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
        try {
          const snapshot = await firestore().collection("DEPARTMENTS").get();
          const deptList = snapshot.docs.map(doc => ({
            label: doc.data().name,
            value: doc.data().name,
          }));
          setDepartments(deptList);
        } catch (error) {
          console.log("Error fetching departments: ", error);
        }
    };
    const fetchUsers = async () => {
        try {
          const snapshot = await firestore().collection("USERS").get();
          const userList = snapshot.docs.map(doc => ({
            label: doc.data().fullname,
            value: doc.data().fullname,
          }));
          setUsers(userList);
        } catch (error) {
          console.log("Error fetching users: ", error);
        }
      };
    fetchDepartments();
    fetchUsers();
    fetchDevice();
  }, [deviceId]);

  const fetchDevice = async () => {
    try {
      const doc = await firestore().collection('DEVICES').doc(deviceId).get();
      if (doc.exists) {
        const deviceData = doc.data();
        setDevice(deviceData);
        setName(deviceData.name);
        setType(deviceData.type);
        setDepartmentName(deviceData.departmentName);
        setUser(deviceData.user || '');
        setSpecifications(deviceData.specifications || {});
        setNote(deviceData.note || '');
      } else {
        console.log('Không có dữ liệu!');
      }
    } catch (error) {
      console.error('Error fetching device: ', error);
    }
  };

  const handleSave = async () => {
    try {
      await firestore().collection('DEVICES').doc(deviceId).update({
        name,
        type,
        departmentName,
        user,
        specifications,
        note
      });
      Alert.alert('Thông báo', 'Cập nhật thành công');
      fetchDevice();
      setIsEditing(false);
    } catch (error) {
      console.error('Lỗi cập nhật: ', error);
      Alert.alert('Thông báo', 'Cập nhật thất bại');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchDevice();
  };

  const handleSpecificationChange = (key, value) => {
    setSpecifications(prevSpecs => ({
      ...prevSpecs,
      [key]: value
    }));
  };

  if (!device) {
    return <Text>Đang tải...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Cập nhật thiết bị' : 'Chi tiết thiết bị'}</Text>
      <Text style={styles.label}>Tên thiết bị:</Text>
      <Text style={styles.value}>{device.name}</Text>
      <Text style={styles.label}>Loại thiết bị:</Text>
      <Text style={styles.value}>{device.type}</Text>
      <Text style={styles.label}>Phòng:</Text>
      <Text style={styles.value}>{departmentName || 'No department assigned'}</Text>
      <Text style={styles.label}>Người dùng:</Text>
      <Text style={styles.value}>{device.user}</Text>
      <Text style={styles.label}>Thông số kỹ thuật:</Text>
        <View style={styles.specificationsContainer}>
          {Object.entries(device.specifications || {}).length > 0 ? (
            Object.entries(device.specifications).map(([key, value]) => (
              <View key={key} style={styles.specificationItem}>
                <Text style={styles.specificationKey}>{key}:</Text>
                <Text style={styles.specificationValue}>{value}</Text>
              </View>
            ))
          ) : (
            <Text>Không có thông số kỹ thuật</Text>
          )}
        </View>
      <Text style={styles.label}>Ghi chú:</Text>
      <Text style={styles.value}>{device.note}</Text>
      <View style={styles.buttonContainer}>
        <Button mode='contained' onPress={()=> navigation.navigate("Error", {device})} style={styles.button}>
            Báo lỗi
        </Button>
        <Button mode='contained' style={styles.button} onPress={()=> navigation.navigate("MyDevices", {departmentName})}>
            Trở về
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center',
    color:"#0000CD"
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  multilineInput: {
    height: 100,
  },
  specificationsContainer: {
    marginVertical: 10,
  },
  specificationContainer: {
    marginBottom: 5,
    marginTop: 5,
    marginStart:10
  },
  specificationLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  specificationItem: {
    flexDirection: 'row',
    marginBottom: 5,
    marginStart:10
  },
  specificationKey: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  specificationValue: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 50,
  },
  button:{
    backgroundColor:'#0000CD',
    margin:5
}
});

export default MyDetailDevices;
