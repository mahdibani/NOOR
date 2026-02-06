import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { User, Language, Screen } from '../types';
import { EN_STRINGS, AR_STRINGS, COLORS } from '../constants';

interface DashboardProps {
  user: User | null;
  language: Language;
  onNavigate: (screen: Screen) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, language, onNavigate }) => {
  const t = language === 'EN' ? EN_STRINGS : AR_STRINGS;
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [vibeText, setVibeText] = useState(
    language === 'EN'
      ? 'You are stronger than you know. Trust your journey.'
      : 'أنتِ أقوى مما تظنين. ثقي برحلتكِ.'
  );

  const moods = [
    { emoji: '😫', label: 'Stressed' },
    { emoji: '😔', label: 'Down' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😊', label: 'Good' },
    { emoji: '🤩', label: 'Great' },
  ];

  const handleMoodSelect = (idx: number) => {
    setSelectedMood(idx);
    const vibes =
      language === 'EN'
        ? [
            "Take a deep breath. You're handling more than you think. 🌸",
            "It's okay to have quiet days. Be gentle with your heart. 🕊️",
            'Finding your balance is a beautiful process. ⚖️',
            'Your positive energy is shining today! Keep going. ✨',
            "You're absolutely radiant! Today is your day to flourish. 🌟",
          ]
        : [
            'خذي نفساً عميقاً. أنتِ تتعاملين مع أكثر مما تظنين. 🌸',
            'لا بأس بالأيام الهادئة. كوني رقيقة مع قلبكِ. 🕊️',
            'إيجاد توازنكِ هو عملية جميلة. ⚖️',
            'طاقتكِ الإيجابية تشرق اليوم! استمري. ✨',
            'أنتِ متألقة حقاً! اليوم هو يومكِ لتزدهري. 🌟',
          ];
    setVibeText(vibes[idx]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user?.avatar }} style={styles.avatar} />
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedIcon}>✓</Text>
            </View>
          </View>
          <View>
            <Text style={styles.headerLabel}>Sanctuary Hub</Text>
            <Text style={styles.headerName}>Marhaba, {user?.nickname}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.greetingSection}>
        <Text style={styles.greeting}>
          {language === 'EN' ? 'Welcome Home, ✨' : 'أهلاً بكِ في بيتكِ، ✨'}
          {'\n'}
          {user?.nickname}
        </Text>
        <Text style={styles.greetingSubtext}>
          {language === 'EN' ? 'How is your soul today?' : 'كيف حال روحكِ اليوم؟'}
        </Text>
      </View>

      <View style={styles.moodCard}>
        <Text style={styles.moodTitle}>{t.mood}</Text>
        <View style={styles.moodOptions}>
          {moods.map((mood, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleMoodSelect(idx)}
              style={styles.moodButton}
            >
              <View
                style={[
                  styles.moodEmoji,
                  selectedMood === idx && styles.moodEmojiSelected,
                ]}
              >
                <Text style={styles.moodEmojiText}>{mood.emoji}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.vibeCard}>
        <Image
          source={{ uri: 'https://picsum.photos/seed/colorful-sanctuary/800/600' }}
          style={styles.vibeImage}
        />
        <View style={styles.vibeOverlay}>
          <View style={styles.vibeHeader}>
            <View style={styles.vibeBadge}>
              <Text style={styles.vibeBadgeText}>{t.dailyVibe}</Text>
            </View>
            <View style={styles.vibeSparkle}>
              <Text style={styles.vibeSparkleText}>✨</Text>
            </View>
          </View>
          <View style={styles.vibeContent}>
            <Text style={styles.vibeQuote}>"</Text>
            <Text style={styles.vibeText}>{vibeText}</Text>
            <View style={styles.vibeFooter}>
              <View style={styles.vibeLine} />
              <Text style={styles.vibeAuthor}>Noor AI Companion</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.connectionsHeader}>
        <Text style={styles.connectionsTitle}>
          {language === 'EN' ? 'Safe Connections' : 'روابط آمنة'}
        </Text>
        <TouchableOpacity>
          <Text style={styles.exploreButton}>
            {language === 'EN' ? 'Explore' : 'استكشفي'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.connectionsGrid}>
        <TouchableOpacity
          style={styles.connectionCard}
          onPress={() => onNavigate(Screen.Experts)}
          activeOpacity={0.8}
        >
          <View style={styles.connectionImageContainer}>
            <Image
              source={{ uri: 'https://picsum.photos/seed/expert-woman/400/300' }}
              style={styles.connectionImage}
            />
            <View style={styles.connectionBadge}>
              <Text style={styles.connectionBadgeIcon}>✓</Text>
            </View>
          </View>
          <Text style={styles.connectionTitle}>Vetted Experts</Text>
          <Text style={styles.connectionSubtitle}>Professional Care</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.connectionCard}
          onPress={() => onNavigate(Screen.Pods)}
          activeOpacity={0.8}
        >
          <View style={styles.connectionImageContainer}>
            <Image
              source={{ uri: 'https://picsum.photos/seed/pods-community/400/300' }}
              style={styles.connectionImage}
            />
          </View>
          <Text style={styles.connectionTitle}>Community Pods</Text>
          <Text style={styles.connectionSubtitle}>Your Private Tribe</Text>
        </TouchableOpacity>
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fff',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.teal,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  verifiedIcon: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
    opacity: 0.7,
  },
  headerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationIcon: {
    fontSize: 20,
  },
  greetingSection: {
    marginBottom: 32,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textDark,
    lineHeight: 36,
    marginBottom: 8,
  },
  greetingSubtext: {
    fontSize: 14,
    color: '#999',
  },
  moodCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  moodTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
    letterSpacing: 1.5,
    marginBottom: 24,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    alignItems: 'center',
  },
  moodEmoji: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
  },
  moodEmojiSelected: {
    backgroundColor: `${COLORS.primary}20`,
    opacity: 1,
    transform: [{ scale: 1.2 }],
  },
  moodEmojiText: {
    fontSize: 24,
  },
  vibeCard: {
    height: 256,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  vibeImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  vibeOverlay: {
    flex: 1,
    backgroundColor: 'rgba(176, 109, 117, 0.8)',
    padding: 24,
    justifyContent: 'space-between',
  },
  vibeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  vibeBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  vibeBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.5,
  },
  vibeSparkle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vibeSparkleText: {
    fontSize: 16,
  },
  vibeContent: {
    gap: 8,
  },
  vibeQuote: {
    fontSize: 32,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: -8,
  },
  vibeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 28,
  },
  vibeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  vibeLine: {
    width: 24,
    height: 2,
    backgroundColor: COLORS.gold,
  },
  vibeAuthor: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.5,
    opacity: 0.8,
  },
  connectionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  connectionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  exploreButton: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  connectionsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  connectionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  connectionImageContainer: {
    width: '100%',
    height: 112,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  connectionImage: {
    width: '100%',
    height: '100%',
  },
  connectionBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectionBadgeIcon: {
    fontSize: 14,
    color: COLORS.gold,
    fontWeight: 'bold',
  },
  connectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  connectionSubtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
});

export default Dashboard;
