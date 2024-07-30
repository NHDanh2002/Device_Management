import {Alert, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import React from 'react';
import auth from '@react-native-firebase/auth';

const ForgotPass = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const handlResetPass = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Đã gửi email'))
      .catch(e => Alert.alert(e.message));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerName}>Quên Mật Khẩu</Text>
      <View style={{backgroundColor: '#fff', height: 40, }}>
        <TextInput
          style={styles.textInput}
          label={'Email'}
          value={email}
          onChangeText={setEmail}
          underlineColor="transparent"
          underlineStyle={0}
        />
      </View>
      <Button style={styles.button} mode="contained" onPress={handlResetPass}>
        Gửi Email
      </Button>
      <View style={{flexDirection: 'column'}}>
        <Button onPress={() => navigation.navigate('Login')}>Trở về</Button>
      </View>
    </View>
  );
};
export default ForgotPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E1E0FF',
    padding: 30,
  },
  headerName: {
    alignSelf: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },

  textInput: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },

  button: {
    borderRadius: 8,
    marginTop: 20,
    padding: 5,
    backgroundColor: '#507FF9',
  },
});