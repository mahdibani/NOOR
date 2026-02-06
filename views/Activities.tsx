import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Language } from '../types';
import { MOCK_ACTIVITIES, COLORS } from '../constants';

interface ActivitiesProps {
  language: Language;
}

const Activities: React.FC<ActivitiesProps> = ({ language }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Shared Activities</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.activitiesList}>
        {MOCK_ACTIVITIES.map((act) => (
          <View key={act.id} style={styles.activityCard}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: act.image }} style={styles.activityImage} />
              <View style={styles.imageOverlay} />
              {act.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedIcon}>✓</Text>
                  <Text style={styles.verifiedText}>Verified Group</Text>
                </View>
              )}
              <View style={styles.locationBadge}>
                <Text style={styles.locationIcon}>📍</Text>
                <Text style={styles.locationText}>{act.location}</Text>
              </View>
            </View>

            <View style={styles.activityContent}>
              <View style={styles.activityHeader}>
                <Text style={styles.categoryLabel}>{act.category}</Text>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>
                    {act.date === 'Oct 24' ? 'Tomorrow' : act.date}
                  </Text>
                </View>
              </View>

              <Text style={styles.activityTitle}>{act.title}</Text>

              <View style={styles.timeRow}>
                <Text style={styles.timeIcon}>🕐</Text>
                <Text style={styles.timeText}>
                  {act.date} • {act.time}
                </Text>
              </View>

              <View style={styles.activityFooter}>
                <View style={styles.attendeesSection}>
                  <View style={styles.attendeesAvatars}>
                    {[1, 2, 3].map((i) => (
                      <Image
                        key={i}
                        source={{
                          uri: `https://picsum.photos/seed/attending${i}/100/100`,
                        }}
                        style={styles.attendeeAvatar}
                      />
                    ))}
                    <View style={styles.attendeeCount}>
                      <Text style={styles.attendeeCountText}>
                        +{act.attendingCount - 3}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.attendeesLabel}>
                    {act.attendingCount} Women Attending
                  </Text>
                </View>
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Join Group</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: '#FFFCFA',
  },
  content: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  filterButton: {
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
  filterIcon: {
    fontSize: 18,
  },
  activitiesList: {
    gap: 32,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 224,
    position: 'relative',
  },
  activityImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  verifiedIcon: {
    fontSize: 12,
    color: COLORS.gold,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textDark,
    letterSpacing: 1.5,
  },
  locationBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationIcon: {
    fontSize: 12,
  },
  locationText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  activityContent: {
    padding: 24,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#8CA6A0',
    letterSpacing: 1.5,
  },
  dateBadge: {
    backgroundColor: `${COLORS.primary}20`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dateText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 12,
    lineHeight: 28,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  timeIcon: {
    fontSize: 14,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  attendeesSection: {
    gap: 4,
  },
  attendeesAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: -12,
  },
  attendeeCount: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${COLORS.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: -12,
  },
  attendeeCountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  attendeesLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#999',
    letterSpacing: 1.5,
    paddingLeft: 4,
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  joinButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Activities;
