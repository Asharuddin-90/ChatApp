import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Signup from '../components/Signup';

const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <Signup />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SignupScreen;
