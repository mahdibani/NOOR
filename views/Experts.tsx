import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import { Expert, Language } from '../types';
import { MOCK_EXPERTS, COLORS } from '../constants';

interface ExpertsProps {
  language: Language;
}

const Experts: React.FC<ExpertsProps> = ({ language }) => {
  const [showBooking, setShowBooking] = useState<Expert | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<'details' | 'success'>('details');

  const dates = [
    { day: 'Mon', num: 24 },
    { day: 'Tue', num: 25 },
    { day: 'Wed', num: 26 },
    { day: 'Thu', num: 27 },
    { day: 'Fri', num: 28 },
  ];
  const slots = ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];

  const handleConfirm = () => {
    setBookingStep('success');
    setTimeout(() => {
      setShowBooking(null);
      setBookingStep('details');
      setSelectedSlot(null);
      setSelectedDate(null);
    }, 3500);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Expert Directory</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedIcon}>🛡️</Text>
            <Text style={styles.verifiedText}>Founder-Vetted Sanctuary</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {['All', 'Psychology', 'Life Coaching', 'Nutrition'].map((cat, i) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryPill, i === 0 && styles.categoryPillActive]}
            >
              <Text
                style={[
                  styles.categoryText,
                  i === 0 && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.expertsList}>
          {MOCK_EXPERTS.map((exp) => (
            <View key={exp.id} style={styles.expertCard}>
              <View style={styles.expertHeader}>
                <View style={styles.expertAvatarContainer}>
                  <Image source={{ uri: exp.avatar }} style={styles.expertAvatar} />
                  <View style={styles.expertVerifiedBadge}>
                    <Text style={styles.expertVerifiedIcon}>✓</Text>
                  </View>
                </View>
                <View style={styles.expertInfo}>
                  <View style={styles.expertTitleRow}>
                    <Text style={styles.expertName}>{exp.name}</Text>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingIcon}>⭐</Text>
                      <Text style={styles.ratingText}>{exp.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.expertSpecialty}>{exp.specialty}</Text>
                  <Text style={styles.expertDescription} numberOfLines={1}>
                    {exp.description}
                  </Text>
                </View>
              </View>

              <View style={styles.expertFooter}>
                <View style={styles.confidentialBadge}>
                  <Text style={styles.confidentialIcon}>🔒</Text>
                  <Text style={styles.confidentialText}>Confidential</Text>
                </View>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => setShowBooking(exp)}
                >
                  <Text style={styles.bookButtonText}>Book Session</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={!!showBooking}
        animationType="slide"
        transparent
        onRequestClose={() => setShowBooking(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalHandle}
              onPress={() => setShowBooking(null)}
            />

            {bookingStep === 'details' ? (
              <ScrollView>
                <View style={styles.modalHeader}>
                  <Image
                    source={{ uri: showBooking?.avatar }}
                    style={styles.modalAvatar}
                  />
                  <View>
                    <Text style={styles.modalName}>{showBooking?.name}</Text>
                    <Text style={styles.modalSpecialty}>
                      {showBooking?.specialty}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Select Date</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.datesContainer}
                  >
                    {dates.map((d, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => setSelectedDate(i)}
                        style={[
                          styles.dateButton,
                          selectedDate === i && styles.dateButtonActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dateDay,
                            selectedDate === i && styles.dateDayActive,
                          ]}
                        >
                          {d.day}
                        </Text>
                        <Text
                          style={[
                            styles.dateNum,
                            selectedDate === i && styles.dateNumActive,
                          ]}
                        >
                          {d.num}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Available Slots</Text>
                  <View style={styles.slotsGrid}>
                    {slots.map((s) => (
                      <TouchableOpacity
                        key={s}
                        onPress={() => setSelectedSlot(s)}
                        style={[
                          styles.slotButton,
                          selectedSlot === s && styles.slotButtonActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.slotText,
                            selectedSlot === s && styles.slotTextActive,
                          ]}
                        >
                          {s}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <TouchableOpacity
                  disabled={selectedDate === null || !selectedSlot}
                  onPress={handleConfirm}
                  style={[
                    styles.confirmButton,
                    (selectedDate === null || !selectedSlot) &&
                      styles.confirmButtonDisabled,
                  ]}
                >
                  <Text style={styles.confirmButtonText}>Confirm Booking</Text>
                </TouchableOpacity>
              </ScrollView>
            ) : (
              <View style={styles.successContainer}>
                <View style={styles.successIcon}>
                  <Text style={styles.successIconText}>✓</Text>
                </View>
                <Text style={styles.successTitle}>Session Booked!</Text>
                <Text style={styles.successText}>
                  A calendar reminder has been sent to your sanctuary hub.
                </Text>
                <Text style={styles.successConfetti}>✨ Success Confetti! ✨</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F5',
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
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  verifiedIcon: {
    fontSize: 12,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.teal,
    letterSpacing: 1.5,
  },
  categoriesContainer: {
    marginBottom: 32,
  },
  categoriesContent: {
    gap: 12,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  categoryPillActive: {
    backgroundColor: COLORS.textDark,
    borderColor: COLORS.textDark,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  expertsList: {
    gap: 24,
  },
  expertCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  expertHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  expertAvatarContainer: {
    position: 'relative',
  },
  expertAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#fff',
  },
  expertVerifiedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  expertVerifiedIcon: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  expertInfo: {
    flex: 1,
  },
  expertTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  expertName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingIcon: {
    fontSize: 10,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  expertSpecialty: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.teal,
    marginBottom: 4,
  },
  expertDescription: {
    fontSize: 11,
    color: '#999',
  },
  expertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  confidentialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  confidentialIcon: {
    fontSize: 14,
  },
  confidentialText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#999',
    letterSpacing: 1.5,
  },
  bookButton: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bookButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 32,
    maxHeight: '80%',
  },
  modalHandle: {
    width: 48,
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  modalAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  modalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  modalSpecialty: {
    fontSize: 14,
    color: COLORS.teal,
  },
  modalSection: {
    marginBottom: 32,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  datesContainer: {
    gap: 12,
  },
  dateButton: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  dateButtonActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  dateDay: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 4,
  },
  dateDayActive: {
    color: '#fff',
  },
  dateNum: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
  },
  dateNumActive: {
    color: '#fff',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  slotButton: {
    width: '48%',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  slotButtonActive: {
    backgroundColor: COLORS.textDark,
    borderColor: COLORS.textDark,
  },
  slotText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  slotTextActive: {
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4caf50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successIconText: {
    fontSize: 48,
    color: '#fff',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    maxWidth: 200,
    marginBottom: 32,
  },
  successConfetti: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.gold,
    letterSpacing: 1.5,
  },
});

export default Experts;
