import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {validateEmail, validatePassword} from '../helper/authValidator';
import API from '../utils/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../utils/toastUtil';
import Loader from './Loader';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        showToast(
          'error',
          'Failed',
          'Email and Password required.',
          'top',
          3000,
        );
        setLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        setEmailError('Invalid email format');
        return;
      } else {
        setEmailError('');
      }

      if (!validatePassword(password)) {
        setPasswordError(
          'Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, and one numeric digit',
        );
        return;
      } else {
        setPasswordError('');
      }

      console.log('user', JSON.stringify({email, password}, null, 2));

      setLoading(true);
      const api: API = new API();

      const postData = {
        email,
        password,
      };

      const responseData = await api.sendData('auth/login', postData);

      console.log(responseData);

      const {token} = responseData.data;

      await AsyncStorage.setItem('token', token);

      showToast('success', 'Success', 'Login successful!', 'top', 3000);

      setLoading(false);
      navigation.navigate('Home' as never);
    } catch (error) {
      console.log('login', error);
      setLoading(false);
      showToast('error', 'Failed', 'Invalid email or passowrd.', 'top', 3000);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={text => setEmail(text)}
            mode="outlined"
            style={styles.input}
          />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
          <TextInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
            mode="outlined"
            style={styles.input}
          />
          {passwordError ? (
            <Text style={styles.error}>{passwordError}</Text>
          ) : null}
          <Button
            mode="contained"
            onPress={handleLogin}
            style={{marginTop: 16}}>
            Login
          </Button>
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('Signup' as never)}>
            Not registered yet? Sign up here
          </Text>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
  },
  signupLink: {
    marginTop: 8,
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Raleway-BoldItalic',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontFamily: 'Quicksand-Medium',
    fontSize: 16,
  },
});

export default Login;
