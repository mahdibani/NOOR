import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Screen, Language } from '../types';
import { EN_STRINGS, AR_STRINGS, COLORS } from '../constants';

interface NavbarProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  language: Language;
}

const Navbar: React.FC<NavbarProps> = ({ activeScreen, onNavigate, language }) => {
  const t = language === 'EN' ? EN_STRINGS : AR_STRINGS;

  const navItems = [
    { screen: Screen.Dashboard, icon: '🏠', label: t.marhaba },
    { screen: Screen.Pods, icon: '👥', label: t.pods },
    { screen: Screen.AIChat, icon: '💬', label: t.aichat },
    { screen: Screen.Activities, icon: '🎉', label: t.activities },
    { screen: Screen.Profile, icon: '👤', label: t.profile },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {navItems.map((item) => {
          const isActive = activeScreen === item.screen;
          return (
            <TouchableOpacity
              key={item.screen}
              onPress={() => onNavigate(item.screen)}
              style={styles.navButton}
            >
              {isActive && <View style={styles.activeIndicator} />}
              <Text style={[styles.navIcon, isActive && styles.navIconActive]}>
                {item.icon}
              </Text>
              <Text
                style={[styles.navLabel, isActive && styles.navLabelActive]}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  navbar: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 76,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -12,
    width: 32,
    height: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  navIcon: {
    fontSize: 24,
    opacity: 0.6,
  },
  navIconActive: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  navLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#999',
    letterSpacing: 1.5,
    marginTop: 4,
  },
  navLabelActive: {
    color: COLORS.primary,
  },
});

export default Navbar;
