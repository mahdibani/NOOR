import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { COLORS } from '../constants';

interface VerifyProps {
  phone: string; 
  onComplete: () => void;
  onBack: () => void;
}

const VerifyOTP: React.FC<VerifyProps> = ({ phone, onComplete, onBack }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    if (code.length < 6) {
      Alert.alert("Invalid Code", "Please enter the 6-digit code.");
      return;
    }
    
    setLoading(true);
    try {
      const { data: { session }, error } = await supabase.auth.verifyOtp({
        phone: phone, // This is the +216... number passed from App.tsx
        token: code,
        type: 'sms',
      });

      if (error) throw error;

      if (session) {
        onComplete(); 
      }
    } catch (error: any) {
      Alert.alert("Verification Failed", error.message || "The code is incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>IDENTITY CHECK • 2 OF 3</Text>
          <Text style={styles.progressPercent}>66% Verified</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '66%' }]} />
        </View>
      </View>

      <View style={styles.headerSection}>
        <Text style={styles.title}>Enter the code.</Text>
        <Text style={styles.subtitle}>
          We've sent a 6-digit verification code to{"\n"}
          <Text style={styles.phoneHighlight}>{phone}</Text>
        </Text>
      </View>

      <TextInput
        style={styles.otpInput}
        value={code}
        onChangeText={setCode}
        placeholder="000000"
        placeholderTextColor="#ccc"
        keyboardType="number-pad"
        maxLength={6}
        autoFocus={true}
      />

      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[styles.button, (code.length < 6 || loading) && styles.buttonDisabled]} 
          onPress={handleVerifyOTP}
          disabled={loading || code.length < 6}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Confirm & Enter</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onBack} disabled={loading}>
          <Text style={styles.resendText}>Didn't receive a code? <Text style={styles.resendLink}>Try again</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: COLORS.background, justifyContent: 'center' },
  backButton: { 
    position: 'absolute', top: 60, left: 24, width: 40, height: 40, 
    borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 2 
  },
  backIcon: { fontSize: 30, color: COLORS.textDark, marginTop: -4 },
  progressSection: { marginBottom: 40 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  progressLabel: { fontSize: 10, fontWeight: 'bold', color: COLORS.primary, letterSpacing: 1.5 },
  progressPercent: { fontSize: 10, fontWeight: 'bold', color: '#999' },
  progressBar: { height: 6, backgroundColor: '#fff', borderRadius: 3 },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 3 },
  headerSection: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#666', lineHeight: 22 },
  phoneHighlight: { color: COLORS.textDark, fontWeight: '600' },
  otpInput: { 
    backgroundColor: '#fff', height: 72, borderRadius: 20, fontSize: 32, 
    textAlign: 'center', letterSpacing: 12, marginBottom: 40, elevation: 4, color: COLORS.textDark,
  },
  bottomSection: { gap: 20 },
  button: { 
    backgroundColor: COLORS.primary, height: 72, borderRadius: 24, 
    alignItems: 'center', justifyContent: 'center', elevation: 8 
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resendText: { textAlign: 'center', color: '#999', fontSize: 14 },
  resendLink: { color: COLORS.primary, fontWeight: 'bold' }
});

export default VerifyOTP;