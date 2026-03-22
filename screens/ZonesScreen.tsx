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
import Svg, { Path, Defs, LinearGradient, Stop, Line } from 'react-native-svg';
import { AlertTriangle, ChevronRight, Target, ChevronDown, MoreHorizontal } from 'lucide-react-native';
import { COLORS, ASSETS } from '../constants/theme';

interface ZonesScreenProps {
  navigation: any;
}

export default function ZonesScreen({ navigation }: ZonesScreenProps) {
  const riskData = [
    { label: 'Flood Risk', value: 72, img: ASSETS.BG_FLOOD, color: '#3b82f6', disasterName: 'Flood' },
    { label: 'Quake Risk', value: 38, img: ASSETS.BG_QUAKE, color: '#f59e0b', disasterName: 'Earthquake' },
    { label: 'Landslide', value: 55, img: ASSETS.BG_LANDSLIDE, color: '#8b5cf6', disasterName: 'Landslide' },
    { label: 'Tsunami', value: 30, img: ASSETS.BG_WAVE, color: '#00B4D8', disasterName: 'Tsunami' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Disaster Prediction Gauge */}
        <View style={styles.gaugeContainer}>
          <View style={styles.gaugeOptions}>
            <TouchableOpacity>
              <MoreHorizontal size={20} color="#F0F9FF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.gaugeTitle}>Disaster Prediction</Text>
          
          <View style={styles.svgWrapper}>
            <Svg viewBox="0 0 200 100" style={styles.svgElement}>
              <Defs>
                <LinearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor="#3b82f6" />
                  <Stop offset="35%" stopColor="#22c55e" />
                  <Stop offset="65%" stopColor="#eab308" />
                  <Stop offset="100%" stopColor="#ef4444" />
                </LinearGradient>
              </Defs>
              <Path d="M 20 90 A 70 70 0 0 1 180 90" fill="none" stroke="#001A24" strokeWidth="24" />
              <Path d="M 20 90 A 70 70 0 0 1 180 90" fill="none" stroke="url(#gaugeGrad)" strokeWidth="24" strokeDasharray="220" strokeDashoffset="61.6" />
              <Line x1="100" y1="20" x2="100" y2="32" stroke="white" strokeWidth="2" opacity="0.8"/>
              <Line x1="50.5" y1="40.5" x2="59" y2="49" stroke="white" strokeWidth="2" opacity="0.8"/>
              <Line x1="149.5" y1="40.5" x2="141" y2="49" stroke="white" strokeWidth="2" opacity="0.8"/>
            </Svg>
            <View style={styles.gaugeTextWrapper}>
              <Text style={styles.gaugePercent}>72%</Text>
            </View>
          </View>
          
          <Text style={styles.gaugeStatus}>OVERALL DISASTER LEVEL: HIGH</Text>
        </View>

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
            <TouchableOpacity 
              key={item.label} 
              style={styles.riskCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('DisasterDetails', { disasterName: item.disasterName })}
            >
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
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />

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
  gaugeContainer: {
    backgroundColor: COLORS.surface,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  gaugeOptions: { position: 'absolute', top: 16, right: 16 },
  gaugeTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  svgWrapper: { width: '100%', maxWidth: 240, aspectRatio: 2 },
  svgElement: { width: '100%', height: '100%', overflow: 'visible' },
  gaugeTextWrapper: { position: 'absolute', bottom: 10, left: 0, right: 0, alignItems: 'center' },
  gaugePercent: { fontSize: 44, fontWeight: '900', color: COLORS.textPrimary, letterSpacing: -2 },
  gaugeStatus: { color: '#f87171', fontWeight: '800', fontSize: 12, marginTop: 12, letterSpacing: 0.5 },
  divider: { height: 1, backgroundColor: COLORS.surface, marginVertical: 8 },
});
