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
import { Bot, Lock, Route, ShieldPlus, MapPin, Maximize2 } from 'lucide-react-native';
import { COLORS, ASSETS } from '../constants/theme';

interface AssistantScreenProps {
  navigation: any;
}

export default function AssistantScreen({ navigation }: AssistantScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Bot greeting */}
        <View style={styles.botRow}>
          <View style={styles.botAvatar}>
            <Bot size={22} color={COLORS.surfaceDeep} />
          </View>
          <View style={styles.botBubble}>
            <Text style={styles.botBubbleText}>How can I assist you?</Text>
          </View>
        </View>

        {/* Map with action buttons */}
        <TouchableOpacity
          style={styles.mapContainer}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('MapView', { type: 'assistant' })}
        >
          <Image
            source={{ uri: ASSETS.MAP_BG }}
            style={styles.mapImage}
            resizeMode="cover"
          />
          <View style={styles.mapOverlay} />

          {/* Map hint on tap */}
          <View style={styles.mapHint}>
            <Maximize2 size={14} color={COLORS.surfaceDeep} />
            <Text style={styles.mapHintText}>Pan & Zoom Map</Text>
          </View>

          {/* Pins */}
          <MapPin size={28} color={COLORS.danger} fill={COLORS.danger} style={styles.pin1} />
          <MapPin size={36} color={COLORS.danger} fill={COLORS.danger} style={styles.pin2} />
          <View style={styles.safeZoneDot} />

          {/* Action Buttons overlay */}
          <View style={styles.actionsOverlay}>
            {[
              { icon: <Lock size={18} color={COLORS.primary} />, label: 'Find Shelter' },
              { icon: <Route size={18} color={COLORS.primary} />, label: 'Safe Route' },
              { icon: <ShieldPlus size={18} color={COLORS.textSecondary} />, label: 'Medical Help' },
            ].map((action) => (
              <TouchableOpacity key={action.label} style={styles.actionBtn} activeOpacity={0.8}>
                {action.icon}
                <Text style={styles.actionBtnText}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  container: { padding: 20, gap: 20, paddingBottom: 40 },
  botRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  botBubble: {
    backgroundColor: COLORS.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderTopLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  botBubbleText: {
    color: COLORS.surfaceDeep,
    fontSize: 14,
    fontWeight: '500',
  },
  mapContainer: {
    height: 300,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderPrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  mapImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.45,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,26,36,0.35)',
  },
  mapHint: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  mapHintText: { color: COLORS.surfaceDeep, fontWeight: '700', fontSize: 11 },
  pin1: { position: 'absolute', top: '25%', right: '25%' },
  pin2: { position: 'absolute', top: '55%', left: '45%' },
  safeZoneDot: {
    position: 'absolute',
    top: 30,
    right: 24,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.safe,
    borderWidth: 2,
    borderColor: '#fff',
  },
  actionsOverlay: {
    position: 'absolute',
    left: 0,
    bottom: 24,
    width: '82%',
    gap: 8,
    paddingLeft: 16,
  },
  actionBtn: {
    backgroundColor: 'rgba(0,31,45,0.92)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderTopLeftRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionBtnText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontSize: 14,
  },
});
