import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { AlertTriangle, ChevronRight, Target, ChevronDown } from 'lucide-react-native';
import { COLORS, ASSETS } from '../constants/theme';

interface ZonesScreenProps {
  navigation: any;
}

export default function ZonesScreen({ navigation }: ZonesScreenProps) {
  const riskData = [
    { label: 'Flood Risk', value: 72, img: ASSETS.BG_FLOOD, color: '#3b82f6' },
    { label: 'Quake Risk', value: 38, img: ASSETS.BG_QUAKE, color: '#f59e0b' },
    { label: 'Landslide', value: 55, img: ASSETS.BG_LANDSLIDE, color: '#8b5cf6' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Report Danger Zone Button */}
        <TouchableOpacity
          style={styles.reportBtn}
          onPress={() => navigation.navigate('DangerZones')}
          activeOpacity={0.8}
        >
          <View style={styles.reportLeft}>
            <View style={styles.reportIconBg}>
              <AlertTriangle size={18} color={COLORS.danger} />
            </View>
            <Text style={styles.reportBtnText}>Report Danger Zone</Text>
          </View>
          <ChevronRight size={18} color={COLORS.textMuted} />
        </TouchableOpacity>

        {/* Location */}
        <View style={styles.locationRow}>
          <View style={styles.locationLeft}>
            <View style={styles.locationIconBg}>
              <Target size={16} color={COLORS.primary} />
            </View>
            <Text style={styles.locationText}>Chennai, Tamil Nadu</Text>
          </View>
          <TouchableOpacity>
            <ChevronDown size={16} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Risk Cards Grid */}
        <View style={styles.grid}>
          {riskData.map((item) => (
            <View key={item.label} style={styles.riskCard}>
              <Image
                source={typeof item.img === 'string' ? { uri: item.img } : item.img}
                style={styles.riskCardImg}
                resizeMode="cover"
              />
              <View style={styles.riskCardOverlay} />
              <View style={styles.riskCardContent}>
                <Text style={styles.riskLabel}>{item.label}</Text>
                <View style={styles.riskValueRow}>
                  <Text style={styles.riskValue}>{item.value}</Text>
                  <Text style={styles.riskPercent}>%</Text>
                </View>
                {/* Progress bar */}
                <View style={styles.progressBg}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${item.value}%` as any, backgroundColor: item.color },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  container: { padding: 20, gap: 16, paddingBottom: 40 },
  reportBtn: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  reportLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  reportIconBg: {
    backgroundColor: 'rgba(239,68,68,0.18)',
    padding: 8,
    borderRadius: 10,
  },
  reportBtnText: { fontWeight: '600', fontSize: 14, color: COLORS.textPrimary },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -4,
  },
  locationLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  locationIconBg: {
    backgroundColor: COLORS.surface,
    padding: 8,
    borderRadius: 50,
  },
  locationText: { fontSize: 14, fontWeight: '500', color: COLORS.textPrimary },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  riskCard: {
    width: '47%',
    aspectRatio: 0.8,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderPrimary,
    backgroundColor: COLORS.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  riskCardImg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.35,
  },
  riskCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,26,36,0.55)',
  },
  riskCardContent: {
    padding: 14,
    flex: 1,
  },
  riskLabel: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
  },
  riskValueRow: { flexDirection: 'row', alignItems: 'flex-end' },
  riskValue: { color: '#fff', fontSize: 38, fontWeight: '900', lineHeight: 44 },
  riskPercent: { color: 'rgba(240,249,255,0.7)', fontSize: 13, marginBottom: 6, marginLeft: 2 },
  progressBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 2,
    marginTop: 'auto',
    overflow: 'hidden',
  },
  progressFill: { height: 4, borderRadius: 2 },
});
