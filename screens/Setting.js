import { useEffect, useState } from "react";
import { logout, useMyContextController } from "../store";
import { Image, StyleSheet, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";

const Setting = ({navigation}) => {
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const [fullname, setFullname] = useState(userLogin?.fullname || '');
    const [email, setEmail] = useState(userLogin?.email || '');
    const [department, setDepartment] = useState(userLogin?.department || '');
    const [phone, setPhone] = useState(userLogin?.phone || '');
    const [address, setAddress] = useState(userLogin?.address || '');
    const [avatar, setAvatar] = useState(userLogin?.avatar || '');
    const handleLogout = () => {
        logout(dispatch);
        navigation.navigate("Login");
    }
    useEffect(() => {
        if (!userLogin) {
            navigation.navigate("Login");
        }
        else{
            setFullname(userLogin.fullname || '');
            setEmail(userLogin.email || '');
            setPhone(userLogin.phone || '');
            setAddress(userLogin.address || '');
            setDepartment(userLogin.department || '');
            setAvatar(userLogin.avatar || '');
        }
    }, [userLogin]);
    return(
        <View style={{flex: 1, backgroundColor:"white"}}>
            <View style={{flex:1,justifyContent:"center", alignItems: "center", marginBottom:50}}>
                <Image
                    source={avatar ? { uri: avatar } : require("../assets/user.png")}
                    style={styles.icon}
                />
            </View>
            <Divider/>
            <View style={{marginStart: 38}}>
                <Text style={styles.text}>
                    Họ và tên: {fullname}
                </Text>
                <Text style={styles.text}>
                    Phòng: {department}
                </Text>
                <Text style={styles.text}>
                    Email: {email}
                </Text>
                <Text style={styles.text}>
                    Liên hệ: {phone}
                </Text>
                <Text style={styles.text}>
                    Địa chỉ: {address}
                </Text>
            </View>
            <View style={{flex:1,justifyContent:"center", alignItems: "center"}}>
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={()=> navigation.navigate("UpdateProfile")}
                >
                    Cập nhật thông tin
                </Button>
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={handleLogout}
                >
                    Đăng xuất
                </Button>
            </View>
        </View>
    )
}
export default Setting
const styles = StyleSheet.create({
    icon: {
      width: 150,
      height: 150,
      borderWidth:2,
      borderColor: 'black',
      borderRadius:75
    },
    text: {
        fontSize: 20,
        margin:5,
        fontWeight: "bold"
    },
    button: {
        width: "80%",
        borderRadius: 10,
        margin: 5,
        backgroundColor: "#0000CD"
    }
});