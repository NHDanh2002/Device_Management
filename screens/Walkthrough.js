import { ScrollView, StyleSheet, View } from "react-native"
import { Button, Divider, Text } from "react-native-paper"

const Walkthrough = ({navigation}) => {
    return (
        <ScrollView style={{margin:16,}}>
          <Text style={{ textAlign: 'center',marginBottom:20, fontSize: 30, color: '#0000CD', fontWeight: 'bold' }}>
            Hướng dẫn sử dụng
          </Text>
          <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
            Tài khoản/Đăng nhập và Đăng ký
          </Text>
          <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>Trong trường hợp đã có tài khoản:</Text>
          <Text style={{fontSize:15}}>
            - Sử dụng tài khoản đã có đó để đăng nhập vào hệ thống.
          </Text>
          <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>Trong trường hợp chưa có tài khoản:</Text>
          <Text style={{fontSize:15}}>
            - Bước 1: Đến trang Đăng ký để tạo tài khoản mới.{'\n'}
            - Bước 2: Sử dụng tài khoản vừa tạo để đăng nhập vào hệ thống.
          </Text>
          <Divider />
          <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
            Sử dụng ứng dụng - Đối với User
          </Text>
          <Text style={{fontSize:15}}>
            - Trang chủ sẽ hiện danh sách các thiết bị của người dùng đang sử dụng.{'\n'}
            - Chọn vào thiết bị cụ thể để xem chi tiết của thiết bị đó.{'\n'}
            - Nếu như thiết bị đang sử dụng bị lỗi, có thể chọn nút báo lỗi trong trang chi tiết thiết bị để báo cáo lỗi đến Admin.{'\n'}
            - Khi chọn nút báo lỗi sẽ dẫn đến trang Báo lỗi. Ở đây người dùng mô tả lỗi đang bị sau đó chọn gửi để gửi thông tin báo lỗi đến Admin.{'\n'}
            - Sau khi Admin nhận được lỗi sẽ cho người đến để sửa lỗi.
          </Text>
          <Divider />
          <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop:30}}>
            Thông tin liên lạc:
          </Text>
          <Text style={{fontSize:15}}>
            Admin: Nguyễn Hoàng Danh{'\n'}
            phone: 0968703001 -- email: danhn5907@gmail.com{'\n'}
            {'\n'}
            Kỹ thuật: Nguyễn Đỗ Hoàng Khang{'\n'}
            phone: 0326618187 -- email: hkhang@gmail.com
          </Text>
          <Divider/>
          <Button mode="contained" style={styles.button} onPress={() => navigation.navigate("Login")}>
            Trở về
          </Button>
          <Divider/>
          <Text style={{ marginVertical: 10, marginBottom:10}}>
            App được thực hiện bởi: Nhóm 7 - Đại học Thủ Dầu Một{'\n'}
            Liên hệ: 0981265423 - mchanh@gmail.com
          </Text>
        </ScrollView>
      );
    };
export default Walkthrough;
const styles = StyleSheet.create({
    button: {
      width: "90%",
      borderRadius: 10,
      margin: 20,
      backgroundColor: "#0000CD",
    },
})