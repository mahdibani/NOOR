import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { User, Language } from '../types';
import { COLORS } from '../constants';

interface ProfileProps {
  user: User | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  user,
  language,
  onLanguageChange,
  onLogout,
}) => {
  const isAR = language === 'AR';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile & Security</Text>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarGradient}>
            <Image source={{ uri: user?.avatar }} style={styles.avatar} />
          </View>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedIcon}>✓</Text>
          </View>
        </View>
        <Text style={styles.nickname}>{user?.nickname}</Text>
        <View style={styles.memberBadge}>
          <Text style={styles.memberBadgeText}>Verified Member</Text>
        </View>
        <Text style={styles.memberSince}>
          Member since 2024 • UAE Sanctuary
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LANGUAGE SETTINGS</Text>
        <View style={styles.languageToggle}>
          <View
            style={[
              styles.languageSlider,
              isAR ? styles.languageSliderRight : styles.languageSliderLeft,
            ]}
          />
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => onLanguageChange('EN')}
          >
            <Text
              style={[
                styles.languageButtonText,
                !isAR && styles.languageButtonTextActive,
              ]}
            >
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => onLanguageChange('AR')}
          >
            <Text
              style={[
                styles.languageButtonText,
                isAR && styles.languageButtonTextActive,
              ]}
            >
              العربية
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PRIVACY & SECURITY</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>🔒</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Privacy Settings</Text>
              <Text style={styles.menuSubtitle}>
                Manage visibility and contacts
              </Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>📥</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Download My Data</Text>
              <Text style={styles.menuSubtitle}>Request account archive</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SUPPORT</Text>
        <TouchableOpacity style={styles.supportCard}>
          <View style={styles.supportGlow} />
          <View style={styles.supportContent}>
            <View style={styles.supportAvatarContainer}>
              <Image
                source={{ uri: 'https://picsum.photos/seed/founder/100/100' }}
                style={styles.supportAvatar}
              />
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.supportText}>
              <Text style={styles.supportTitle}>Talk to a Human Founder</Text>
              <Text style={styles.supportSubtitle}>
                We are here to listen and help directly. No bots, just us.
              </Text>
              <View style={styles.supportCTA}>
                <Text style={styles.supportCTAText}>Start Conversation</Text>
                <Text style={styles.supportArrow}>→</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteIcon}>🗑️</Text>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>
          Project Noor v1.0.42 • Encrypted Sanctuary
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF6',
  },
  content: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  signOutText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarGradient: {
    width: 128,
    height: 128,
    borderRadius: 64,
    padding: 4,
    backgroundColor: COLORS.teal,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  verifiedIcon: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  nickname: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  memberBadge: {
    backgroundColor: `${COLORS.teal}20`,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  memberBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2D6A66',
    letterSpacing: 1.5,
  },
  memberSince: {
    fontSize: 12,
    color: '#999',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    height: 56,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  languageSlider: {
    position: 'absolute',
    width: '50%',
    height: 40,
    top: 8,
    backgroundColor: `${COLORS.teal}20`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${COLORS.teal}30`,
  },
  languageSliderLeft: {
    left: 8,
  },
  languageSliderRight: {
    right: 8,
  },
  languageButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
  },
  languageButtonTextActive: {
    color: '#2D6A66',
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.teal}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 20,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 10,
    color: '#999',
  },
  menuArrow: {
    fontSize: 24,
    color: '#ddd',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#f5f5f5',
  },
  supportCard: {
    backgroundColor: '#2D6A66',
    borderRadius: 24,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#2D6A66',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  supportGlow: {
    position: 'absolute',
    top: -24,
    right: -24,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${COLORS.teal}30`,
  },
  supportContent: {
    flexDirection: 'row',
    gap: 16,
    zIndex: 1,
  },
  supportAvatarContainer: {
    position: 'relative',
  },
  supportAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.teal,
  },
  onlineDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4caf50',
    borderWidth: 2,
    borderColor: '#2D6A66',
  },
  supportText: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  supportSubtitle: {
    fontSize: 12,
    color: COLORS.teal,
    lineHeight: 18,
    marginBottom: 16,
  },
  supportCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  supportCTAText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.5,
  },
  supportArrow: {
    fontSize: 14,
    color: '#fff',
  },
  bottomSection: {
    alignItems: 'center',
    paddingTop: 32,
    gap: 32,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deleteIcon: {
    fontSize: 18,
  },
  deleteText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f44336',
    letterSpacing: 1.5,
  },
  versionText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#999',
    letterSpacing: 1.5,
  },
});

export default Profile;
