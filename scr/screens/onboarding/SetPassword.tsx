import { View, Text, Dimensions, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { RFValue } from 'react-native-responsive-fontsize';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "SetPassword">;
const logo = require('../../assets/logo.png'); 
const backIcon = require('../../assets/backIcon.png');

export default function SetPassword() {
  const navigation = useNavigation<NavigationProp>();
  const [password, setPassword] = useState('');
  const {updateOnboardingData, onboardingData} = useOnboarding();
  const email = onboardingData.email ?? "";

  const checkPasswordRequirements = (pass: string) => {
    const minLength = pass.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    return { minLength, hasUpperCase, hasNumber };
  };

  const handleContinue = async () => {
    const {minLength, hasUpperCase, hasNumber} = checkPasswordRequirements(password);

    if(!minLength || !hasUpperCase || !hasNumber) {
      alert("Password must be at least 8 characters long, contain an uppercase letter, and include a number.")
      return;
    }

      updateOnboardingData({password});
      navigation.navigate("SetName");
  }

  const { minLength, hasUpperCase, hasNumber } = checkPasswordRequirements(password);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50} // Adjust offset as needed
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>

          <View style={styles.centeredContent}>
            <Image source={logo} style={styles.appLogo} resizeMode="contain" />

            <Text style={styles.title}>Now let's set up your password</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View style={styles.requirementsContainer}>
              <View style={styles.requirementRow}>
                {minLength ? (
                  <View style={styles.checkedBox} />
                ) : (
                  <View style={styles.uncheckedBox} />
                )}
                <Text style={styles.requirementText}>  8+ characters</Text>
              </View>
              <View style={styles.requirementRow}>
                {hasUpperCase ? (
                  <View style={styles.checkedBox} />
                ) : (
                  <View style={styles.uncheckedBox} />
                )}
                <Text style={styles.requirementText}>  At least 1 uppercase</Text>
              </View>
              <View style={styles.requirementRow}>
                {hasNumber ? (
                  <View style={styles.checkedBox} />
                ) : (
                  <View style={styles.uncheckedBox} />
                )}
                <Text style={styles.requirementText}>  At least 1 number</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: width * 0.05, 
    paddingTop: height * 0.025, 
  },
  backButton: {
    position: 'absolute',
    top: height * 0.05, 
    left: width * 0.05, 
    zIndex: 1,
  },
  backIcon: {
    width: width * 0.075, 
    height: width * 0.075, 
    resizeMode: 'contain',
  },
  centeredContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05, 
    marginTop: -height * 0.06, 
  },
  appLogo: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: width * 0.065, 
    marginBottom: height * 0.05, 
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: RFValue(26, height), 
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: height * 0.035, 
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: width * 0.025, 
    paddingHorizontal: width * 0.0375, 
    marginBottom: height * 0.025, 
    marginTop: height * 0.0125, 
    width: '90%',
    height: height * 0.0625, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
  },
  input: {
    fontSize: RFValue(16, height), 
    color: '#666',
    width: '100%',
    textAlign: 'center',
  },
  requirementsContainer: {
    marginBottom: height * 0.1, 
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: "90%"
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.00625, 
  },
  checkedBox: {
    width: width * 0.045, 
    height: width * 0.045, 
    backgroundColor: '#7A5FFF', 
    borderRadius: width * 0.0075, 
    marginRight: width * 0.0125, 
  },
  uncheckedBox: {
    width: width * 0.045, 
    height: width * 0.045, 
    backgroundColor: '#D9D9D9',
    borderRadius: width * 0.0075, 
    marginRight: width * 0.0125, 
  },
  requirementText: {
    fontSize: RFValue(14, height), 
    color: '#D3D3D3',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#7A5FFF',
    paddingVertical: height * 0.01875, 
    paddingHorizontal: width * 0.1, 
    borderRadius: width * 0.0725, 
    width: '85%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: RFValue(18, height), 
    fontWeight: 'bold',
  },
});