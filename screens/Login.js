import { Image, StyleSheet, Text, View } from "react-native"
import { Button, HelperText, TextInput } from "react-native-paper";
import { login, useMyContextController } from "../store";
import { useEffect, useState } from "react";

const Login = ({navigation}) => {
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const hasErrorEmail = ()=> !email.includes("@")
    const hasErrorPassword = ()=> password.length < 6
    const handleLogin = () =>{
        login(dispatch, email, password)
    }
    useEffect(()=> {
        console.log(userLogin)
        if(userLogin!=null)
        {
            if(userLogin.role === "admin")
                navigation.navigate("Admin")
            else if(userLogin.role === "user")
                navigation.navigate("User")
        }
    }, [userLogin])
    const righticon = <TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)}/>
    return(
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')}
                style={{
                    alignSelf: 'center',
                    height:"30%",
                    width:"50%"
                }}
            />
            <Text style={styles.text}>
                Login
            </Text>
            <TextInput 
                label={"email"} 
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <HelperText type="error" visible={hasErrorEmail()} style={{textAlign:"right"}}>
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
            <Button style={styles.button} onPress={handleLogin}>
                <Text style={styles.textbutton}>
                    Login
                </Text>
            </Button>
            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                <Text>Bạn đã có tài khoản chưa?</Text>
                <Button onPress={()=> navigation.navigate("Register")}>
                    Tạo tài khoản mới
                </Button>
            </View>
            <Button onPress={() => navigation.navigate("ForgotPass")}>
                Quên mật khẩu
            </Button>
            <Button style={{marginTop:20}} onPress={() => navigation.navigate("Walkthrough")}>
                Xem hướng dẫn sử dụng
            </Button>
        </View>
    )
}
export default Login;
const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize:40, 
        fontWeight:'bold', 
        color:"#0000CD",
        marginBottom: 10
    },
    input: {
        borderRadius: 10,
        width: '90%',
        margin: 5,
        borderWidth: 0.5,
    },
    button: {
        backgroundColor: "#0000CD",
        width: '90%',
        height: '7%',
        borderRadius: 10,
        justifyContent:'center',
        marginTop: 10,
    },
    textbutton: {
        fontSize: 20,
        color: "white",
    }
})