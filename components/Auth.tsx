import React, { useState } from 'react';
import { 
  Alert, 
  StyleSheet, 
  View, 
  AppState, 
  TextInput, 
  TouchableOpacity, 
  Text,
  ActivityIndicator 
} from 'react-native';
import { supabase } from '../lib/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Generate fake email from username for Supabase Auth
  const getEmailFromUsername = (user: string) => `${user}@noor.app`;

  async function signInWithUsername() {
    setLoading(true);
    const generatedEmail = getEmailFromUsername(username);
    
    const { error } = await supabase.auth.signInWithPassword({
      email: generatedEmail,
      password: password,
    });

    if (error) Alert.alert('Error', error.message);
    setLoading(false);
  }

  async function signUpWithUsername() {
    setLoading(true);
    const generatedEmail = getEmailFromUsername(username);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: generatedEmail,
      password: password,
      options: {
        data: {
          username: username,
          full_name: fullName,
          phone_number: phoneNumber,
        },
      },
    });

    if (error) Alert.alert('Error', error.message);
    if (!session) Alert.alert('Success', 'Account created! Please sign in.');
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="Enter username (min 3 chars)"
          autoCapitalize="none"
          editable={!loading}
        />
      </View>
      
      {isSignUp && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setFullName(text)}
              value={fullName}
              placeholder="Enter your full name"
              autoCapitalize="words"
              editable={!loading}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
              placeholder="+971501234567"
              autoCapitalize="none"
              keyboardType="phone-pad"
              editable={!loading}
            />
          </View>
        </>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Enter password"
          autoCapitalize="none"
          editable={!loading}
        />
      </View>

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]}
        disabled={loading} 
        onPress={() => isSignUp ? signUpWithUsername() : signInWithUsername()}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkButton}
        disabled={loading} 
        onPress={() => setIsSignUp(!isSignUp)}
      >
        <Text style={styles.linkButtonText}>
          {isSignUp 
            ? 'Already have an account? Sign in' 
            : "Don't have an account? Sign up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
});