import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import API from '../utils/API';
import Toast from 'react-native-toast-message';
import {validateEmail, validatePassword} from '../helper/authValidator';
import Loader from './Loader';

const Signup = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!email || !password || !name) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Failed',
        text2: 'Email, Password and Name required.',
        visibilityTime: 3000,
        autoHide: true,
      });
      setLoading(false);
      return;
    }

    setLoading(true);

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

    const api: API = new API();

    const postData = {
      name,
      email,
      password,
    };

    api
      .sendData('auth/sign-up', postData)
      .then((responseData: any) => {
        console.log(responseData);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Signup successful! Now you can login.',
          visibilityTime: 3000,
          autoHide: true,
        });
        setLoading(false);
        navigation.navigate('Login' as never);
      })
      .catch(error => {
        setLoading(false);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Failed',
          text2: 'Not able Sign Up. Try again later..',
          visibilityTime: 3000,
          autoHide: true,
        });
      });

    console.log('user', JSON.stringify({email, password}, null, 2));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TextInput
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={text => setName(text)}
            mode="outlined"
            style={styles.input}
          />
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
            Sign-Up
          </Button>
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('Login' as never)}>
            Already registered? Login here
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

export default Signup;
