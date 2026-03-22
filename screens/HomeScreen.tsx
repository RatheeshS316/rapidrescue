import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { User, Wifi, Globe, ChevronDown, CheckCircle, AlertTriangle, Waves } from 'lucide-react-native';
import { COLORS, LANGUAGES } from '../constants/theme';
import { AlertCard } from '../components/AlertCard';
import { SOSButton } from '../components/SOSButton';
import { useAppStore } from '../store/appStore';

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { isLoggedIn, currentLang, setCurrentLang, isOnline } = useAppStore();
  const [showLangMenu, setShowLangMenu] = React.useState(false);

  const handleSOS = () => {
    navigation.navigate('SendMessage');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>RapidRescue</Text>
        <View style={styles.headerRight}>
          {/* Language Picker */}
          <TouchableOpacity
            onPress={() => setShowLangMenu(true)}
            style={styles.langBtn}
            activeOpacity={0.7}
          >
            <Globe size={16} color={COLORS.textPrimary} />
            <Text style={styles.langText}>{currentLang}</Text>
            <ChevronDown size={13} color={COLORS.textSecondary} />
          </TouchableOpacity>

          {/* Network status */}
          <Wifi
            size={20}
            color={isOnline ? COLORS.safe : COLORS.danger}
          />

          {/* Login/Profile button */}
          {!isLoggedIn ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.loginBtn}
              activeOpacity={0.8}
            >
              <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={styles.avatarBtn}
              activeOpacity={0.8}
            >
              <User size={15} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Language Modal */}
      <Modal
        visible={showLangMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLangMenu(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowLangMenu(false)}
        >
          <View style={styles.langModal}>
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setCurrentLang(item.code);
                    setShowLangMenu(false);
                  }}
                  style={[
                    styles.langItem,
                    currentLang === item.code && styles.langItemActive,
                  ]}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.langItemText,
                      currentLang === item.code && { color: COLORS.primary },
                    ]}
                  >
                    {item.name}
                  </Text>
                  {currentLang === item.code && (
                    <CheckCircle size={15} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cloud Sync badge */}
        {isLoggedIn && (
          <View style={styles.syncBadge}>
            <Text style={styles.syncBadgeText}>☁ Cloud Sync Active</Text>
          </View>
        )}

        {/* Alert Cards */}
        <View style={styles.alertsContainer}>
          <AlertCard
            iconColor="#ef4444"
            icon={<User size={14} color="#fff" />}
            title="Person Trapped"
            subtitle="- Main St"
            time="5 mins ago"
          />
          <AlertCard
            iconColor="#ef4444"
            icon={<AlertTriangle size={14} color="#fff" />}
            title="Flash Flood Warning"
            time="10 mins ago"
          />
          <AlertCard
            iconColor="#3b82f6"
            icon={<Waves size={14} color="#fff" />}
            title="Tsunami Alert"
            time="15 mins ago"
          />
        </View>

        {/* SOS Button */}
        <View style={styles.sosContainer}>
          <SOSButton onPress={handleSOS} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surfaceDeep,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.surfaceDeep,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logo: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  langText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  loginBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 50,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginBtnText: {
    color: COLORS.surfaceDeep,
    fontWeight: '700',
    fontSize: 13,
  },
  avatarBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 80,
    paddingRight: 20,
  },
  langModal: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderPrimary,
    minWidth: 190,
    maxHeight: 360,
    overflow: 'hidden',
  },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  langItemActive: {
    backgroundColor: 'rgba(0,69,94,0.5)',
  },
  langItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  scroll: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  syncBadge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0,180,216,0.1)',
    borderWidth: 1,
    borderColor: COLORS.borderPrimary,
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
  },
  syncBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
  },
  alertsContainer: {
    gap: 10,
    marginBottom: 20,
  },
  sosContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    minHeight: 300,
  },
});
