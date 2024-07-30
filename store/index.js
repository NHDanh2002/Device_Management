import { Children, createContext, useContext, useMemo, useReducer} from 'react';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native"

const MyContext = createContext()
MyContext.displayName = "vbdvabv"

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return {...state, userLogin: action.value}
        case "LOGOUT":
            return {...state, userLogin: null}
        default:
            return new Error("Action not found")
            break;
    }
}

const MyContextControllerProvider = ({ children }) => {
    const initialState = {
        userLogin: null,
        services: [],
    }
    const [controller, dispatch] = useReducer(reducer, initialState)

    const value = useMemo(() => [controller, dispatch], [controller,dispatch])
    return(
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}

const useMyContextController = ()=> {
    const context = useContext(MyContext)
    if(context == null)
        return new Error("useMyContextController must inside in MyContextControllerProvider")
    return context
}

const USERS = firestore().collection("USERS")
const CreateAccount = (fullname, email, password, phone, address, department)=>{
    auth().createUserWithEmailAndPassword(email,password)
    .then(()  => {
        Alert.alert("Create email success with email: " + email)
        USERS.doc(email)
        .set(
                {
                    fullname,
                    email,
                    password,
                    phone,
                    address,
                    department,
                    role: "user",
                    note: "",
                    avatar: ""
                }
            )
    })
    //.catch(e => Alert.alert("Tài khoản đã tồn tại"))
}

const login = (dispatch, email, password) => {
    auth().signInWithEmailAndPassword(email,password)
    .then(() =>
        USERS.doc(email)
        .onSnapshot(
            u => dispatch({type: "USER_LOGIN", value: u.data()})
        )
    )
    .catch(e => Alert.alert("Sai email hoặc password"))
}
const logout = (dispatch) => {
    auth().signOut()
    .then(() => dispatch({type: "LOGOUT"}))
}

export {
    MyContextControllerProvider,
    useMyContextController,
    CreateAccount,
    login,
    logout,
}

/*import { Children, createContext, useContext, useMemo, useReducer} from 'react';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

const MyContext = createContext();
MyContext.displayName = "MyAppContext";

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, userLogin: action.value };
        case "LOGOUT":
            return { ...state, userLogin: null };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const MyContextControllerProvider = ({ children }) => {
    const initialState = {
        userLogin: null,
        services: [],
    };
    const [controller, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
}

const useMyContextController = () => {
    const context = useContext(MyContext);
    if (context === undefined) {
        throw new Error("useMyContextController must be used within a MyContextControllerProvider");
    }
    return context;
}

const USERS = firestore().collection("USERS");

const CreateAccount = async (fullname, email, password, phone, address) => {
    const navigation = useNavigation();

    try {
        await auth().createUserWithEmailAndPassword(email, password);
        await USERS.doc(email).set({
            fullname,
            email,
            password,
            phone,
            address,
            role: "customer"
        });
        Alert.alert("Create email success with email: " + email);
        navigation.navigate("Login");
    } catch (error) {
        Alert.alert("Account creation failed", error.message);
    }
}

const login = async (dispatch, email, password) => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
        USERS.doc(email).onSnapshot(
            doc => {
                if (doc.exists) {
                    dispatch({ type: "USER_LOGIN", value: doc.data() });
                } else {
                    Alert.alert("User data not found");
                }
            }
        );
    } catch (error) {
        Alert.alert("Login failed", error.message);
    }
}

const logout = async (dispatch) => {
    try {
        await auth().signOut();
        dispatch({ type: "LOGOUT" });
    } catch (error) {
        Alert.alert("Logout failed", error.message);
    }
}

export {
    MyContextControllerProvider,
    useMyContextController,
    CreateAccount,
    login,
    logout,
};*/

