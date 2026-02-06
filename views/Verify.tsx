import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS } from '../constants';

interface VerifyProps {
  onComplete: () => void;
  onBack: () => void;
}

const Verify: React.FC<VerifyProps> = ({ onComplete, onBack }) => {
  const [processing, setProcessing] = useState(false);

  const handleCapture = () => {
    setProcessing(true);
    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotInactive]} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={[styles.dot, styles.dotInactive]} />
        </View>
        <View style={styles.spacer} />
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.title}>Identity Shield</Text>
        <Text style={styles.subtitle}>
          Position your face within the frame. This ensures NOOR remains a dedicated space for women only.
        </Text>
      </View>

      <View style={styles.centerSection}>
        <View style={styles.frameContainer}>
          <View style={styles.frame}>
            {processing ? (
              <View style={styles.processingOverlay}>
                <View style={styles.spinner} />
                <Text style={styles.processingText}>Verifying...</Text>
                <Text style={styles.processingSubtext}>AI IDENTITY SHIELD SCANNING</Text>
              </View>
            ) : (
              <>
                <Image
                  source={{ uri: 'https://picsum.photos/seed/face-shield/600/600' }}
                  style={styles.frameImage}
                />
                <View style={styles.frameBorder} />
              </>
            )}
          </View>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>Secure Viewfinder</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>🛡️</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>PRIVATE PROTECTION</Text>
            <Text style={styles.infoText}>
              This photo is used strictly for community verification and is never shared or stored long-term.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.captureButton, processing && styles.captureButtonDisabled]}
          onPress={handleCapture}
          disabled={processing}
          activeOpacity={0.8}
        >
          <View style={styles.captureButtonInner}>
            <Text style={styles.captureIcon}>👤</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 24,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
  },
  dotInactive: {
    backgroundColor: '#ddd',
  },
  spacer: {
    width: 40,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  frameContainer: {
    alignItems: 'center',
  },
  frame: {
    width: 280,
    height: 280,
    borderRadius: 140,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 6,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  frameImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  frameBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 16,
    borderColor: `${COLORS.primary}20`,
    borderRadius: 140,
  },
  processingOverlay: {
    flex: 1,
    backgroundColor: `${COLORS.primary}CC`,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  spinner: {
    width: 56,
    height: 56,
    borderWidth: 4,
    borderColor: '#fff',
    borderTopColor: 'transparent',
    borderRadius: 28,
    marginBottom: 24,
  },
  processingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  processingSubtext: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.8,
    marginTop: 8,
    letterSpacing: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 24,
    gap: 16,
    maxWidth: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconText: {
    fontSize: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textDark,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 11,
    color: '#999',
    lineHeight: 16,
  },
  bottomSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  captureButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  captureButtonInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureIcon: {
    fontSize: 36,
  },
});

export default Verify;
