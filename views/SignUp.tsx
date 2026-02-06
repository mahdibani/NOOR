import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../constants';
import { supabase } from '../lib/supabase'; // Ensure this path is correct

interface SignUpProps {
  onContinue: (nickname: string, phone: string) => void;
  onBack: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onContinue, onBack }) => {
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validation: Nickname exists, Phone is likely 8 digits (Tunisia standard), PIN exists
  const isValid = nickname.trim() && phone.trim().length >= 8 && pin.trim();

  const handleSignUp = async () => {
    if (!isValid) return;

    setIsLoading(true);
    
    // Formatting the Tunisian number correctly for Twilio
    // If your input is "22123456", it becomes "+21622123456"
    const formattedPhone = `+216${phone.trim()}`;

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
        options: {
          // These metadata fields are sent to the 'auth.users' table 
          // and handled by your SQL trigger to populate public.profiles
          data: {
            nickname: nickname,
            security_pin: pin, // Optional: if you store this in your DB
          },
        },
      });

      if (error) throw error;

      // If successful, navigate to Verify-OTP.tsx
      onContinue(nickname, formattedPhone);
      
    } catch (error: any) {
      Alert.alert('Sanctuary Entry Error', error.message || 'Could not send verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>SANCTUARY ENTRY • 1 OF 3</Text>
            <Text style={styles.progressPercent}>33% Verified</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '33%' }]} />
          </View>
        </View>

        <View style={styles.headerSection}>
          <Text style={styles.title}>Secure your space{'\n'}in the sanctuary.</Text>
          <Text style={styles.subtitle}>
            We ensure NOOR remains a verified haven for women. Your details are encrypted.
          </Text>
        </View>

        <View style={styles.formSection}>
          {/* NICKNAME */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NICKNAME</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
                placeholder="What should we call you?"
                placeholderTextColor="#ccc"
                autoCorrect={false}
              />
              <Text style={styles.inputIcon}>👤</Text>
            </View>
          </View>

          {/* PHONE NUMBER */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>TUNISIAN PHONE NUMBER</Text>
            <View style={styles.phoneRow}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>🇹🇳 +216</Text>
              </View>
              <View style={[styles.inputContainer, styles.phoneInput]}>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="XX XXX XXX"
                  placeholderTextColor="#ccc"
                  keyboardType="phone-pad"
                  maxLength={8}
                />
                <Text style={styles.inputIcon}>📱</Text>
              </View>
            </View>
          </View>

          {/* SECURITY PIN */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>SECURITY PIN</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={pin}
                onChangeText={setPin}
                placeholder="••••••••"
                placeholderTextColor="#ccc"
                secureTextEntry
                keyboardType="number-pad"
              />
              <Text style={styles.inputIcon}>🔒</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.privacyBadge}>
            <Text style={styles.privacyText}>🛡️ Privacy Protected Sanctuary</Text>
          </View>
          <TouchableOpacity
            style={[styles.continueButton, (!isValid || isLoading) && styles.continueButtonDisabled]}
            onPress={handleSignUp}
            disabled={!isValid || isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.continueButtonText}>Verify My Identity</Text>
                <Text style={styles.continueArrow}>→</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backIcon: {
    fontSize: 28,
    color: COLORS.textDark,
  },
  progressSection: {
    marginBottom: 32,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  progressPercent: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#999',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  headerSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 12,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  formSection: {
    gap: 24,
    marginBottom: 40,
  },
  inputGroup: {
    gap: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 64,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
  },
  inputIcon: {
    fontSize: 20,
    marginLeft: 8,
  },
  phoneRow: {
    flexDirection: 'row',
    gap: 12,
  },
  countryCode: {
    width: 100, // Adjusted for Tunisia flag + code
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  phoneInput: {
    flex: 1,
  },
  bottomSection: {
    gap: 24,
  },
  privacyBadge: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
  },
  privacyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
    letterSpacing: 1.5,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    height: 72,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  continueArrow: {
    fontSize: 20,
    color: '#fff',
  },
});

export default SignUp;