import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import {TextInput} from "react-native-paper"
import firestore from '@react-native-firebase/firestore';
import { HelperText } from "react-native-paper";

const MyErrorDeviceDetail = ({ route, navigation }) => {
    const { item } = route.params;
    const [description, setDescription] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [rooms, setRooms] = React.useState([]);
    const [error, setError] = React.useState('');
    const [reportday, setReportday] = React.useState('');
    const [userreport, setUserreport] = React.useState('');
    const today = new Date();

    React.useEffect(() => {
        const ERROR_COLLECTION = firestore().collection('ERROR');
        const unsubscribe = ERROR_COLLECTION.onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                const { deviceName, description } = doc.data();
                list.push({
                    id: doc.id,
                    deviceName,
                    reportday,
                    userreport,
                    description,
                });
            });
            setRooms(list);
            if (loading) {
                setLoading(false);
            }
            setUserreport(item.userreport)
            setDescription(item.description)
        });
        return unsubscribe;
    }, [loading]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Chi tiết lỗi</Text>
                <Text style={{marginBottom:5, fontSize:16}}>Tên thiết bị</Text>
                <TextInput
                    style={[styles.inputtenphong, styles.disabledInput]}
                    value={item.deviceName}
                    editable={false}
                />
                <Text style={{marginBottom:5, fontSize:16}}>Người báo lỗi</Text>
                <TextInput
                    style={[styles.inputtenphong, styles.disabledInput]}
                    value={userreport}
                    editable={false}
                />
                <Text style={{marginBottom:5, fontSize:16}}>Ngày báo</Text>
                <TextInput
                    style={[styles.inputtenphong, styles.disabledInput]}
                    value={item.reportday}
                    editable={false}
                />
                <Text style={{marginBottom:5, fontSize:16}}>Ngày sửa</Text>
                <TextInput
                    style={[styles.inputtenphong, styles.disabledInput]}
                    value={item.fixday}
                    editable={false}
                />
                <Text style={{marginBottom:5, fontSize:16}}>Tình trạng</Text>
                <TextInput
                    style={[styles.inputtenphong, styles.disabledInput]}
                    value={item.state}
                    editable={false}
                />
                <Text style={{marginBottom:5, fontSize:16}}>Mô tả</Text>
                <TextInput
                    style={{...styles.inputmota}}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                    editable={false}
                />
                {error ? <HelperText type="error" style={{fontSize:13}}>{error}</HelperText> : null}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                        <Text style={styles.buttonText}>Trở về</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "white",
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: "center",
    },
    inputContainer: {
        marginBottom: 20,
    },
    disabledInput: {
        backgroundColor: '#f4f4f4',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputtenphong: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        backgroundColor: "white",
        marginBottom: 15,
        fontSize: 16,
        borderRadius: 5,
        paddingLeft: 10
    },
    inputmota: {
        backgroundColor: "white",
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        placeholderTextColor: "#777777",
        multiline: true,
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#21005d',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '30%',
        marginLeft: 10,
    },
    addButton: {
        backgroundColor: '#21005d',
    },
    listContainer: {
        marginTop: 20,
    },
    roomItem: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    roomName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    roomDescription: {
        fontSize: 14,
        color: '#888',
    },
});

export default MyErrorDeviceDetail;