import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { Dropdown } from "react-native-paper-dropdown";
import firestore from '@react-native-firebase/firestore';

const CustomerDetail = ({navigation, route}) =>{
    const {fullname, email, phone, address, avatar, department} = route.params;
    const [newfullname, setFullname] = useState(fullname);
    const [newemail, setEmail] = useState(email);
    const [newphone, setPhone] = useState(phone);
    const [newaddress, setAddress] = useState(address);
    const [newdepartment, setDepartment] = useState(department);
    const [departments, setDepartments] = useState([]);

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
      fetchDepartments();
    }, [email]);

    const handleUpdate = async () => {
      try {  
        await firestore().collection("USERS").doc(email).update({
          fullname: newfullname,
          email: newemail,
          department: newdepartment,
          phone: newphone,
          address: newaddress,
        });
  
        Alert.alert("Cập nhật thành công!");
        navigation.navigate("Customers");
      } catch (error) {
        console.error("Error updating profile: ", error);
        Alert.alert("Có lỗi xảy ra khi cập nhật!");
      }
    };

    return (
      <View style={{ flex: 1,}}> 
          <View style={{alignItems: "center" }}>
              <View style={styles.imageContainer}>
                  <Image
                  source={avatar ? { uri: avatar } : require("../assets/user.png")}
                  style={styles.icon}
                  />
              </View>
              <TextInput
                  label={"Họ và tên"}
                  style={styles.input}
                  value={newfullname}
                  onChangeText={setFullname}
              />
              <TextInput
                  label={"Email"}
                  style={styles.input}
                  value={newemail}
                  onChangeText={setEmail}
              />
              <TextInput
                  label={"Số điện thoại"}
                  style={styles.input}
                  value={newphone}
                  onChangeText={setPhone}
              />
              <TextInput
                  label={"Địa chỉ"}
                  style={styles.input}
                  value={newaddress}
                  onChangeText={setAddress}
              />
          </View>
          <View style={{marginStart:20, marginEnd:20}}>
              <Dropdown
                  label="Chọn phòng"
                  options={departments}
                  value={newdepartment}
                  onSelect={setDepartment}
                  mode="outlined"
              />
          </View>
          <View style={{alignItems: "center", marginTop:10 }}>
              <Button mode="contained" style={styles.button} onPress={handleUpdate}>
                  Cập nhật
              </Button>
              <Button mode="contained" style={styles.button} onPress={()=> navigation.navigate("Customers")}>
                  Quay lại
              </Button>
          </View>
      </View>
    );
  };
    
    export default CustomerDetail;
    
    const styles = StyleSheet.create({
      imageContainer: {
        position: "relative",
        width: 150,
        height: 150,
        margin: 10,
      },
      icon: {
        width: 150,
        height: 150,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 75,
      },
      input: {
        borderRadius: 10,
        width: "90%",
        margin: 5,
        borderWidth: 0.5,
        backgroundColor: "white",
      },
      button: {
        width: "90%",
        borderRadius: 10,
        margin: 5,
        backgroundColor: "#0000CD",
      },
    });
    