import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Camera } from 'lucide-react-native';
import { COLORS, ASSETS } from '../constants/theme';

interface DangerZonesScreenProps {
  navigation: any;
}

export default function DangerZonesScreen({ navigation }: DangerZonesScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.description}>
          Help others by reporting dangerous areas near you. Upload a photo and submit your report.
        </Text>

        <View style={styles.photoCard}>
          <Image source={{ uri: ASSETS.BG_WAVE }} style={styles.dangerImg} resizeMode="cover" />
          <View style={styles.imgOverlay} />

          <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.85}>
            <Camera size={16} color={COLORS.surfaceDeep} />
            <Text style={styles.uploadBtnText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formCard}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Danger Type</Text>
            <Text style={styles.formValue}>Flood →</Text>
          </View>
          <View style={[styles.formRow, { borderTopWidth: 1, borderTopColor: COLORS.border }]}>
            <Text style={styles.formLabel}>Severity</Text>
            <Text style={styles.formValue}>High →</Text>
          </View>
          <View style={[styles.formRow, { borderTopWidth: 1, borderTopColor: COLORS.border }]}>
            <Text style={styles.formLabel}>Your Location</Text>
            <Text style={styles.formValue}>Auto-detect</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => navigation.navigate('SendMessage')}
          activeOpacity={0.85}
        >
          <Text style={styles.submitBtnText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, padding: 20, gap: 16 },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },
  photoCard: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dangerImg: { ...StyleSheet.absoluteFillObject, opacity: 0.8 },
  imgOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  uploadBtn: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: 'rgba(240,249,255,0.95)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  uploadBtnText: { color: COLORS.surfaceDeep, fontWeight: '700', fontSize: 14 },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  formLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary },
  formValue: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 'auto',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  submitBtnText: { color: COLORS.surfaceDeep, fontWeight: '700', fontSize: 16 },
});
