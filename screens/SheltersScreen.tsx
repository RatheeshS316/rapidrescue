import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
} from 'react-native';
import {
  MapPin,
  Navigation,
  Maximize2,
} from 'lucide-react-native';
import { COLORS, ASSETS } from '../constants/theme';

interface SheltersScreenProps {
  navigation: any;
}

export default function SheltersScreen({ navigation }: SheltersScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Map Preview */}
        <TouchableOpacity
          style={styles.mapPreview}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('MapView', { type: 'shelters' })}
        >
          <Image
            source={{ uri: ASSETS.MAP_BG }}
            style={styles.mapImage}
            resizeMode="cover"
          />
          {/* Gradient overlay */}
          <View style={styles.mapGradient} />

          {/* Hover hint */}
          <View style={styles.mapHint}>
            <Maximize2 size={15} color={COLORS.surfaceDeep} />
            <Text style={styles.mapHintText}>Interactive Map</Text>
          </View>

          {/* Map pins */}
          <View style={[styles.mapPin, { top: '20%', left: '15%' }]}>
            <MapPin size={28} color={COLORS.safe} fill={COLORS.safe} />
          </View>
          <View style={[styles.mapPin, { top: '42%', left: '42%' }]}>
            <MapPin size={36} color={COLORS.danger} fill={COLORS.danger} />
          </View>
          <View style={[styles.mapPin, { top: '30%', right: '12%' }]}>
            <View style={styles.safeZoneBadge}>
              <View style={styles.safeZoneDot} />
              <Text style={styles.safeZoneText}>Safe Zone</Text>
            </View>
            <MapPin size={28} color={COLORS.safe} fill={COLORS.safe} />
          </View>
        </TouchableOpacity>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <MapPin size={12} color={COLORS.danger} fill={COLORS.danger} />
            <Text style={styles.legendText}>Danger / You</Text>
          </View>
          <View style={styles.legendItem}>
            <MapPin size={12} color={COLORS.safe} fill={COLORS.safe} />
            <Text style={styles.legendText}>Shelter</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={styles.legendDot} />
            <Text style={styles.legendText}>Safe Zone</Text>
          </View>
        </View>

        {/* Shelter List */}
        <View style={styles.listContainer}>
          {[
            { name: "St. Mary's Shelter", dist: '0.5 mi', beds: '80/100', img: ASSETS.BG_FLOOD },
            { name: 'Greenwood Center', dist: '1.2 mi', beds: '60/200', img: ASSETS.BG_KIT },
          ].map((shelter) => (
            <View key={shelter.name} style={styles.shelterCard}>
              <View style={styles.shelterLeft}>
                <View style={styles.shelterImgWrap}>
                  <Image source={typeof shelter.img === 'string' ? { uri: shelter.img } : shelter.img} style={styles.shelterImg} resizeMode="cover" />
                  <View style={styles.shelterOnlineDot} />
                </View>
                <View>
                  <Text style={styles.shelterName}>{shelter.name}</Text>
                  <View style={styles.shelterMeta}>
                    <Text style={styles.shelterDist}>{shelter.dist}</Text>
                    <Text style={styles.shelterDot}>•</Text>
                    <Text style={styles.shelterBeds}>{shelter.beds} beds</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.routeBtn} activeOpacity={0.8}>
                <Text style={styles.routeBtnText}>Get Route</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Directions Button */}
          <TouchableOpacity style={styles.directionsBtn} activeOpacity={0.85}>
            <Navigation size={18} color={COLORS.textPrimary} />
            <Text style={styles.directionsBtnText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  mapPreview: {
    height: 220,
    backgroundColor: COLORS.background,
    position: 'relative',
    overflow: 'hidden',
  },
  mapImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.75,
  },
  mapGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,26,36,0.4)',
  },
  mapHint: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  mapHintText: { color: COLORS.surfaceDeep, fontWeight: '700', fontSize: 13 },
  mapPin: { position: 'absolute' },
  safeZoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.safe,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
    gap: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: COLORS.safeDark,
  },
  safeZoneDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },
  safeZoneText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.surfaceDeep,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendText: { fontSize: 10, fontWeight: '700', color: COLORS.textSecondary },
  legendDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.safe },
  listContainer: { padding: 20, gap: 12 },
  shelterCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  shelterLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  shelterImgWrap: { position: 'relative' },
  shelterImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(34,197,94,0.5)',
  },
  shelterOnlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.safe,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  shelterName: { fontWeight: '700', fontSize: 14, color: COLORS.textPrimary, marginBottom: 4 },
  shelterMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  shelterDist: { fontWeight: '600', fontSize: 12, color: COLORS.textPrimary },
  shelterDot: { color: COLORS.textMuted, fontSize: 12 },
  shelterBeds: { fontSize: 12, color: COLORS.textMuted },
  routeBtn: {
    backgroundColor: '#005E54',
    borderWidth: 1,
    borderColor: '#007065',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  routeBtnText: { color: '#4ADE80', fontWeight: '700', fontSize: 10 },
  directionsBtn: {
    backgroundColor: '#005E54',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 8,
  },
  directionsBtnText: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14 },
});
