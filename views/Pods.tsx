import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { Language } from '../types';
import { MOCK_PODS, COLORS } from '../constants';

interface PodsProps {
  language: Language;
  onJoinPod: () => void;
}

const Pods: React.FC<PodsProps> = ({ language, onJoinPod }) => {
  const pills = ['All', 'Entrepreneurship', 'New Moms', 'Wellness', 'Creatives'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Your Pod</Text>
        <Text style={styles.subtitle}>Discover your tribe in a safe space.</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for pods, interests..."
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pillsContainer}
        contentContainerStyle={styles.pillsContent}
      >
        {pills.map((pill, idx) => (
          <TouchableOpacity
            key={pill}
            style={[styles.pill, idx === 0 && styles.pillActive]}
          >
            <Text style={[styles.pillText, idx === 0 && styles.pillTextActive]}>
              {pill}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.podsList}>
        {MOCK_PODS.map((pod) => (
          <View key={pod.id} style={styles.podCard}>
            <View style={styles.podHeader}>
              <View style={styles.podImageContainer}>
                <Image source={{ uri: pod.image }} style={styles.podImage} />
                {pod.isVerified && (
                  <View style={styles.podVerifiedBadge}>
                    <Text style={styles.podVerifiedIcon}>✓</Text>
                  </View>
                )}
              </View>
              <View style={styles.podInfo}>
                <View style={styles.podTitleRow}>
                  <Text style={styles.podName}>{pod.name}</Text>
                  <View style={styles.onlineBadge}>
                    <View style={styles.onlineDot} />
                    <Text style={styles.onlineText}>{pod.onlineCount} online</Text>
                  </View>
                </View>
                <Text style={styles.podCategory}>{pod.category}</Text>
              </View>
            </View>

            <View style={styles.podFooter}>
              <View style={styles.membersAvatars}>
                {[1, 2, 3].map((i) => (
                  <Image
                    key={i}
                    source={{ uri: `https://picsum.photos/seed/user${i}/100/100` }}
                    style={styles.memberAvatar}
                  />
                ))}
                <View style={styles.memberCount}>
                  <Text style={styles.memberCountText}>+120</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.joinButton} onPress={onJoinPod}>
                <Text style={styles.joinButtonText}>Join Pod</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
  },
  pillsContainer: {
    marginBottom: 32,
  },
  pillsContent: {
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  pillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  pillText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  pillTextActive: {
    color: '#fff',
  },
  podsList: {
    gap: 16,
  },
  podCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  podHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  podImageContainer: {
    position: 'relative',
  },
  podImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  podVerifiedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  podVerifiedIcon: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  podInfo: {
    flex: 1,
  },
  podTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  podName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
    flex: 1,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4caf50',
  },
  onlineText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  podCategory: {
    fontSize: 12,
    color: '#999',
  },
  podFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  membersAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: -8,
  },
  memberCount: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: -8,
  },
  memberCountText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#666',
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  joinButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Pods;
