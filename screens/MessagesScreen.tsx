import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {
  MessageSquare,
  Users,
  MapPin,
  Send,
  MoreHorizontal,
  Radio,
  Shield,
  ChevronDown,
  ChevronRight,
} from 'lucide-react-native';
import { COLORS, ASSETS } from '../constants/theme';

interface MessagesScreenProps {
  navigation: any;
}

export default function MessagesScreen({ navigation }: MessagesScreenProps) {
  const [activeTab, setActiveTab] = useState<'public' | 'private' | 'food'>('private');
  const [messageText, setMessageText] = useState('');
  const [foodLocation, setFoodLocation] = useState('Park Ave Shelter');
  const [isDetecting, setIsDetecting] = useState(false);
  const [situationText, setSituationText] = useState('');

  const handleAutoDetect = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setFoodLocation('13.0827° N, 80.2707° E');
      setIsDetecting(false);
    }, 1500);
  };

  const renderTopBar = () => (
    <>
      <View style={styles.composeBar}>
        <TextInput
          placeholder={activeTab === 'public' ? 'Broadcast an update...' : 'Write your message here...'}
          placeholderTextColor={COLORS.textMuted}
          value={messageText}
          onChangeText={setMessageText}
          style={styles.composeInput}
        />
      </View>

      {/* Tab row */}
      <View style={styles.tabRow}>
        {(['public', 'private', 'food'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabBtnText, activeTab === tab && styles.tabBtnTextActive]}>
              {tab === 'public' ? 'Public' : tab === 'private' ? 'Private' : 'Food Request'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Action row */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Contacts')}
          style={styles.actionIconBtn}
          activeOpacity={0.7}
        >
          <Users size={18} color={COLORS.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LocationShare')}
          style={[styles.actionIconBtn, { overflow: 'hidden' }]}
          activeOpacity={0.7}
        >
          <MapPin size={18} color={COLORS.textSecondary} />
          <View style={styles.mapPinOverlay} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SendMessage')}
          style={styles.sendBtn}
          activeOpacity={0.85}
        >
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {renderTopBar()}

          {/* Public Tab */}
          {activeTab === 'public' && (
            <View style={styles.listCard}>
              <View style={[styles.listItem, styles.listItemFirst, { backgroundColor: 'rgba(0,180,216,0.08)' }]}>
                <View style={styles.radioAvatar}>
                  <Radio size={20} color={COLORS.surfaceDeep} />
                </View>
                <View style={styles.listItemContent}>
                  <View style={styles.listItemHeader}>
                    <Text style={[styles.senderName, { color: COLORS.primary }]}>City Admin Broadcast</Text>
                    <Shield size={14} color={COLORS.primary} />
                  </View>
                  <Text style={styles.msgPreview}>Evacuation buses available at Central Station until 18:00. Please proceed immediately.</Text>
                  <Text style={styles.msgTime}>Just now</Text>
                </View>
              </View>
              <View style={styles.listItem}>
                <Image source={{ uri: ASSETS.AVATAR_GOV }} style={styles.avatar} />
                <View style={styles.listItemContent}>
                  <Text style={[styles.senderName, { color: COLORS.safe }]}>Red Cross</Text>
                  <Text style={styles.msgPreview}>We have set up an emergency medical camp near the Greenwood Center.</Text>
                  <Text style={styles.msgTime}>1 hr ago</Text>
                </View>
              </View>
            </View>
          )}

          {/* Private Tab */}
          {activeTab === 'private' && (
            <View style={styles.listCard}>
              {[
                { name: 'Anna', avatar: ASSETS.AVATAR_1, msg: 'Need medical help at Elm St.', time: '5 mins ago', urgent: true },
                { name: 'John', avatar: ASSETS.AVATAR_2, msg: 'Evacuating now.', time: '5 mins ago', urgent: false },
                { name: 'Sarah', avatar: ASSETS.AVATAR_3, msg: 'Food needed for 4 people.', time: '20 mins ago', urgent: false },
              ].map((item, idx, arr) => (
                <TouchableOpacity
                  key={item.name}
                  style={[styles.listItem, idx !== arr.length - 1 && styles.listItemBorder]}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('ChatView', { contact: item.name })}
                >
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                  <View style={styles.listItemContent}>
                    <View style={styles.listItemHeader}>
                      <Text style={[styles.senderName, item.urgent && { color: COLORS.danger }]}>{item.name}</Text>
                      <MoreHorizontal size={14} color={COLORS.textMuted} />
                    </View>
                    <View style={styles.msgRow}>
                      <Text style={styles.msgPreview} numberOfLines={1}>{item.msg}</Text>
                      <Text style={styles.msgTime}>{item.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Food Request Tab */}
          {activeTab === 'food' && (
            <View style={{ marginTop: 4 }}>
              {/* Auto-detect */}
              <TouchableOpacity
                onPress={handleAutoDetect}
                style={styles.autoDetectTop}
                activeOpacity={0.7}
              >
                <View style={styles.autoDetectLeft}>
                  <MapPin size={18} color={COLORS.textPrimary} />
                  <Text style={styles.autoDetectLabel}>Auto-detect</Text>
                </View>
                {isDetecting ? (
                  <View style={styles.spinner} />
                ) : (
                  <View style={styles.autoDetectRight}>
                    <Text style={styles.autoDetectValue}>{foodLocation}</Text>
                    <ChevronDown size={16} color={COLORS.textMuted} />
                  </View>
                )}
              </TouchableOpacity>

              {/* Textarea */}
              <View style={styles.textAreaBox}>
                <TextInput
                  placeholder="Describe the Situation..."
                  placeholderTextColor={COLORS.textMuted}
                  value={situationText}
                  onChangeText={setSituationText}
                  style={styles.situationInput}
                  multiline
                  numberOfLines={4}
                />
              </View>

              {/* Options */}
              <View style={styles.optionsCard}>
                <View style={styles.optionRow}>
                  <Text style={styles.optionLabel}>Urgency Level</Text>
                  <View style={styles.optionValue}>
                    <Text style={styles.optionValueText}>High</Text>
                    <ChevronDown size={16} color={COLORS.textMuted} />
                  </View>
                </View>
                <View style={[styles.optionRow, { borderTopWidth: 1, borderTopColor: COLORS.border }]}>
                  <Text style={styles.optionLabel}>Location</Text>
                  <View style={styles.optionValue}>
                    <Text style={styles.optionValueText} numberOfLines={1}>{foodLocation}</Text>
                    <ChevronRight size={16} color={COLORS.textMuted} />
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  container: { padding: 20, gap: 16 },
  composeBar: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  composeInput: {
    color: COLORS.textPrimary,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: COLORS.textPrimary,
  },
  tabBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabBtnTextActive: {
    color: COLORS.surfaceDeep,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionIconBtn: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPinOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,31,45,0.4)',
  },
  sendBtn: {
    flex: 2,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  sendBtnText: {
    color: COLORS.surfaceDeep,
    fontWeight: '700',
    fontSize: 14,
  },
  listCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    alignItems: 'flex-start',
  },
  listItemFirst: {},
  listItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  radioAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    flexShrink: 0,
  },
  listItemContent: {
    flex: 1,
    gap: 4,
  },
  listItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  senderName: {
    fontWeight: '700',
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  msgRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 8,
  },
  msgPreview: {
    fontSize: 13,
    color: COLORS.textPrimary,
    flex: 1,
  },
  msgTime: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  // Food request
  autoDetectTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  autoDetectLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  autoDetectLabel: { fontWeight: '600', fontSize: 14, color: COLORS.textPrimary },
  autoDetectRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  autoDetectValue: { fontSize: 11, color: COLORS.textMuted },
  spinner: {
    width: 16, height: 16, borderRadius: 8,
    borderWidth: 2, borderColor: COLORS.primary,
    borderTopColor: 'transparent',
  },
  textAreaBox: {
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    marginBottom: 16,
  },
  situationInput: {
    color: COLORS.textPrimary,
    fontSize: 14,
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  optionsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    opacity: 0.8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  optionLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary },
  optionValue: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  optionValueText: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
});
