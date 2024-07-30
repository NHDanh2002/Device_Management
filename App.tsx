import Router from "./routers/Router"
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useEffect } from "react";
import { MyContextControllerProvider } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from 'react-native-paper';

const App = () =>{
  const USERS = firestore().collection("USERS")
  const admin = {
    fullname: "Nguyễn Hoàng Danh",
    email: "admin@gmail.com",
    password: "1234567",
    phone: "0913214555",
    address: "Bình Dương",
    role: "admin",
    department : "Kỹ thuật",
    note: ""
  }
  useEffect(() => {
    USERS.doc(admin.email)
    .onSnapshot(
      u => {
        if(!u.exists)
        {
          auth().createUserWithEmailAndPassword(admin.email, admin.password)
          .then(() => 
            {
              USERS.doc(admin.email).set(admin)
              console.log("Add new account admin")
            }
          )
        }
      }
    )
  })
  return(
    <MyContextControllerProvider>
      <NavigationContainer>
        <PaperProvider>
          <Router/>
        </PaperProvider>
      </NavigationContainer>
    </MyContextControllerProvider>
  )
}
export default App;