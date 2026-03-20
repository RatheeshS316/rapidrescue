import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Lock, User, Phone, Send } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

interface ChatViewScreenProps {
  navigation: any;
  route: any;
}

const OFFICIAL_CONTACTS = ['City Control Room', 'Nearest Hospital'];

export default function ChatViewScreen({ navigation, route }: ChatViewScreenProps) {
  const [message, setMessage] = useState('');
  const contact = route?.params?.contact || 'Unknown';
  const isOfficial = OFFICIAL_CONTACTS.includes(contact);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.chatHeaderTitle}>{contact}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.messagesArea}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {/* E2E label */}
          <View style={styles.e2eRow}>
            <Lock size={10} color={COLORS.textMuted} />
            <Text style={styles.e2eText}> End-to-End Encrypted</Text>
          </View>
          <View style={styles.dateBadge}>
            <Text style={styles.dateBadgeText}>Today</Text>
          </View>

          {/* Incoming */}
          <View style={styles.msgRow}>
            <View style={styles.msgAvatar}>
              {isOfficial ? (
                <Phone size={14} color={COLORS.safe} />
              ) : (
                <User size={14} color={COLORS.primary} />
              )}
            </View>
            <View style={styles.incomingBubble}>
              <Text style={styles.incomingText}>
                Are you currently safe? Please share your location if you need immediate assistance.
              </Text>
            </View>
          </View>

          {/* Outgoing */}
          <View style={[styles.msgRow, styles.msgRowOut]}>
            <View style={styles.outgoingBubble}>
              <Text style={styles.outgoingText}>Yes, I'm safe at the moment.</Text>
            </View>
          </View>
        </ScrollView>

        {/* Input */}
        <View style={styles.inputBar}>
          <TextInput
            placeholder="Type a message..."
            placeholderTextColor={COLORS.textMuted}
            value={message}
            onChangeText={setMessage}
            style={styles.textInput}
          />
          <TouchableOpacity style={styles.sendBtn} activeOpacity={0.85}>
            <Send size={18} color={COLORS.surfaceDeep} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceDeep,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center' },
  backArrow: { color: COLORS.textPrimary, fontSize: 20 },
  chatHeaderTitle: { fontSize: 17, fontWeight: '600', color: COLORS.textPrimary },
  messagesArea: { flex: 1, backgroundColor: COLORS.background },
  messagesContent: { padding: 20, gap: 16, paddingBottom: 16 },
  e2eRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  e2eText: { fontSize: 11, color: COLORS.textMuted },
  dateBadge: {
    alignSelf: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 50,
    marginBottom: 8,
  },
  dateBadgeText: { fontSize: 10, color: COLORS.textMuted },
  msgRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  msgRowOut: { justifyContent: 'flex-end' },
  msgAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    flexShrink: 0,
  },
  incomingBubble: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
    borderTopLeftRadius: 4,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  incomingText: { color: COLORS.textPrimary, fontSize: 14, lineHeight: 20 },
  outgoingBubble: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
    borderTopRightRadius: 4,
    maxWidth: '80%',
  },
  outgoingText: { color: COLORS.surfaceDeep, fontSize: 14, fontWeight: '500', lineHeight: 20 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: COLORS.surfaceDeep,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.surface,
    color: COLORS.textPrimary,
    fontSize: 14,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
