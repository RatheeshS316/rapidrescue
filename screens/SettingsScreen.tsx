import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  SafeAreaView,
} from 'react-native';
import { Globe, Moon, Bell, Wifi, Siren, User, ChevronRight } from 'lucide-react-native';
import { COLORS, ASSETS, LANGUAGES } from '../constants/theme';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { useAppStore } from '../store/appStore';

interface SettingsScreenProps {
  navigation: any;
}

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const {
    isLoggedIn,
    setIsLoggedIn,
    fullName,
    email,
    currentLang,
    isOnline,
    settings,
    toggleSetting,
  } = useAppStore();

  const getDisplayName = () => {
    if (!isLoggedIn) return 'Guest User';
    if (fullName) return fullName;
    return 'Michael Rogers';
  };

  const handleTestSOS = () => {
    navigation.navigate('SendMessage');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileLeft}>
            <View style={styles.avatarWrap}>
              {isLoggedIn ? (
                <Image source={{ uri: ASSETS.AVATAR_MICHAEL }} style={styles.avatar} />
              ) : (
                <User size={24} color={COLORS.primary} />
              )}
            </View>
            <View>
              <Text style={styles.profileName}>{getDisplayName()}</Text>
              <Text style={styles.profileSub}>
                {isLoggedIn ? (email || 'ratheesh31706@gmail.com') : 'Local Storage Mode'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => isLoggedIn ? setIsLoggedIn(false) : navigation.navigate('Login')}
            style={styles.authBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.authBtnText}>{isLoggedIn ? 'Logout' : 'Login'}</Text>
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Globe size={18} color={COLORS.primary} />
              <Text style={styles.settingLabel}>Language</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>
                {LANGUAGES.find((l) => l.code === currentLang)?.name || 'English'}
              </Text>
              <ChevronRight size={16} color={COLORS.textSecondary} />
            </View>
          </View>

          <View style={[styles.settingRow, styles.settingRowBorder]}>
            <View style={styles.settingLeft}>
              <Moon size={18} color={COLORS.primary} />
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <ToggleSwitch enabled={settings.darkMode} onToggle={() => toggleSetting('darkMode')} />
          </View>
        </View>

        {/* Alerts & Network */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alerts & Network</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Bell size={18} color={COLORS.primary} />
              <Text style={styles.settingLabel}>Disaster Alerts</Text>
            </View>
            <ToggleSwitch enabled={settings.notifications} onToggle={() => toggleSetting('notifications')} />
          </View>

          <View style={[styles.settingRow, styles.settingRowBorder, { paddingLeft: 44 }]}>
            <Text style={[styles.settingLabel, { color: COLORS.textSecondary }]}>SOS Notifications</Text>
            <ToggleSwitch enabled={settings.sosAlerts} onToggle={() => toggleSetting('sosAlerts')} />
          </View>

          <View style={[styles.settingRow, styles.settingRowBorder, { backgroundColor: 'rgba(0,26,36,0.3)' }]}>
            <View style={styles.settingLeft}>
              <Wifi size={18} color={isOnline ? COLORS.safe : COLORS.danger} />
              <Text style={styles.settingLabel}>Network Status</Text>
            </View>
            <View
              style={[
                styles.networkBadge,
                {
                  backgroundColor: isOnline ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                  borderColor: isOnline ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
                },
              ]}
            >
              <Text
                style={[
                  styles.networkBadgeText,
                  { color: isOnline ? COLORS.safe : COLORS.danger },
                ]}
              >
                {isOnline ? '🟢 ONLINE' : '🔴 OFFLINE'}
              </Text>
            </View>
          </View>
        </View>

        {/* Test SOS */}
        <TouchableOpacity
          onPress={handleTestSOS}
          style={styles.testSOSBtn}
          activeOpacity={0.85}
        >
          <Siren size={22} color="#fff" />
          <Text style={styles.testSOSText}>TEST SOS BUTTON</Text>
        </TouchableOpacity>
        <Text style={styles.testSOSNote}>
          Simulates an emergency alert for demonstration purposes
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  container: { padding: 20, gap: 14, paddingBottom: 40 },
  profileCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
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
  profileLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,180,216,0.15)',
    borderWidth: 1,
    borderColor: COLORS.borderPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: { width: '100%', height: '100%' },
  profileName: { fontWeight: '700', fontSize: 17, color: COLORS.textPrimary, marginBottom: 2 },
  profileSub: { fontSize: 12, color: COLORS.textSecondary },
  authBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: COLORS.surfaceDeep,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderPrimary,
  },
  authBtnText: { color: COLORS.primary, fontWeight: '700', fontSize: 12 },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    letterSpacing: 2,
    textTransform: 'uppercase',
    opacity: 0.9,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingRowBorder: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingLabel: { fontSize: 14, fontWeight: '500', color: COLORS.textPrimary },
  settingRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  settingValue: { fontSize: 13, color: COLORS.textSecondary },
  networkBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  networkBadgeText: { fontSize: 10, fontWeight: '700' },
  testSOSBtn: {
    backgroundColor: '#c21515',
    borderRadius: 14,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(248,113,113,0.5)',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 10,
  },
  testSOSText: { color: '#fff', fontWeight: '900', fontSize: 16, letterSpacing: 1 },
  testSOSNote: { fontSize: 10, color: COLORS.textMuted, textAlign: 'center', marginTop: -6 },
});
