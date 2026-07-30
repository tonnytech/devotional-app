import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'

const SignIn = () => {
  return (
    <View>
      <Text>sign-in</Text>
      <Link href='/(auth)/sign-up'>Create account</Link>
    </View>
  );
}

export default SignIn