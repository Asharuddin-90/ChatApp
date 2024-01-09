import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    // Validate email using regex
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    } else {
      setEmailError('');
    }

    // Validate password using regex
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one numeric digit, and one special character',
      );
      return;
    } else {
      setPasswordError('');
    }

    console.log('user', JSON.stringify({email, password}, null, 2));

    // Perform login logic if validations pass
  };

  return (
    <View style={styles.container}>
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
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <Button mode="contained" onPress={handleLogin} style={{marginTop: 16}}>
        Login
      </Button>
      <Text
        style={styles.signupLink}
        onPress={() => navigation.navigate('Signup' as never)}>
        Not registered yet? Sign up here
      </Text>
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
