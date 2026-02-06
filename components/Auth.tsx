import React, { useState } from 'react';
import { Alert, StyleSheet, View, TextInput, TouchableOpacity, Text, ActivityIndicator, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState(''); // Format: +216XXXXXXXX
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  // Helper to ensure phone format is clean
  const formatPhone = (num: string) => num.replace(/\s+/g, '');

  async function handleSignUp() {
    if (!phone.startsWith('+')) {
      return Alert.alert('Format Error', 'Phone must start with + (e.g. +216)');
    }
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      phone: formatPhone(phone),
      password: password,
      options: {
        data: {
          username: username.trim(),
          full_name: fullName.trim(),
          phone_number: formatPhone(phone),
        },
      },
    });

    if (error) {
      Alert.alert('Sign Up Error', error.message);
      setLoading(false);
    } else {
      setShowOtp(true);
      setLoading(false);
      Alert.alert('OTP Sent', 'Check your phone for the verification code.');
    }
  }

  async function verifyOtp() {
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      phone: formatPhone(phone),
      token: otp,
      type: 'sms', // Important: keep as 'sms'
    });

    if (error) {
      Alert.alert('Verification Failed', error.message);
    }
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      phone: formatPhone(phone),
      password: password,
    });
    
    if (error) {
      // If error is "Phone not confirmed", show OTP screen
      if (error.message.includes('confirmed')) {
        setShowOtp(true);
        Alert.alert('Verify Phone', 'Please verify your number first.');
      } else {
        Alert.alert('Login Error', error.message);
      }
    }
    setLoading(false);
  }

  async function resendOtp() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      phone: formatPhone(phone),
    });
    setLoading(false);
    if (error) Alert.alert('Error', error.message);
    else Alert.alert('Sent', 'New code requested.');
  }

  if (showOtp) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <TextInput 
          style={styles.input} 
          placeholder="123456" 
          value={otp} 
          onChangeText={setOtp} 
          keyboardType="number-pad" 
        />
        <TouchableOpacity style={styles.button} onPress={verifyOtp} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify Number</Text>}
        </TouchableOpacity>
        
        <TouchableOpacity onPress={resendOtp} style={styles.link}>
          <Text style={styles.linkText}>Didn't get a code? Resend</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowOtp(false)} style={styles.link}>
          <Text style={{color: '#666'}}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Phone (+216...)" 
        value={phone} 
        onChangeText={setPhone} 
        keyboardType="phone-pad" 
        autoComplete="tel"
      />

      {isSignUp && (
        <>
          <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
        </>
      )}

      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      
      <TouchableOpacity style={styles.button} onPress={isSignUp ? handleSignUp : handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{isSignUp ? 'Register' : 'Login'}</Text>}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} style={styles.link}>
        <Text style={styles.linkText}>{isSignUp ? 'Already have an account? Sign in' : 'New here? Create account'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 25, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#111' },
  input: { backgroundColor: '#f9f9f9', padding: 16, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#eee', fontSize: 16 },
  button: { backgroundColor: '#007AFF', padding: 18, borderRadius: 12, alignItems: 'center', shadowColor: '#007AFF', shadowOpacity: 0.2, shadowRadius: 5 },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  link: { marginTop: 25, alignItems: 'center' },
  linkText: { color: '#007AFF', fontWeight: '500' }
});