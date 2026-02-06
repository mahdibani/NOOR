import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Language } from '../types';
import { COLORS } from '../constants';

interface SplashProps {
  onSelectLanguage: (lang: Language) => void;
}

const Splash: React.FC<SplashProps> = ({ onSelectLanguage }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topSection}>
        <Text style={styles.logo}>noor</Text>
        
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://picsum.photos/seed/noor-sanctuary/800/800' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.welcomeText}>
          <Text style={styles.welcomeEn}>Welcome to your sanctuary</Text>
          <Text style={styles.welcomeAr}>مرحباً بك في ملاذك</Text>
        </View>
        
        <Text style={styles.selectLang}>
          Select your preferred language{'\n'}
          <Text style={styles.selectLangAr}>اختر لغتك المفضلة</Text>
        </Text>
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.langButton}
          onPress={() => onSelectLanguage('EN')}
          activeOpacity={0.8}
        >
          <View style={styles.langButtonContent}>
            <View style={styles.langIcon}>
              <Text style={styles.langIconText}>En</Text>
            </View>
            <Text style={styles.langButtonText}>English</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.langButton}
          onPress={() => onSelectLanguage('AR')}
          activeOpacity={0.8}
        >
          <View style={[styles.langButtonContent, styles.langButtonContentReverse]}>
            <View style={styles.langIcon}>
              <Text style={styles.langIconText}>ع</Text>
            </View>
            <Text style={styles.langButtonText}>العربية</Text>
          </View>
          <Text style={styles.arrow}>‹</Text>
        </TouchableOpacity>

        <View style={styles.trustBadge}>
          <Text style={styles.trustText}>🛡️ Verified & Secure Environment</Text>
        </View>
      </View>
    </ScrollView>
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
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 32,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    alignItems: 'center',
    marginTop: 16,
  },
  welcomeEn: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeAr: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  selectLang: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 20,
  },
  selectLangAr: {
    fontSize: 13,
  },
  buttonSection: {
    gap: 16,
  },
  langButton: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  langButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  langButtonContentReverse: {
    flexDirection: 'row-reverse',
  },
  langIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${COLORS.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langIconText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  langButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  arrow: {
    fontSize: 24,
    color: '#ccc',
  },
  trustBadge: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: `${COLORS.primary}20`,
  },
  trustText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default Splash;
