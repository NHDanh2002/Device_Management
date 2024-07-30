import React, { useState, useEffect } from "react";
import { Alert, Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { launchImageLibrary } from "react-native-image-picker";
import { useMyContextController } from "../store";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Dropdown} from "react-native-paper-dropdown";

const UpdateProfile = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [avatar, setAvatar] = useState(""); 
  const [imageUri, setImageUri] = useState(null);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userLogin?.email) return;

      try {
        const userDoc = await firestore().collection("USERS").doc(userLogin.email).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setFullname(userData.fullname || "");
          setEmail(userData.email || "");
          setPhone(userData.phone || "");
          setAddress(userData.address || "");
          setDepartment(userData.department || "");
          setAvatar(userData.avatar || ""); 
        }
      } catch (error) {
        console.log("Error fetching user data: ", error);
      }
    };

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

    fetchUserData();
    fetchDepartments();
  }, [userLogin]);

  const handleUpdate = async () => {
    try {
      let imageUrl = avatar;

      if (imageUri) {
        const filename = email + "_profile.jpg";
        const reference = storage().ref(`profileImages/${filename}`);
        await reference.putFile(imageUri);
        imageUrl = await reference.getDownloadURL();
      }

      await firestore().collection("USERS").doc(email).update({
        fullname,
        email,
        department,
        phone,
        address,
        avatar: imageUri, 
      });

      Alert.alert("Cập nhật thành công!");
      navigation.navigate("Setting");
    } catch (error) {
      console.error("Error updating profile: ", error);
      Alert.alert("Có lỗi xảy ra khi cập nhật!");
    }
  };

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.7,
      },
      (response) => {
        if (response.didCancel) {
          console.log("Người dùng đã huỷ chọn hình ảnh");
        } else if (response.errorCode) {
          console.log("Lỗi khi chọn hình ảnh: ", response.errorMessage);
        } else {
          const uri = response.assets[0].uri;
          setImageUri(uri);
        }
      }
    );
  };

  return (
    <View style={{ flex: 1,}}> 
        <View style={{alignItems: "center" }}>
            <View style={styles.imageContainer}>
                <Image
                source={imageUri ? { uri: imageUri } : avatar ? { uri: avatar } : require("../assets/user.png")}
                style={styles.icon}
                />
                <TouchableOpacity style={styles.imagePickerIcon} onPress={selectImage}>
                <Icon name="camera-alt" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            <TextInput
                label={"Họ và tên"}
                style={styles.input}
                value={fullname}
                onChangeText={setFullname}
            />
            <TextInput
                label={"Email"}
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                label={"Số điện thoại"}
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                label={"Địa chỉ"}
                style={styles.input}
                value={address}
                onChangeText={setAddress}
            />
        </View>
        <View style={{marginStart:20, marginEnd:20}}>
            <Dropdown
                label="Chọn phòng"
                options={departments}
                value={department}
                onSelect={setDepartment}
                mode="outlined"
            />
        </View>
        <View style={{alignItems: "center", marginTop:10 }}>
            <Button mode="contained" style={styles.button} onPress={handleUpdate}>
                Cập nhật
            </Button>
            <Button mode="contained" style={styles.button} onPress={()=> navigation.navigate("Setting")}>
                Quay lại
            </Button>
        </View>
    </View>
  );
};

export default UpdateProfile;

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
  imagePickerIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0000CD",
    borderRadius: 15,
    padding: 5,
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
