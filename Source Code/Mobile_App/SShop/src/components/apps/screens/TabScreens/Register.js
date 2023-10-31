import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ToastAndroid, Alert, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react';
import back from '../../../back/back';
import { AppContext } from '../../AppContext';

import ProgressDialog from 'react-native-progress-dialog';

const Register = (props) => {
  const { navigation } = props;
  const { onRegister, onSendOtp } = useContext(AppContext);
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [checkOtp, setCheckOtp] = useState();
  
  const [isLoading, setIsLoading] = useState(false);

  const [isShowPassword, setIsShowPassword] = useState(true);
  //const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
  const image = 'https://api-private.atlassian.com/users/f3ba6e3feb7b6867012f05b2f873affb/avatar';

  back(navigation);

  const handleRegister = async () => {
  
    //kiểm tra toàn bộ fields ko đc null
    if (!email || !password || !name || !otp || !phone || !address) {      
      Alert.alert('Please fill all the fields !');
      return;
    };

    //kiểm tra email valid
    const patternEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const checkEmail = patternEmail.test(email);
    if (!checkEmail) {
      ToastAndroid.show('Email is not valid !', ToastAndroid.LONG);
      return;
    }
    
    //kiểm tra độ dài password
    if(password.length < 6){
      Alert.alert('Password must be at least 6 characters !');
      return;
    }
    //kiểm tra độ dài name
    if(name.length < 6){
      Alert.alert('Name must be at least 6 characters !');
      return;
    }
    //kiểm tra độ dài address
    if(address.length < 6){
        Alert.alert('Address must be at least 6 characters !');
        return;
    }
    //kiểm tra độ dài otp
    if(otp.length < 6 || otp.length > 6){
        Alert.alert('OTP code must be exact 6 number digits !');
        return;
    }

    //kiểm tra otp code valid     
    if(!checkOtp){      
        Alert.alert('Must get OTP first !');
        return;
    }
    if(checkOtp != otp){
        Alert.alert('OTP code not correct ! Please check otp code again.');
        return;
    }

    const patternPhone = /(0)[0-9]{9}/;
    const checkPhone = patternPhone.test(phone);
    if(!checkPhone){
        ToastAndroid.show('Phone is not valid !', ToastAndroid.LONG);
        return;
    }
    if(phone.length < 10){
        Alert.alert('Phone must be at least 10 number digits !');
        return;
    }
    
    setIsLoading(true);
    
    //hàm onRegister sẽ return về 1 message thì sẽ là thành công, nếu ko thì return false tức là đăng ký ko thành công
    const user = await onRegister(email, password, name, true, true, image, address, phone, new Date().getDate(), ["USER"]);  
    
    if (user == null || user == undefined) {
      ToastAndroid.show('Register fail !', ToastAndroid.LONG);
    }
    else if(user == false){
      ToastAndroid.show('The email you are using already registered !', ToastAndroid.LONG);
    }
    else {
      ToastAndroid.show('Register successfully <3', ToastAndroid.LONG);
      navigation.navigate('Login');
    }
    setIsLoading(false);

  };

  //hàm bắt sự kiện gửi mã otp
  const handleSendOtp = async () =>{
    const patternEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const checkEmail = patternEmail.test(email);
    if (!checkEmail) {
      ToastAndroid.show('Must enter valid email to get otp code !', ToastAndroid.LONG);
      return;
    }
    // if (!email) {
    //   Alert.alert('Please enter your email first to get otp code !1');
    //   ToastAndroid.show('Please enter your email first to get otp code !2', ToastAndroid.SHORT);
    //   return;
    // }
    ToastAndroid.show('We send an otp code to your email, please check your email to get the otp code.', ToastAndroid.LONG);
    const aaa = await onSendOtp(email);    
    setCheckOtp(aaa);    
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>

      <ProgressDialog
        visible={isLoading}
        loaderColor="black"
        label="Please wait..." />

      <View style={{ alignItems: 'center', paddingHorizontal: 30 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
          <View style={{ height: 1, backgroundColor: 'black', flex: 1 }}></View>
          <Image style={{ width: 50, height: 57 }} source={require('../../../../assets/images/logo.png')}></Image>
          <View style={{ height: 1, backgroundColor: 'black', flex: 1 }}></View>
        </View>
        <View style={{ width: "100%" }}>
          <Text style={{ fontWeight: 'bold', color: 'grey', fontSize: 20, marginTop: 20 }} >Wellcome To Smart Shop</Text>
          <Text style={{ fontSize: 25, color: 'black', fontWeight: '800', marginBottom: 20, }} >REGISTER ACCOUNT</Text>
        </View>

        <View style={{ width: '100%', justifyContent: 'center', }}>
          {/* Email */}
          <Text style={{ color: 'black', fontWeight: '800', fontSize: 16, marginTop: 20 }}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email..." />
          <View style={{ height: 1, backgroundColor: 'black', marginBottom: 20 }} ></View>

          {/* OTP */}
          <Text style={{ color: 'black', fontWeight: '800', fontSize: 16, marginTop: 20 }}>OTP</Text>
          <TextInput
            value={otp}
            inputMode='numeric'           
            onChangeText={setOtp}
            keyboardType="numeric"
            placeholder="Enter otp..." />            
          <View style={{ height: 1, backgroundColor: 'black', marginBottom: 20 }} ></View>
          <TouchableOpacity onPress={() => handleSendOtp()} style={[styles.btn, { backgroundColor: '#fcb800' }, {width:'auto'}, {marginRight:'auto'}]} >
            <Text style={{ color: '#ffffff', textAlign: 'center', fontWeight: 'bold' }} >Get OTP code</Text>
          </TouchableOpacity>

          {/* Name */}
          <Text style={{ color: 'black', fontWeight: '800', fontSize: 16, }}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your fullname..."/>
          <View style={{ height: 1, backgroundColor: 'black', marginBottom: 20 }} ></View>

          {/* Password */}
          <View style={{ position: 'relative' }}>
            <Text style={{ color: 'black', fontWeight: '800', fontSize: 16, }}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="*********"
              style={{}}
              secureTextEntry={isShowPassword} />
            {
              !isShowPassword ?
                <TouchableOpacity onPress={() => setIsShowPassword(true)} style={{ position: 'absolute', right: 0, top: 30 }}>
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require('../../../../assets/images/eye.png')}
                  />
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => setIsShowPassword(false)} style={{ position: 'absolute', right: 0, top: 30 }}>
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require('../../../../assets/images/eye-off.png')}
                  />
                </TouchableOpacity>
            }
            <View style={{ height: 1, backgroundColor: 'black', marginBottom: 20 }} ></View>
          </View>

          {/* Phone */}
          <Text style={{ color: 'black', fontWeight: '800', fontSize: 16, marginTop: 20 }}>Phone</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            inputMode='numeric'
            keyboardType="numeric"
            placeholder="Enter your phone..." />
          <View style={{ height: 1, backgroundColor: 'black', marginBottom: 20 }} ></View>

          {/* Address */}
          <Text style={{ color: 'black', fontWeight: '800', fontSize: 16, marginTop: 20 }}>Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address..." />
          <View style={{ height: 1, backgroundColor: 'black', marginBottom: 20 }} ></View>

          <TouchableOpacity onPress={() => handleRegister()} style={[styles.btn, { backgroundColor: '#fcb800' }]}>
            <Text style={{ color: '#ffffff', textAlign: 'center', fontWeight: 'bold' }} >SIGN UP</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: 'black', fontWeight: '600', textAlign: 'center', marginTop: 10 }} >Already have account? SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
  btn: {
    width: '80%',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  }
})