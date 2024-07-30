import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Button } from 'react-native-paper';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { captureRef } from 'react-native-view-shot';
import { Dropdown } from 'react-native-paper-dropdown';

const firebaseConfig = {
  apiKey: 'AIzaSyApBWUABXIusWxrlvdBt9ttvTd0uSISTQY',
  projectId: 'device-management-43211',
  storageBucket: 'device-management-43211.appspot.com',
  appId: 'com.device_management',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AddDevice = ({ route = { params: {} }, navigation }) => {
  const { departmentName } = route.params;
  const [deviceName, setDeviceName] = useState('');
  const [deviceUser, setDeviceUser] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [users, setUsers] = useState([]);
  const [deviceSpecs, setDeviceSpecs] = useState({});
  const [deviceNotes, setDeviceNotes] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [qrData, setQRData] = useState(null);
  const qrRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [deviceTypes, setDeviceTypes] = useState([])

  const handleAddSpecification = () => {
    if (newSpecKey && newSpecValue) {
      setDeviceSpecs((prevSpecs) => ({
        ...prevSpecs,
        [newSpecKey]: newSpecValue,
      }));
      setNewSpecKey('');
      setNewSpecValue('');
    } else {
      Alert.alert('Error', 'Both key and value for the specification are required.');
    }
  };

  useEffect(() => {
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
      const fetchDeviceTypes = async () => {
        try {
          const snapshot = await firestore().collection("DEVICETYPE").get();
          const typeList = snapshot.docs.map(doc => ({
            label: doc.data().name,
            value: doc.data().name,
          }));
          setDeviceTypes(typeList);
        } catch (error) {
          console.log("Error fetching users: ", error);
        }
      };
    fetchUsers();
    fetchDeviceTypes();
  }, [departmentName]);  

  const handleGenerateQR = async () => {
    if (deviceName && deviceUser && deviceType && Object.keys(deviceSpecs).length > 0 && deviceNotes) {
      setLoading(true);
      const deviceInfoURL = `https://book92.github.io/QRTest/deviceinfo.html?deviceName=${encodeURIComponent(deviceName)}&deviceUser=${encodeURIComponent(deviceUser)}&deviceType=${encodeURIComponent(deviceType)}&deviceNotes=${encodeURIComponent(deviceNotes)}&deviceSpecs=${encodeURIComponent(JSON.stringify(deviceSpecs))}&departmentName=${encodeURIComponent(departmentName)}`;
      setQRData(deviceInfoURL);

      setTimeout(async () => {
        if (qrRef.current) {
          try {
            const uri = await captureRef(qrRef.current, {
              format: 'png',
              quality: 1.0
            });

            const refImage = storage().ref('/QR/' + deviceName + '.png');
            await refImage.putFile(uri);
            const link = await refImage.getDownloadURL();

            console.log('Saving device:', {
              name: deviceName,
              departmentName,
              user: deviceUser,
              type: deviceType,
              specifications: deviceSpecs,
              note: deviceNotes,
              image: link
            });

            firestore().collection('DEVICES').add({
              name: deviceName,
              departmentName,
              user: deviceUser,
              type: deviceType,
              specifications: deviceSpecs,
              note: deviceNotes,
              image: link
            })
            .then(response => {
              firestore().collection('DEVICES').doc(response.id).update({ id: response.id });
              Alert.alert('Thêm thiết bị mới thành công');
              navigation.goBack();
            })
            .catch(e => {
              console.error('Thêm thiết bị mới gặp lỗi:', e);
              Alert.alert('Thêm thiết bị mới không thành công');
            });
          } catch (e) {
            console.error('Upload QR lỗi:', e);
            Alert.alert('Thông báo', 'Upload QR code thất bại');
          } finally {
            setLoading(false);
          }
        }
      }, 1000);
    } else {
      Alert.alert('Thông báo', 'Cần nhập hết các trường');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{fontSize: 30, textAlign:'center', fontWeight: 'bold'}}>Thêm thiết bị</Text>
      <Text style={styles.label}>Tên thiết bị</Text>
      <TextInput
        style={styles.input}
        value={deviceName}
        onChangeText={setDeviceName}
        placeholder="Nhập tên thiết bị"
      />
      <Text style={styles.label}>Người dùng</Text>
      <Dropdown
        options={users}
        value={deviceUser}
        onSelect={setDeviceUser}
        mode="outlined"
      />
      <Text style={styles.label}>Loại thiết bị</Text>
      <Dropdown
        options={deviceTypes}
        value={deviceType}
        onSelect={setDeviceType}
        mode="outlined"
      />
      <Text style={styles.label}>Thông số kỹ thuật</Text>
      {Object.keys(deviceSpecs).map((key) => (
        <View key={key} style={styles.specContainer}>
          <Text style={styles.specText}>{key}: {deviceSpecs[key]}</Text>
        </View>
      ))}
      <View style={styles.specInputContainer}>
        <TextInput
          style={styles.specInput}
          value={newSpecKey}
          onChangeText={setNewSpecKey}
          placeholder="Thông số"
        />
        <TextInput
          style={styles.specInput}
          value={newSpecValue}
          onChangeText={setNewSpecValue}
          placeholder="Nhập thông số"
        />
        <Button mode='contained' onPress={handleAddSpecification}>
          Thêm
        </Button>
      </View>
      <Text style={styles.label}>Ghi chú</Text>
      <TextInput
        style={styles.input}
        value={deviceNotes}
        onChangeText={setDeviceNotes}
        placeholder="Nhập ghi chú"
        multiline
      />
      <Button mode='contained' style={{marginBottom:10}} onPress={handleGenerateQR}>
        Tạo thiết bị
      </Button>
      <Button mode='contained' style={{marginBottom:40}} onPress={()=> navigation.goBack()}>
        Hủy
      </Button>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {qrData && (
        <View style={styles.qrContainer} collapsable={false} ref={qrRef}>
          <Text>Scan this QR code:</Text>
          <QRCode value={qrData} size={200} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    marginTop:10
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  specContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  specText: {
    fontSize: 16,
  },
  specInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  specInput: {
    flex: 1,
    marginRight: 10,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  qrContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddDevice;
