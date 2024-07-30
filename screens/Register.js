import { Alert, ScrollView, StyleSheet, View } from "react-native"
import { Button, HelperText, Text, TextInput } from "react-native-paper"
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { CreateAccount, useMyContextController } from "../store";
import { Dropdown } from "react-native-paper-dropdown";

const Register = ({navigation}) =>{
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, SetPasswordConfirm] = useState("")
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const [department, setDepartment] = useState("");
    const [departments, setDepartments] = useState([]);
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const hasErrorFullname = () => fullname == ""
    const hasErrorEmail = () => !email.includes("@")
    const hasErrorPassword = () => password.length < 6
    const hasErrorPasswordConfirm = () => passwordConfirm != password
    const righticon = <TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)}/>
    
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
    }, [userLogin]);

    return(
        <ScrollView style={styles.container}>
            <View style={{alignItems:'center'}}>
                <Text style={styles.text}>
                    Tạo tài khoản mới
                </Text>
                <TextInput 
                    label={"Full Name"} 
                    style={styles.input}
                    value={fullname}
                    onChangeText={setFullname}
                />
                <HelperText type="error" visible={hasErrorFullname()}>
                    Full Name không được phép để trống
                </HelperText>
                <TextInput 
                    label={"Email"} 
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <HelperText type="error" visible={hasErrorEmail()}>
                    Địa chỉ email không hợp lệ
                </HelperText>
                <TextInput
                    label={"Password"}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input} 
                    secureTextEntry = {hiddenPassword}
                    right={righticon}
                />
                <HelperText type="error" visible={hasErrorPassword()}>
                    Password phải có ít nhất 6 kí tự
                </HelperText>
                <TextInput
                    label={"Comfirm Password"}
                    value={passwordConfirm}
                    onChangeText={SetPasswordConfirm}
                    style={styles.input} 
                    secureTextEntry = {hiddenPassword}
                    right={righticon}
                />
                <HelperText type="error" visible={hasErrorPasswordConfirm()}>
                    Password không khớp
                </HelperText>
                <TextInput 
                    label={"Address"} 
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                />
                <HelperText type="error" visible={true}>
                </HelperText>
                <TextInput 
                    label={"Phone"} 
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                />
                <HelperText type="error" visible={true}>
                </HelperText>
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
            <View style={{alignItems:'center'}}>
                <Button mode="contained" style={styles.button} onPress={() => CreateAccount(fullname, email, password, phone, address, department)}>
                    Tạo tài khoản
                </Button>
            </View>
            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                <Text>Bạn đã có tài khoản rồi</Text>
                <Button onPress={()=> navigation.navigate("Login")}>
                    Đăng nhập
                </Button>
            </View>
        </ScrollView>
    )
}
export default Register
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    text: {
        textAlign: 'center',
        fontSize:20, 
        fontWeight:'bold', 
        color:"#0000CD",
        marginTop:10,
    },
    input: {
        borderRadius: 10,
        width: '90%',
        marginTop: 5,
        borderWidth: 0.5,
    },
    button: {
        backgroundColor: "#0000CD",
        width: '90%',
        borderRadius: 10,
        justifyContent:'center',
        marginTop: 5,
    },
    textbutton: {
        fontSize: 20,
        color: "white",
    }
})